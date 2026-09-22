// src/lib/recaptcha.ts
/**
 * Serverseitige reCAPTCHA-v3-Verifikation. NUR auf dem Server importieren –
 * dieses Modul liest `RECAPTCHA_SECRET_KEY`.
 *
 * Diese Anwendung ist die maßgebliche Verifikationsstelle. Das Token wird
 * hier gegen Google eingelöst und danach NICHT mehr weitergereicht: ein
 * v3-Token ist bei siteverify einmalig einlösbar, eine zweite Prüfung
 * desselben Tokens beantwortet Google mit `timeout-or-duplicate`.
 *
 * FAIL-CLOSED: Es gibt keinen Rückgabewert, der bei Zweifeln durchwinkt.
 * Fehlendes Secret, nicht erreichbares Google, unverständliche Antwort –
 * alles blockiert. Ein unbemerkt ungeschütztes Formular ist schlimmer als
 * eine sichtbare Fehlermeldung.
 *
 * Die Auswertung der Google-Antwort steckt bewusst in der reinen Funktion
 * `evaluateSiteVerify`, damit sie ohne Netzwerk testbar ist.
 */

export type RecaptchaFailure =
  /** Client hat gar kein Token geschickt. */
  | "missing_token"
  /** RECAPTCHA_SECRET_KEY ist nicht gesetzt -> Serverkonfigurationsfehler. */
  | "not_configured"
  /** Google nicht erreichbar, HTTP-Fehler oder unverständliche Antwort. */
  | "unavailable"
  /** Google lehnt ab, oder das Token gehört nicht zu dieser Route. */
  | "rejected";

export type RecaptchaResult =
  | { ok: true; score: number; hostname: string }
  | { ok: false; reason: RecaptchaFailure };

/** Nur die Felder, die ausgewertet werden. Alles `unknown`, nichts geglaubt. */
export type SiteVerifyResponse = {
  success?: unknown;
  score?: unknown;
  action?: unknown;
  hostname?: unknown;
  "error-codes"?: unknown;
};

export type RecaptchaPolicy = {
  /** Erwartete Action – muss exakt der des Clients entsprechen. */
  action: string;
  /** Untergrenze für den v3-Score (0..1). */
  minScore: number;
  /** Erlaubte Hostnames, kleingeschrieben. Keine Wildcards. */
  allowedHostnames: string[];
};

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const VERIFY_TIMEOUT_MS = 10_000;

/** Strukturiertes Logging ohne Token und ohne PII. */
function logReject(event: string, detail?: Record<string, unknown>): void {
  console.error(`[recaptcha] ${event}`, detail ?? {});
}

/**
 * Wertet eine bereits geparste siteverify-Antwort aus.
 *
 * Rein und synchron: kein Netzwerk, keine Env-Zugriffe, keine Zeit. Genau
 * deshalb lassen sich alle Ablehnungsgründe deterministisch testen.
 */
export function evaluateSiteVerify(
  data: SiteVerifyResponse | null | undefined,
  policy: RecaptchaPolicy
): RecaptchaResult {
  if (!data || typeof data !== "object" || typeof data.success !== "boolean") {
    logReject("malformed_response");
    return { ok: false, reason: "unavailable" };
  }

  if (data.success !== true) {
    // error-codes sind technische Kennungen wie `invalid-input-secret` oder
    // `timeout-or-duplicate` – kein Token, keine PII.
    logReject("failed", {
      error_codes: Array.isArray(data["error-codes"]) ? data["error-codes"] : [],
    });
    return { ok: false, reason: "rejected" };
  }

  // action: verhindert, dass ein anderswo auf der Website erzeugtes Token
  // (z. B. mit der Action `contact_form`) hier eingelöst wird.
  if (data.action !== policy.action) {
    logReject("action_mismatch", {
      expected: policy.action,
      received: typeof data.action === "string" ? data.action.slice(0, 64) : null,
    });
    return { ok: false, reason: "rejected" };
  }

  // hostname: Site Key und Secret gelten für mehrere Domains; der Hostname
  // ist das einzige Merkmal, an dem sich die Herkunft unterscheiden lässt.
  const hostname =
    typeof data.hostname === "string" ? data.hostname.toLowerCase() : "";
  if (!policy.allowedHostnames.includes(hostname)) {
    logReject("hostname_rejected", {
      hostname: hostname || null,
      allowed: policy.allowedHostnames,
    });
    return { ok: false, reason: "rejected" };
  }

  // score: v3 liefert ihn immer. Fehlt er, stimmt etwas nicht.
  if (typeof data.score !== "number" || !Number.isFinite(data.score)) {
    logReject("score_missing");
    return { ok: false, reason: "rejected" };
  }
  if (data.score < policy.minScore) {
    logReject("score_below_threshold", {
      score: data.score,
      threshold: policy.minScore,
    });
    return { ok: false, reason: "rejected" };
  }

  return { ok: true, score: data.score, hostname };
}

/**
 * Löst das Token bei Google ein und wertet die Antwort aus.
 *
 * @param token  Das v3-Token aus dem Browser.
 * @param secret Das Server-Secret. Leer -> `not_configured`.
 */
export async function verifyRecaptchaToken(
  token: string,
  secret: string,
  policy: RecaptchaPolicy
): Promise<RecaptchaResult> {
  if (!token) return { ok: false, reason: "missing_token" };

  if (!secret) {
    logReject("not_configured");
    return { ok: false, reason: "not_configured" };
  }

  let data: SiteVerifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) {
      logReject("http_error", { status: res.status });
      return { ok: false, reason: "unavailable" };
    }
    data = (await res.json()) as SiteVerifyResponse;
  } catch {
    // Timeout, DNS, TLS oder kaputtes JSON. Kein Freifahrtschein.
    logReject("unreachable");
    return { ok: false, reason: "unavailable" };
  }

  return evaluateSiteVerify(data, policy);
}

/**
 * Liest die Policy aus den Environment Variables.
 *
 * Nichts davon darf je vom Client kommen.
 */
export function readRecaptchaPolicy(action: string): RecaptchaPolicy {
  return {
    action,
    minScore: readMinScore(),
    allowedHostnames: readAllowedHostnames(),
  };
}

/**
 * Score-Grenzwert (Google empfiehlt für v3 rund 0.5).
 *
 * Bewusst validiert: `Number("abc")` ergibt NaN, und jeder Vergleich mit NaN
 * ist false – ein Tippfehler in der Env-Variable hätte die Score-Prüfung
 * also stillschweigend abgeschaltet.
 */
function readMinScore(): number {
  const raw = process.env.RECAPTCHA_MIN_SCORE;
  if (!raw) return 0.5;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
    logReject("min_score_invalid", { fallback: 0.5 });
    return 0.5;
  }
  return parsed;
}

/**
 * Erlaubte Hostnames. Default deckt Produktion und lokale Entwicklung ab.
 *
 * `www.` fehlt bewusst: `src/middleware.ts` leitet www per 301 auf die
 * Apex-Domain um, Tokens entstehen daher immer auf `alexander-ergart.de`.
 * Preview-Deployments auf *.vercel.app sind absichtlich NICHT enthalten.
 */
function readAllowedHostnames(): string[] {
  return (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ||
    "alexander-ergart.de,localhost")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
}
