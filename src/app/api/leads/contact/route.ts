// src/app/api/leads/contact/route.ts
/**
 * Serverseitige Annahme der allgemeinen Kontaktanfrage (`ContactForm`).
 *
 * Genutzt von `/kontakt` und `/fensterservice`.
 *
 * Vorher schickte der Browser diese Formulare direkt an Formcarry. Die
 * Bot-Prüfung hing damit allein an Formcarry – und ein Batch-3-Test zeigte,
 * dass ein frei erfundenes reCAPTCHA-Token dort mit HTTP 200 angenommen
 * wurde. Praktisch waren diese Formulare also nur durch den Honeypot
 * geschützt. Seit Batch 3.2 läuft auch dieser Weg über den eigenen Server.
 *
 *   Browser -> POST /api/leads/contact
 *           -> Größenlimit
 *           -> Honeypot          (200, still, ohne Zustellung)
 *           -> Doppelklick-Schutz
 *           -> Validierung       -> 400
 *           -> reCAPTCHA         -> 403 / 503   (fail-closed)
 *           -> Ratenlimit        -> 429
 *           -> Zustellung an Formcarry (OHNE Token) -> 502
 *           -> { ok: true }
 *
 * Bewusst KEINE lead_id, keine Attribution, kein `generate_lead`: das ist
 * die Verkaufs-Pipeline von `/api/leads/fenster` und bleibt dort. Hier
 * entsteht dieselbe Kontaktanfrage wie bisher, nur serverseitig geprüft.
 *
 * Logging: ohne Name, E-Mail, Telefon und Nachricht.
 */

import { NextResponse } from "next/server";
import { readRecaptchaPolicy, verifyRecaptchaToken } from "@/lib/recaptcha";
import {
  asString,
  clientKey,
  deliverToFormcarry,
  IntakeGuard,
  readJsonBody,
} from "@/lib/lead-intake";
import {
  CONTACT_EMAIL_PATTERN,
  CONTACT_LIMITS,
  CONTACT_PHONE_PATTERN,
  CONTACT_RECAPTCHA_ACTION,
  type ContactResponse,
} from "@/lib/contact-lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || "";

/** Eigene Action, gleiche Härtung wie bei der Fenster-Route. */
const RECAPTCHA_POLICY = readRecaptchaPolicy(CONTACT_RECAPTCHA_ACTION);

/** Was ein erfolgreicher Zustellversuch hinterlässt. */
type ContactOutcome = { reference: string };

/** Eigener Namensraum, getrennt von /api/leads/fenster. */
const guard = new IntakeGuard<ContactOutcome>();

function fail(
  status: number,
  code: string,
  error: string,
  fields?: string[]
): NextResponse<ContactResponse> {
  return NextResponse.json({ ok: false, code, error, fields }, { status });
}

// ---------------------------------------------------------------------------
// Validierung
// ---------------------------------------------------------------------------

type ValidContact = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
};

function validate(
  body: Record<string, unknown>
): { contact: ValidContact } | { fields: string[]; error: string } {
  const fields: string[] = [];

  const name = asString(body.name);
  if (
    name.length < CONTACT_LIMITS.name.min ||
    name.length > CONTACT_LIMITS.name.max
  ) {
    fields.push("name");
  }

  // ContactForm verlangt die E-Mail seit jeher als Pflichtfeld – das bleibt so.
  const email = asString(body.email);
  if (
    !email ||
    email.length > CONTACT_LIMITS.email.max ||
    !CONTACT_EMAIL_PATTERN.test(email)
  ) {
    fields.push("email");
  }

  const phone = asString(body.phone);
  if (
    phone &&
    (phone.length < CONTACT_LIMITS.phone.min ||
      phone.length > CONTACT_LIMITS.phone.max ||
      !CONTACT_PHONE_PATTERN.test(phone))
  ) {
    fields.push("phone");
  }

  const message = asString(body.message);
  if (
    message.length < CONTACT_LIMITS.message.min ||
    message.length > CONTACT_LIMITS.message.max
  ) {
    fields.push("message");
  }

  if (body.consent !== true) fields.push("consent");

  // Beschriftungen: nur längenbegrenzt, siehe CONTACT_LIMITS.label.
  const service = asString(body.service).slice(0, CONTACT_LIMITS.label.max);
  const source =
    asString(body.source).slice(0, CONTACT_LIMITS.label.max) || "Kontaktseite";

  if (fields.length) {
    return { fields, error: "Bitte prüfen Sie Ihre Angaben." };
  }

  return { contact: { name, email, phone, service, message, source } };
}

// ---------------------------------------------------------------------------
// Zustellung
// ---------------------------------------------------------------------------

async function deliver(
  reference: string,
  contact: ValidContact,
  createdAt: string
): Promise<boolean> {
  const payload: Record<string, unknown> = {
    // --- Lead / PII: bleibt ausschließlich hier ---
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,

    // --- Kontext wie bisher (unveränderte Feldnamen für den Posteingang) ---
    service: contact.service,
    source: contact.source,
    project: "Alexander Ergart – Hausmeister- & Fensterservice",

    // --- Technische Referenz nur zur Zuordnung im Support ---
    contact_id: reference,
    created_at: createdAt,

    // Kein "g-recaptcha-response": das Token wurde bereits serverseitig
    // eingelöst und ist einmalig.

    _subject: `Kontaktanfrage${contact.service ? ` – ${contact.service}` : ""} (${reference.slice(0, 8)})`,
  };

  // Referer-Pfad nur für Formcarrys Domain-Prüfung; der echte Seitenkontext
  // steckt in `source`.
  return deliverToFormcarry(payload, "/kontakt");
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: Request): Promise<NextResponse<ContactResponse>> {
  const now = Date.now();
  guard.sweep(now);

  // 1. Größe begrenzen und parsen.
  const parsed = await readJsonBody(req);
  if (!parsed.ok) {
    if (parsed.reason === "too_large") {
      return fail(413, "payload_too_large", "Die Anfrage ist zu groß.");
    }
    if (parsed.reason === "unreadable") {
      return fail(400, "unreadable_body", "Die Anfrage konnte nicht gelesen werden.");
    }
    return fail(400, "invalid_json", "Ungültiges Anfrageformat.");
  }
  const body = parsed.body;

  // 2. Honeypot: still mit 200 antworten, aber nichts zustellen.
  if (asString(body.website) !== "") {
    return NextResponse.json({ ok: true, muted: true });
  }

  // 3. Doppelklick-Schutz – SYNCHRON reservieren, siehe @/lib/lead-intake.
  const submissionId = asString(body.submissionId).slice(0, 100);
  let settle: ((value: ContactOutcome | null) => void) | null = null;

  if (submissionId) {
    const known = guard.pending(submissionId);
    if (known) {
      const settled = await known;
      if (settled) {
        return NextResponse.json({ ok: true, delivered: true, deduplicated: true });
      }
      guard.forget(submissionId);
    }
    settle = guard.reserve(submissionId, now);
  }

  const release = (outcome: ContactOutcome | null) => {
    if (settle) settle(outcome);
  };

  // 4. Validierung.
  const result = validate(body);
  if ("fields" in result) {
    release(null);
    return fail(400, "validation_failed", result.error, result.fields);
  }
  const contact = result.contact;

  // 5. Anti-Spam, fail-closed. Identische Härtung wie /api/leads/fenster,
  //    nur mit eigener Action.
  const recaptchaToken = asString(body.recaptchaToken).slice(0, 4000);
  const captcha = await verifyRecaptchaToken(
    recaptchaToken,
    RECAPTCHA_SECRET,
    RECAPTCHA_POLICY
  );
  if (!captcha.ok) {
    release(null);
    if (captcha.reason === "not_configured" || captcha.reason === "unavailable") {
      return fail(
        503,
        captcha.reason === "not_configured"
          ? "recaptcha_not_configured"
          : "recaptcha_unavailable",
        "Die Sicherheitsprüfung ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder rufen Sie uns an."
      );
    }
    return fail(
      403,
      captcha.reason === "missing_token" ? "recaptcha_missing" : "recaptcha_rejected",
      "Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut."
    );
  }

  // 6. Ratenlimit – erst hier, damit nur echte Zustellversuche zählen.
  if (guard.isRateLimited(clientKey(req), now)) {
    release(null);
    return fail(
      429,
      "rate_limited",
      "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut."
    );
  }

  // 7. Zustellung.
  const reference = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  let delivered = false;
  try {
    delivered = await deliver(reference, contact, createdAt);
  } catch {
    console.error("[leads/contact] upstream_unreachable", { contact_id: reference });
    release(null);
    return fail(
      502,
      "upstream_unreachable",
      "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an."
    );
  }

  if (!delivered) {
    console.error("[leads/contact] upstream_error", { contact_id: reference });
    release(null);
    return fail(
      502,
      "upstream_error",
      "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an."
    );
  }

  release({ reference });

  return NextResponse.json({ ok: true, delivered: true });
}

/** Alles außer POST wird abgewiesen. */
export async function GET(): Promise<NextResponse<ContactResponse>> {
  return fail(405, "method_not_allowed", "Methode nicht erlaubt.");
}
