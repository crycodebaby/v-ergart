// src/lib/lead-intake.ts
/**
 * Gemeinsame Bausteine für alle serverseitigen Formular-Routen.
 * NUR auf dem Server importieren.
 *
 * Hintergrund: seit Batch 3.2 laufen zwei Routen über denselben Ablauf –
 * `/api/leads/fenster` (Verkaufs-Lead mit lead_id und Attribution) und
 * `/api/leads/contact` (allgemeine Kontaktanfrage). Beide brauchen
 * Größenlimit, Honeypot, Ratenlimit, Doppelklick-Schutz und dieselbe
 * Formcarry-Zustellung. Diese Datei hält genau diese Mechanik – nicht die
 * fachliche Validierung, die bleibt je Route eigen.
 *
 * Bewusst KEINE gemeinsame "Mega-Route": die Datenmodelle der beiden
 * Formulare sind verschieden und sollen es bleiben.
 */

// ---------------------------------------------------------------------------
// Konfiguration
// ---------------------------------------------------------------------------

/**
 * Formcarry-Endpunkt. Stand ursprünglich hartkodiert im Client und ist
 * damit ohnehin öffentlich; als Default beibehalten, damit ohne neue
 * Env-Variable nichts umkippt.
 */
export const FORMCARRY_ENDPOINT =
  process.env.FORMCARRY_ENDPOINT || "https://formcarry.com/s/tUPZr1Mwu_1";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alexander-ergart.de";

export const UPSTREAM_TIMEOUT_MS = 10_000;

/** Obergrenze für den rohen Request-Body in Zeichen. */
export const MAX_RAW_BODY = 20_000;

const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * Gezählt werden nur echte Zustellversuche – nicht Validierungsfehler und
 * nicht deduplizierte Doppelklicks. Wer sich fünfmal bei der E-Mail
 * vertippt, soll nicht ausgesperrt werden.
 */
const RATE_MAX = Number(process.env.LEAD_RATE_MAX || "5");

// ---------------------------------------------------------------------------
// Body lesen
// ---------------------------------------------------------------------------

export type BodyResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; reason: "too_large" | "unreadable" | "invalid_json" };

/** Liest und parst den Body, begrenzt vorher die Größe. */
export async function readJsonBody(req: Request): Promise<BodyResult> {
  const declared = Number(req.headers.get("content-length") || "0");
  if (declared > MAX_RAW_BODY) return { ok: false, reason: "too_large" };

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return { ok: false, reason: "unreadable" };
  }
  if (raw.length > MAX_RAW_BODY) return { ok: false, reason: "too_large" };

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, reason: "invalid_json" };
  }
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// ---------------------------------------------------------------------------
// Ratenlimit und Idempotenz (best effort, nur im Prozessspeicher)
//
// Auf Vercel wirkt beides pro warmer Lambda-Instanz, nicht global. Für die
// tatsächliche Anfragemenge dieser Website ist das die richtige
// Größenordnung – eine Datenbank nur dafür wäre unverhältnismäßig.
//
// Wichtig ist die Reihenfolge: der Platzhalter für eine submissionId wird
// SYNCHRON gesetzt, bevor irgendetwas awaited wird. Ein Doppelklick schickt
// mehrere Requests los, bevor React den Button deaktivieren konnte; würde
// der Eintrag erst nach der Zustellung geschrieben, liefen alle am Cache
// vorbei und der Betrieb bekäme mehrere identische E-Mails.
// ---------------------------------------------------------------------------

type IdempotencyEntry<T> = { promise: Promise<T | null>; at: number };

/**
 * Ein Namensraum pro Route, damit sich die submissionIds zweier Formulare
 * nicht gegenseitig treffen können.
 */
export class IntakeGuard<T> {
  private idempotency = new Map<string, IdempotencyEntry<T>>();
  private rateBuckets = new Map<string, number[]>();

  /** Entfernt abgelaufene Einträge. Zu Beginn jedes Requests aufrufen. */
  sweep(now: number): void {
    // forEach statt for..of: das tsconfig-Target erlaubt keine Map-Iteration.
    this.idempotency.forEach((entry, key) => {
      if (now - entry.at > IDEMPOTENCY_TTL_MS) this.idempotency.delete(key);
    });
    this.rateBuckets.forEach((hits, key) => {
      const fresh = hits.filter((t: number) => now - t < RATE_WINDOW_MS);
      if (fresh.length) this.rateBuckets.set(key, fresh);
      else this.rateBuckets.delete(key);
    });
  }

  isRateLimited(key: string, now: number): boolean {
    const hits = this.rateBuckets.get(key) ?? [];
    const fresh = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length >= RATE_MAX) {
      this.rateBuckets.set(key, fresh);
      return true;
    }
    fresh.push(now);
    this.rateBuckets.set(key, fresh);
    return false;
  }

  /** Bereits laufender oder abgeschlossener Versuch zu dieser submissionId. */
  pending(submissionId: string): Promise<T | null> | null {
    return this.idempotency.get(submissionId)?.promise ?? null;
  }

  /** Gibt eine fehlgeschlagene Reservierung frei, damit ein Retry greift. */
  forget(submissionId: string): void {
    this.idempotency.delete(submissionId);
  }

  /**
   * Reserviert die submissionId SYNCHRON und gibt eine `settle`-Funktion
   * zurück. `settle(null)` bedeutet Fehlschlag und gibt die Reservierung frei.
   */
  reserve(submissionId: string, now: number): (value: T | null) => void {
    let settle!: (value: T | null) => void;
    const promise = new Promise<T | null>((resolve) => {
      settle = resolve;
    });
    this.idempotency.set(submissionId, { promise, at: now });
    return (value: T | null) => {
      settle(value);
      if (!value) this.idempotency.delete(submissionId);
    };
  }
}

/** Grobe Absenderkennung. Nur für das Ratenlimit, wird nicht gespeichert. */
export function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0].trim() || "unknown";
}

// ---------------------------------------------------------------------------
// Zustellung
// ---------------------------------------------------------------------------

/**
 * Schickt einen fertig gebauten Datensatz an Formcarry.
 *
 * Das reCAPTCHA-Token gehört NICHT in den Payload: es wurde vorher bereits
 * gegen Google eingelöst und ist einmalig. Eine zweite Prüfung desselben
 * Tokens beantwortet Google mit `timeout-or-duplicate`. Die Bot-Prüfung
 * verantwortet ausschließlich diese Anwendung.
 *
 * @returns true bei HTTP 2xx, false sonst. Wirft bei Netzwerkfehlern.
 */
export async function deliverToFormcarry(
  payload: Record<string, unknown>,
  refererPath: string
): Promise<boolean> {
  const res = await fetch(FORMCARRY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Formcarry kann Domain-Restriktionen prüfen. Beim serverseitigen
      // Proxy gibt es keinen Browser-Origin mehr, deshalb explizit setzen.
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}${refererPath}`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  return res.ok;
}
