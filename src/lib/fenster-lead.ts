// src/lib/fenster-lead.ts
/**
 * Gemeinsames Datenmodell für den Fenster-Verkaufslead.
 *
 * Diese Datei ist die EINE Quelle der Wahrheit für die Enum-Werte des
 * Fensterformulars. Sie wird sowohl vom Client (Formular-Rendering) als
 * auch vom Server (`/api/leads/fenster`) importiert – damit kann die
 * Server-Validierung nicht auseinanderlaufen und ein manipulierter
 * Client-Wert fällt zuverlässig durch.
 *
 * Bewusst keine Abhängigkeit auf React, `window` oder Node-APIs: die Datei
 * muss in beiden Runtimes importierbar sein.
 *
 * Trennung der Datenklassen (siehe Batch-3-Bericht):
 *   - PII          -> nur im Lead-Datensatz (Formcarry / Posteingang)
 *   - Attribution  -> nur im Lead-Datensatz
 *   - Analytics    -> nur die Enum-Codes unten, nie Freitext, nie PII
 */

// ---------------------------------------------------------------------------
// Enums – die technischen Codes sind gleichzeitig die Analytics-Werte
// ---------------------------------------------------------------------------

export const LEAD_INTENTS = ["new_windows", "window_replacement"] as const;
export type LeadIntent = (typeof LEAD_INTENTS)[number];

export const WINDOW_COUNTS = [
  "one",
  "two_to_four",
  "five_to_ten",
  "more_than_ten",
  "unknown",
] as const;
export type WindowCount = (typeof WINDOW_COUNTS)[number];

export const PROPERTY_TYPES = [
  "single_family_house",
  "multi_family_house",
  "apartment",
  "commercial",
  "other",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const TIMEFRAMES = ["asap", "1_3_months", "3_6_months", "later"] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];

// ---------------------------------------------------------------------------
// Deutsche Labels – ausschließlich für UI und für den E-Mail-Posteingang.
// NIEMALS als Analytics-Property verwenden (Freitext, änderbar, übersetzbar).
// ---------------------------------------------------------------------------

export const INTENT_LABELS: Record<LeadIntent, string> = {
  new_windows: "Neue Fenster",
  window_replacement: "Bestehende Fenster austauschen",
};

export const WINDOW_COUNT_LABELS: Record<WindowCount, string> = {
  one: "1 Fenster",
  two_to_four: "2–4 Fenster",
  five_to_ten: "5–10 Fenster",
  more_than_ten: "mehr als 10 Fenster",
  unknown: "noch unklar",
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  single_family_house: "Einfamilienhaus",
  multi_family_house: "Mehrfamilienhaus",
  apartment: "Wohnung",
  commercial: "Gewerbe",
  other: "Sonstiges",
};

export const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  asap: "möglichst bald",
  "1_3_months": "in 1–3 Monaten",
  "3_6_months": "in 3–6 Monaten",
  later: "später / noch offen",
};

// ---------------------------------------------------------------------------
// reCAPTCHA
// ---------------------------------------------------------------------------

/**
 * Die reCAPTCHA-v3-Action für das Fenster-Verkaufsformular.
 *
 * Client und Server MÜSSEN denselben Wert verwenden: der Client erzeugt das
 * Token mit dieser Action, der Server vergleicht sie mit dem, was Google in
 * der siteverify-Antwort zurückmeldet. Ohne diesen Abgleich wäre ein Token,
 * das irgendwo anders auf der Website erzeugt wurde (z. B. mit der Action
 * `contact_form` der generischen ContactForm), an dieser Route gültig.
 *
 * Google erlaubt in Actions nur A–Z, a–z, 0–9, Unterstrich und Schrägstrich.
 *
 * Das allgemeine Kontaktformular hat mit `CONTACT_RECAPTCHA_ACTION` einen
 * eigenen Wert – ein Token der einen Route ist an der anderen ungültig.
 */
export const FENSTER_RECAPTCHA_ACTION = "window_lead_submit";

// ---------------------------------------------------------------------------
// Feldgrenzen – identisch auf Client und Server
// ---------------------------------------------------------------------------

export const LEAD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { min: 6, max: 30 },
  message: { max: 2000 },
  /** Obergrenze für den gesamten rohen Request-Body in Bytes. */
  rawBody: 20_000,
} as const;

/** RFC-praktikabel, nicht RFC-vollständig – dieselbe Regex wie in ContactForm. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Deutsche PLZ: exakt 5 Ziffern, führende "00" ausgeschlossen
 * (kleinste vergebene PLZ ist 01067).
 */
export const POSTAL_CODE_PATTERN = /^(?!00)\d{5}$/;

/** Ziffern, Plus, Leerzeichen und die üblichen Trennzeichen. */
export const PHONE_PATTERN = /^[+0-9][0-9 ()\/.\-]{5,29}$/;

// ---------------------------------------------------------------------------
// Attribution (nur Marketing-Parameter, keine PII)
// ---------------------------------------------------------------------------

/** Klick-Identifier und UTM-Parameter, die wir auswerten. */
export const ATTRIBUTION_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export type AttributionParam = (typeof ATTRIBUTION_PARAMS)[number];

export type AttributionTouch = Partial<Record<AttributionParam, string>> & {
  /** Erste Seite, auf der dieser Touch erfasst wurde. */
  landing_page?: string;
  /** Externer Referrer (Origin-Ebene, ohne Query). */
  referrer?: string;
  /** ISO-Zeitstempel der Erfassung. */
  captured_at?: string;
};

export type LeadAttribution = {
  first_touch?: AttributionTouch;
  last_touch?: AttributionTouch;
  /** Pfad der Seite, auf der das Formular abgeschickt wurde. */
  source_page?: string;
  /** Wo die Attribution im Browser lag: "memory" (ohne Consent) oder "local". */
  storage?: "memory" | "local";
  /** Consent-Zustand zum Zeitpunkt des Absendens. */
  consent?: "granted" | "denied" | "unknown";
};

// ---------------------------------------------------------------------------
// Wire-Format Request / Response
// ---------------------------------------------------------------------------

export type FensterLeadRequest = {
  name: string;
  email?: string;
  phone?: string;
  intent: LeadIntent;
  windowCount: WindowCount;
  propertyType: PropertyType;
  postalCode: string;
  timeframe: Timeframe;
  message?: string;
  privacyConsent: boolean;
  /** Honeypot – muss leer bleiben. */
  website?: string;
  /** reCAPTCHA-v3-Token. */
  recaptchaToken?: string;
  /** Vom Client pro Absendeversuch erzeugt, nur für Idempotenz. */
  submissionId?: string;
  attribution?: LeadAttribution;
};

/**
 * Exakt die Felder, die ins DataLayer dürfen. Wird vom Server erzeugt und
 * zurückgegeben, damit der Client nichts selbst zusammenbaut – so kann kein
 * PII-Feld versehentlich in ein Analytics-Event rutschen.
 */
export type LeadAnalyticsPayload = {
  lead_id: string;
  lead_type: LeadIntent;
  window_count_bucket: WindowCount;
  property_type: PropertyType;
  timeframe: Timeframe;
  source_page: string;
};

export type FensterLeadSuccess = {
  ok: true;
  /** Fehlt bei stillem Honeypot-Erfolg – dann darf KEIN Event feuern. */
  lead_id?: string;
  analytics?: LeadAnalyticsPayload;
  /** true, wenn derselbe submissionId bereits verarbeitet wurde. */
  deduplicated?: boolean;
  /** true beim Honeypot-Treffer (still erfolgreich, kein echter Lead). */
  muted?: boolean;
};

export type FensterLeadFailure = {
  ok: false;
  /** Für Menschen lesbare, sichere Meldung – nie Interna. */
  error: string;
  /** Stabiler Code für Tests/Monitoring. */
  code?: string;
  /** Feldnamen mit Validierungsfehler (keine Werte!). */
  fields?: string[];
};

export type FensterLeadResponse = FensterLeadSuccess | FensterLeadFailure;
