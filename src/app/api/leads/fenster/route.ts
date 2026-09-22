// src/app/api/leads/fenster/route.ts
/**
 * Serverseitige Lead-Annahme für die Fenster-Verkaufsseite.
 *
 * Vorher schickte der Browser das Formular direkt an Formcarry. Damit lag
 * jede Entscheidung beim Client: Validierung, Spam, und vor allem – es gab
 * keine Stelle, die einen Lead eindeutig identifizieren konnte.
 *
 * Jetzt:
 *   Browser -> POST /api/leads/fenster
 *           -> Größen-/Ratenlimit
 *           -> Honeypot
 *           -> Schema-Validierung (Enums gegen fenster-lead.ts)
 *           -> reCAPTCHA
 *           -> lead_id (crypto.randomUUID, ausschließlich hier erzeugt)
 *           -> Zustellung über den bestehenden Formcarry-Endpunkt
 *           -> { ok, lead_id, analytics } zurück an den Browser
 *
 * Der Client bekommt die Analytics-Properties fertig vom Server geliefert
 * und baut sie nicht selbst zusammen. Dadurch kann strukturell kein
 * PII-Feld in ein DataLayer-Event rutschen.
 *
 * Logging: bewusst ohne Name, E-Mail, Telefon und Nachricht. Es werden nur
 * lead_id, Fehlercode und HTTP-Status geloggt.
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
  EMAIL_PATTERN,
  LEAD_INTENTS,
  LEAD_LIMITS,
  PHONE_PATTERN,
  POSTAL_CODE_PATTERN,
  PROPERTY_TYPES,
  TIMEFRAMES,
  WINDOW_COUNTS,
  INTENT_LABELS,
  PROPERTY_TYPE_LABELS,
  TIMEFRAME_LABELS,
  WINDOW_COUNT_LABELS,
  ATTRIBUTION_PARAMS,
  FENSTER_RECAPTCHA_ACTION,
  type AttributionTouch,
  type FensterLeadResponse,
  type LeadAnalyticsPayload,
  type LeadAttribution,
  type LeadIntent,
  type PropertyType,
  type Timeframe,
  type WindowCount,
} from "@/lib/fenster-lead";

/** Node-Runtime: wir brauchen crypto.randomUUID und serverseitiges fetch. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Konfiguration
// ---------------------------------------------------------------------------

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || "";

/**
 * Score-Grenzwert und erlaubte Hostnames kommen ausschließlich aus den
 * Environment Variables – nie aus dem Request. Details in @/lib/recaptcha.
 */
const RECAPTCHA_POLICY = readRecaptchaPolicy(FENSTER_RECAPTCHA_ACTION);


// ---------------------------------------------------------------------------
// Antwort-Helfer
// ---------------------------------------------------------------------------

function fail(
  status: number,
  code: string,
  error: string,
  fields?: string[]
): NextResponse<FensterLeadResponse> {
  return NextResponse.json({ ok: false, code, error, fields }, { status });
}

// ---------------------------------------------------------------------------
// Ratenlimit / Doppelklick-Schutz – gemeinsame Mechanik aus @/lib/lead-intake
// ---------------------------------------------------------------------------

/** Was ein erfolgreicher Zustellversuch dieser Route hinterlässt. */
type LeadOutcome = { leadId: string; analytics: LeadAnalyticsPayload };

/** Eigener Namensraum, getrennt von /api/leads/contact. */
const guard = new IntakeGuard<LeadOutcome>();

// ---------------------------------------------------------------------------
// Validierung
// ---------------------------------------------------------------------------

function oneOf<T extends readonly string[]>(
  value: unknown,
  allowed: T
): T[number] | null {
  const str = asString(value);
  return (allowed as readonly string[]).includes(str)
    ? (str as T[number])
    : null;
}

type ValidLead = {
  name: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  windowCount: WindowCount;
  propertyType: PropertyType;
  postalCode: string;
  timeframe: Timeframe;
  message: string;
};

function validate(
  body: Record<string, unknown>
): { lead: ValidLead } | { fields: string[]; error: string } {
  const fields: string[] = [];

  const name = asString(body.name);
  if (name.length < LEAD_LIMITS.name.min || name.length > LEAD_LIMITS.name.max) {
    fields.push("name");
  }

  const email = asString(body.email);
  const phone = asString(body.phone);

  // Mindestens ein Kontaktweg. Telefon ist der bevorzugte, aber nicht der
  // erzwungene Weg – wer nur eine E-Mail hinterlässt, ist ein gültiger Lead.
  if (!email && !phone) {
    fields.push("contact");
  }
  if (email && (email.length > LEAD_LIMITS.email.max || !EMAIL_PATTERN.test(email))) {
    fields.push("email");
  }
  if (
    phone &&
    (phone.length < LEAD_LIMITS.phone.min ||
      phone.length > LEAD_LIMITS.phone.max ||
      !PHONE_PATTERN.test(phone))
  ) {
    fields.push("phone");
  }

  const intent = oneOf(body.intent, LEAD_INTENTS);
  if (!intent) fields.push("intent");

  const windowCount = oneOf(body.windowCount, WINDOW_COUNTS);
  if (!windowCount) fields.push("windowCount");

  const propertyType = oneOf(body.propertyType, PROPERTY_TYPES);
  if (!propertyType) fields.push("propertyType");

  const timeframe = oneOf(body.timeframe, TIMEFRAMES);
  if (!timeframe) fields.push("timeframe");

  const postalCode = asString(body.postalCode);
  if (!POSTAL_CODE_PATTERN.test(postalCode)) fields.push("postalCode");

  const message = asString(body.message);
  if (message.length > LEAD_LIMITS.message.max) fields.push("message");

  if (body.privacyConsent !== true) fields.push("privacyConsent");

  if (fields.length) {
    return {
      fields,
      error:
        fields.length === 1 && fields[0] === "contact"
          ? "Bitte Telefonnummer oder E-Mail-Adresse angeben."
          : "Bitte prüfen Sie Ihre Angaben.",
    };
  }

  return {
    lead: {
      name,
      email,
      phone,
      intent: intent as LeadIntent,
      windowCount: windowCount as WindowCount,
      propertyType: propertyType as PropertyType,
      postalCode,
      timeframe: timeframe as Timeframe,
      message,
    },
  };
}

// ---------------------------------------------------------------------------
// Attribution säubern (kommt aus dem Browser -> nie ungeprüft weiterreichen)
// ---------------------------------------------------------------------------

const MAX_ATTR_VALUE = 300;

function sanitizeTouch(input: unknown): AttributionTouch | undefined {
  if (!input || typeof input !== "object") return undefined;
  const src = input as Record<string, unknown>;
  const out: AttributionTouch = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = asString(src[key]);
    if (value) out[key] = value.slice(0, MAX_ATTR_VALUE);
  }
  for (const key of ["landing_page", "referrer", "captured_at"] as const) {
    const value = asString(src[key]);
    if (value) out[key] = value.slice(0, MAX_ATTR_VALUE);
  }
  return Object.keys(out).length ? out : undefined;
}

function sanitizeAttribution(input: unknown): LeadAttribution {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const consent = asString(src.consent);
  const storage = asString(src.storage);
  return {
    first_touch: sanitizeTouch(src.first_touch),
    last_touch: sanitizeTouch(src.last_touch),
    source_page: asString(src.source_page).slice(0, MAX_ATTR_VALUE) || undefined,
    storage: storage === "local" || storage === "memory" ? storage : undefined,
    consent:
      consent === "granted" || consent === "denied" || consent === "unknown"
        ? consent
        : undefined,
  };
}

/** Flacht die Attribution für den Posteingang auf lesbare Schlüssel ab. */
function flattenAttribution(attr: LeadAttribution): Record<string, string> {
  const out: Record<string, string> = {};
  const add = (prefix: string, touch?: AttributionTouch) => {
    if (!touch) return;
    for (const [key, value] of Object.entries(touch)) {
      if (value) out[`${prefix}_${key}`] = value;
    }
  };
  add("first", attr.first_touch);
  add("last", attr.last_touch);
  if (attr.source_page) out.source_page = attr.source_page;
  if (attr.consent) out.attribution_consent = attr.consent;
  if (attr.storage) out.attribution_storage = attr.storage;
  return out;
}

// ---------------------------------------------------------------------------
// Zustellung
// ---------------------------------------------------------------------------

async function deliver(
  leadId: string,
  lead: ValidLead,
  attribution: LeadAttribution,
  createdAt: string
): Promise<boolean> {
  const flat = flattenAttribution(attribution);

  const summary = [
    `Lead-ID: ${leadId}`,
    `Vorhaben: ${INTENT_LABELS[lead.intent]}`,
    `Fensteranzahl: ${WINDOW_COUNT_LABELS[lead.windowCount]}`,
    `Objektart: ${PROPERTY_TYPE_LABELS[lead.propertyType]}`,
    `PLZ: ${lead.postalCode}`,
    `Zeitraum: ${TIMEFRAME_LABELS[lead.timeframe]}`,
    lead.phone ? `Telefon: ${lead.phone}` : null,
    lead.email ? `E-Mail: ${lead.email}` : null,
    lead.message ? `\nNachricht:\n${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const payload: Record<string, unknown> = {
    // --- Lead / PII: bleibt ausschließlich hier ---
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,

    // --- Fachliche Qualifizierung (deutsch für den Posteingang) ---
    vorhaben: INTENT_LABELS[lead.intent],
    fensteranzahl: WINDOW_COUNT_LABELS[lead.windowCount],
    objektart: PROPERTY_TYPE_LABELS[lead.propertyType],
    plz: lead.postalCode,
    zeitraum: TIMEFRAME_LABELS[lead.timeframe],

    // --- Technische Referenz für CRM / spätere Offline-Conversion ---
    lead_id: leadId,
    lead_type: lead.intent,
    window_count_bucket: lead.windowCount,
    property_type: lead.propertyType,
    timeframe: lead.timeframe,
    created_at: createdAt,

    // --- Kontext wie bisher ---
    source: "Fenster Verkaufsseite",
    project: "Alexander Ergart – Hausmeister- & Fensterservice",

    // Kein "g-recaptcha-response": das Token wurde oben bereits gegen Google
    // eingelöst und ist einmalig. Eine zweite Prüfung durch Formcarry würde
    // mit `timeout-or-duplicate` scheitern und echte Leads verwerfen.

    // --- Attribution ---
    ...flat,

    _subject: `Fensteranfrage ${lead.postalCode} – ${WINDOW_COUNT_LABELS[lead.windowCount]} (${leadId.slice(0, 8)})`,
    zusammenfassung: summary,
  };

  return deliverToFormcarry(payload, "/fenster");
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: Request): Promise<NextResponse<FensterLeadResponse>> {
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

  // 2. Honeypot vor allem anderen: still mit 200 antworten, aber ohne
  //    lead_id. Der Client feuert nur bei vorhandener lead_id ein Event,
  //    damit entsteht hier garantiert keine Conversion.
  if (asString(body.website) !== "") {
    return NextResponse.json({ ok: true, muted: true });
  }

  // 3. Idempotenz – SYNCHRON, ohne dazwischenliegendes await.
  //
  //    Entweder wir finden eine Reservierung (dann ist ein Duplikat
  //    unterwegs oder bereits fertig und wir warten auf dessen Ergebnis),
  //    oder wir legen selbst eine an und sind ab sofort derjenige, der
  //    zustellt. Genau das verhindert, dass ein Doppelklick mehrfach im
  //    Posteingang landet.
  const submissionId = asString(body.submissionId).slice(0, 100);
  let settle: ((value: LeadOutcome | null) => void) | null = null;

  if (submissionId) {
    const known = guard.pending(submissionId);
    if (known) {
      const settled = await known;
      if (settled) {
        return NextResponse.json({
          ok: true,
          lead_id: settled.leadId,
          analytics: settled.analytics,
          deduplicated: true,
        });
      }
      // Der vorherige Versuch ist gescheitert – Reservierung freigeben,
      // damit derselbe submissionId erneut zugestellt werden darf.
      guard.forget(submissionId);
    }
    settle = guard.reserve(submissionId, now);
  }

  /** Gibt die Reservierung frei und beantwortet wartende Duplikate. */
  const release = (outcome: LeadOutcome | null) => {
    if (settle) settle(outcome);
  };

  // 4. Schema-Validierung. Manipulierte Enum-Werte fallen hier durch.
  const result = validate(body);
  if ("fields" in result) {
    release(null);
    return fail(400, "validation_failed", result.error, result.fields);
  }
  const lead = result.lead;

  // 5. Anti-Spam. Fail-closed: jeder Zweig hier beendet den Request, bevor
  //    eine lead_id entsteht oder irgendetwas zugestellt wird.
  const recaptchaToken = asString(body.recaptchaToken).slice(0, 4000);
  const captcha = await verifyRecaptchaToken(
    recaptchaToken,
    RECAPTCHA_SECRET,
    RECAPTCHA_POLICY
  );
  if (!captcha.ok) {
    release(null);
    if (captcha.reason === "not_configured" || captcha.reason === "unavailable") {
      // Unser Problem, nicht das des Nutzers – und kein Hinweis darauf,
      // welches der beiden es war.
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

  // 6. Ratenlimit (best effort, pro Instanz) – erst hier, siehe RATE_MAX:
  //    gezählt werden nur echte Zustellversuche.
  if (guard.isRateLimited(clientKey(req), now)) {
    release(null);
    return fail(
      429,
      "rate_limited",
      "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut."
    );
  }

  // 7. Lead-ID – ausschließlich hier, nie vom Client übernommen.
  const leadId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const attribution = sanitizeAttribution(body.attribution);

  // 8. Zustellung über den bestehenden Weg.
  let delivered = false;
  try {
    delivered = await deliver(leadId, lead, attribution, createdAt);
  } catch {
    console.error("[leads/fenster] upstream_unreachable", { lead_id: leadId });
    release(null);
    return fail(
      502,
      "upstream_unreachable",
      "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an."
    );
  }

  if (!delivered) {
    console.error("[leads/fenster] upstream_error", { lead_id: leadId });
    release(null);
    return fail(
      502,
      "upstream_error",
      "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an."
    );
  }

  // 9. Analytics-Payload serverseitig bauen: ausschließlich Enum-Codes.
  //    Kein Name, keine E-Mail, kein Telefon, keine Nachricht, keine PLZ.
  const analytics: LeadAnalyticsPayload = {
    lead_id: leadId,
    lead_type: lead.intent,
    window_count_bucket: lead.windowCount,
    property_type: lead.propertyType,
    timeframe: lead.timeframe,
    source_page: attribution.source_page || "/fenster",
  };

  release({ leadId, analytics });

  return NextResponse.json({ ok: true, lead_id: leadId, analytics });
}

/** Alles außer POST wird abgewiesen. */
export async function GET(): Promise<NextResponse<FensterLeadResponse>> {
  return fail(405, "method_not_allowed", "Methode nicht erlaubt.");
}
