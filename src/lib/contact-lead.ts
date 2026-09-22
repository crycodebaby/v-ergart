// src/lib/contact-lead.ts
/**
 * Datenmodell der allgemeinen Kontaktanfrage (`ContactForm`).
 *
 * Genutzt von `/kontakt` und `/fensterservice`. Client und Server
 * importieren dieselben Konstanten – deshalb keine React- oder
 * Node-Abhängigkeiten in dieser Datei.
 *
 * Abgrenzung zu `fenster-lead.ts`: Dort steht das Verkaufs-Datenmodell mit
 * Vorhaben, Fensteranzahl, Objektart, PLZ und Zeitraum. Hier geht es um die
 * klassische Kontaktanfrage mit Name, E-Mail, Anliegen und Freitext. Die
 * beiden Modelle bleiben bewusst getrennt.
 */

/**
 * reCAPTCHA-v3-Action des allgemeinen Kontaktformulars.
 *
 * Eigener Wert, getrennt von `FENSTER_RECAPTCHA_ACTION`: so kann ein Token,
 * das auf `/kontakt` erzeugt wurde, nicht an der Fenster-Verkaufsroute
 * eingelöst werden und umgekehrt. Der Server prüft exakt auf Gleichheit.
 */
export const CONTACT_RECAPTCHA_ACTION = "contact_form_submit";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { min: 6, max: 30 },
  message: { min: 1, max: 5000 },
  /**
   * `service` und `source` sind reine Beschriftungen für den Posteingang.
   * Die Auswahllisten unterscheiden sich je Seite (`customServices`), eine
   * serverseitige Enum-Prüfung wäre deshalb nur scheinbar strenger. Sie
   * werden längenbegrenzt und landen ausschließlich im Lead-Datensatz –
   * nie in Analytics und nie in einer Auswertungslogik.
   */
  label: { max: 100 },
} as const;

export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_PHONE_PATTERN = /^[+0-9][0-9 ()\/.\-]{5,29}$/;

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  consent: boolean;
  /** Seitenkontext, z. B. "Fensterservice Landingpage". */
  source?: string;
  /** Honeypot – muss leer bleiben. */
  website?: string;
  recaptchaToken?: string;
  /** Vom Client pro Absendeversuch erzeugt, nur für Idempotenz. */
  submissionId?: string;
};

export type ContactSuccess = {
  ok: true;
  /** Fehlt beim stillen Honeypot-Erfolg. */
  delivered?: boolean;
  deduplicated?: boolean;
  muted?: boolean;
};

export type ContactFailure = {
  ok: false;
  /** Für Menschen lesbare, sichere Meldung – nie Interna. */
  error: string;
  /** Stabiler Code für Tests/Monitoring. */
  code?: string;
  /** Feldnamen mit Validierungsfehler (keine Werte!). */
  fields?: string[];
};

export type ContactResponse = ContactSuccess | ContactFailure;
