// src/components/FensterAnfrageForm.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { trackEvent, trackLeadForm } from "@/lib/analytics";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { getAttributionForLead } from "@/lib/attribution";
import {
  INTENT_LABELS,
  LEAD_INTENTS,
  LEAD_LIMITS,
  PHONE_PATTERN,
  POSTAL_CODE_PATTERN,
  PROPERTY_TYPES,
  FENSTER_RECAPTCHA_ACTION,
  PROPERTY_TYPE_LABELS,
  TIMEFRAMES,
  TIMEFRAME_LABELS,
  WINDOW_COUNTS,
  WINDOW_COUNT_LABELS,
  type FensterLeadResponse,
  type LeadIntent,
  type PropertyType,
  type Timeframe,
  type WindowCount,
} from "@/lib/fenster-lead";

/**
 * Verkaufsformular für neue Fenster / Fensteraustausch.
 *
 * Eigene Komponente statt `ContactForm` mit anderer Überschrift: das
 * Datenmodell ist ein anderes. ContactForm fragt Name/E-Mail/Nachricht für
 * beliebige Hausmeister-Anliegen ab; hier brauchen wir Vorhaben, Anzahl,
 * Objektart, PLZ und Zeitraum, um einen Lead überhaupt qualifizieren und
 * später einem Auftrag zuordnen zu können. Gemeinsam genutzt werden die
 * UI-Bausteine (Button, Feldstil) und der reCAPTCHA-Hook.
 *
 * Der Erfolgsweg ist strikt serverbestätigt:
 *   Submit -> POST /api/leads/fenster -> Server liefert lead_id + analytics
 *          -> genau ein `generate_lead` im DataLayer.
 * Ohne `lead_id` in der Antwort feuert nichts. Das gilt auch für den
 * stillen Honeypot-Erfolg (200 ohne lead_id).
 */

type FormValues = {
  name: string;
  phone: string;
  email: string;
  intent: LeadIntent | "";
  windowCount: WindowCount | "";
  propertyType: PropertyType | "";
  postalCode: string;
  timeframe: Timeframe | "";
  message: string;
  privacyConsent: boolean;
  /** Honeypot – muss leer bleiben. */
  website: string;
};

const FIELD_CLASS =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-base outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-ring";

const ERROR_CLASS = "mt-1 text-sm text-blue-600 dark:text-blue-400";

/** Auf /fenster gibt es bewusst keine Reparatur-Option. */
const INTENT_OPTIONS = LEAD_INTENTS;

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
      {children}
      {hint && (
        <span className="ml-2 font-normal text-muted-foreground">{hint}</span>
      )}
    </label>
  );
}

export default function FensterAnfrageForm({
  sourcePage = "/fenster",
}: {
  sourcePage?: string;
}) {
  const { executeRecaptcha } = useRecaptcha();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  const hasStarted = useRef(false);
  /** Garantiert genau ein Conversion-Event pro erfolgreichem Lead. */
  const conversionFired = useRef(false);
  /** Bleibt über Retries hinweg gleich -> serverseitige Idempotenz. */
  const submissionId = useRef<string>("");
  /**
   * Synchrone Doppel-Absende-Sperre. `status` und das `disabled` am Button
   * greifen erst nach dem naechsten Render – ein schneller Doppelklick
   * feuert vorher bereits den zweiten Submit ab. Ein Ref wird sofort
   * gesetzt und schliesst dieses Fenster.
   */
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      intent: "",
      windowCount: "",
      propertyType: "",
      postalCode: "",
      timeframe: "",
      message: "",
      privacyConsent: false,
      website: "",
    },
    mode: "onTouched",
  });

  const handleFormStart = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_start", form_id: "fenster_lead_form" });
    trackEvent("lead_form_view", { form_id: "fenster_lead_form", page: sourcePage });
  }, [sourcePage]);

  const onInvalid = (formErrors: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_error",
      form_id: "fenster_lead_form",
      errorFields: Object.keys(formErrors),
    });
  };

  const onSubmit = async (values: FormValues) => {
    // Doppelklick / Enter-Spam: jeder weitere Aufruf läuft ins Leere,
    // solange ein Request unterwegs ist oder der Lead schon durch ist.
    if (inFlight.current || conversionFired.current) return;
    inFlight.current = true;

    // Honeypot: still erfolgreich tun, nichts senden, kein Event.
    if (values.website) {
      setStatus("success");
      return;
    }

    // Mindestens ein Kontaktweg – die Regel lässt sich nicht an einem
    // einzelnen Feld aufhängen, daher hier explizit.
    if (!values.phone.trim() && !values.email.trim()) {
      inFlight.current = false;
      setStatus("error");
      setErrorMsg("Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.");
      setFocus("phone");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    if (!submissionId.current) {
      submissionId.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    try {
      // Dieselbe Konstante prueft der Server gegen Googles Antwort. Ein hier
      // frei getippter String wuerde jeden Lead mit 403 abweisen.
      const recaptchaToken = await executeRecaptcha(FENSTER_RECAPTCHA_ACTION);
      if (!recaptchaToken) {
        setStatus("error");
        setErrorMsg("Sicherheitscheck fehlgeschlagen. Bitte laden Sie die Seite neu.");
        return;
      }

      const res = await fetch("/api/leads/fenster", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          intent: values.intent,
          windowCount: values.windowCount,
          propertyType: values.propertyType,
          postalCode: values.postalCode.trim(),
          timeframe: values.timeframe,
          message: values.message.trim(),
          privacyConsent: values.privacyConsent === true,
          recaptchaToken,
          submissionId: submissionId.current,
          attribution: getAttributionForLead(sourcePage),
        }),
      });

      const data = (await res.json().catch(() => null)) as FensterLeadResponse | null;

      if (!res.ok || !data || data.ok !== true) {
        setStatus("error");
        setErrorMsg(
          (data && data.ok === false && data.error) ||
            "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an."
        );
        return;
      }

      setStatus("success");
      setLeadId(data.lead_id ?? null);

      // ---- Conversion: NUR mit serverseitig bestätigter lead_id ----
      if (data.lead_id && data.analytics && !conversionFired.current) {
        conversionFired.current = true;
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];

          // Die Properties kommen unverändert vom Server. Sie enthalten
          // ausschließlich Enum-Codes und die lead_id – kein Name, keine
          // E-Mail, kein Telefon, keine Nachricht, keine PLZ.
          window.dataLayer.push({
            event: "generate_lead",
            ...data.analytics,
          });

          // Bestandsevent aus Batch 1/2. Bleibt bewusst erhalten, damit eine
          // bereits in GTM konfigurierte Conversion nicht stillschweigend
          // ausfällt. Migration auf `generate_lead` ist ein manueller
          // GTM-Schritt und gehört nicht in dieses Repository.
          window.dataLayer.push({
            event: "fensterservice_lead_submit_success",
            source: "Fenster Verkaufsseite",
            service: values.intent,
          });
        }

        // Plausible: nicht personenbezogen, nur technische Kontextfelder.
        trackLeadForm("submit", "fenster_lead_form", "Fenster Verkaufsseite");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns unter 0176 668 25 889 an."
      );
    } finally {
      // Nach einem Fehler muss ein erneuter Versuch moeglich sein. Nach
      // Erfolg bleibt die Sperre bestehen – dann ersetzt ohnehin der
      // Erfolgszustand das Formular.
      if (!conversionFired.current) inFlight.current = false;
    }
  };

  // -------------------------------------------------------------------------
  // Erfolgszustand: ersetzt das Formular vollständig, damit niemand ein
  // zweites Mal absendet.
  // -------------------------------------------------------------------------
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center md:p-8"
      >
        <CheckCircle2
          size={44}
          className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        />
        <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
          Anfrage ist angekommen
        </h3>
        <p className="mx-auto mb-5 max-w-md text-muted-foreground">
          Wir melden uns in der Regel innerhalb von 24 Stunden und stimmen einen
          Termin für das kostenlose Aufmaß ab.
        </p>
        <a
          href="tel:+4917666825889"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Phone size={18} aria-hidden="true" />
          Lieber direkt anrufen: 0176 668 25 889
        </a>
        {leadId && (
          <p className="mt-5 text-xs text-muted-foreground">
            Ihre Vorgangsnummer: <span className="font-mono">{leadId.slice(0, 8)}</span>
          </p>
        )}
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocusCapture={handleFormStart}
      noValidate
      className="relative space-y-5 rounded-xl border border-border bg-gradient-to-b from-card to-card/80 p-5 md:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />

      {/* Honeypot – für Menschen und Screenreader unsichtbar */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fl-website">Website</label>
        <input
          id="fl-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2 py-1 text-xs font-medium text-brand-text">
          <Sparkles size={14} aria-hidden="true" />
          Beratung &amp; Aufmaß kostenlos
        </span>
        <span className="text-xs text-muted-foreground">
          Antwort i. d. R. &lt; 24h
        </span>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Vorhaben                                                          */}
      {/* ---------------------------------------------------------------- */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Worum geht es? *</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {INTENT_OPTIONS.map((value) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-input bg-background px-3 py-3 transition hover:border-brand-blue/60 has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5"
            >
              <input
                type="radio"
                value={value}
                {...register("intent", { required: "Bitte wählen Sie Ihr Vorhaben." })}
                className="h-4 w-4 shrink-0 accent-[--brand-solid]"
              />
              <span className="text-sm">{INTENT_LABELS[value]}</span>
            </label>
          ))}
        </div>
        {errors.intent && <p className={ERROR_CLASS}>{errors.intent.message}</p>}
      </fieldset>

      {/* ---------------------------------------------------------------- */}
      {/* Projekt                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="fl-count">Wie viele Fenster? *</Label>
          <select
            id="fl-count"
            {...register("windowCount", { required: "Bitte Anzahl wählen." })}
            className={FIELD_CLASS}
          >
            <option value="">Bitte wählen</option>
            {WINDOW_COUNTS.map((value) => (
              <option key={value} value={value}>
                {WINDOW_COUNT_LABELS[value]}
              </option>
            ))}
          </select>
          {errors.windowCount && (
            <p className={ERROR_CLASS}>{errors.windowCount.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fl-property">Objektart *</Label>
          <select
            id="fl-property"
            {...register("propertyType", { required: "Bitte Objektart wählen." })}
            className={FIELD_CLASS}
          >
            <option value="">Bitte wählen</option>
            {PROPERTY_TYPES.map((value) => (
              <option key={value} value={value}>
                {PROPERTY_TYPE_LABELS[value]}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className={ERROR_CLASS}>{errors.propertyType.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="fl-plz">PLZ *</Label>
          <input
            id="fl-plz"
            type="text"
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            placeholder="41460"
            {...register("postalCode", {
              required: "Bitte PLZ angeben.",
              pattern: {
                value: POSTAL_CODE_PATTERN,
                message: "Bitte eine fünfstellige deutsche PLZ angeben.",
              },
            })}
            className={FIELD_CLASS}
          />
          {errors.postalCode && (
            <p className={ERROR_CLASS}>{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fl-timeframe">Wann soll es losgehen? *</Label>
          <select
            id="fl-timeframe"
            {...register("timeframe", { required: "Bitte Zeitraum wählen." })}
            className={FIELD_CLASS}
          >
            <option value="">Bitte wählen</option>
            {TIMEFRAMES.map((value) => (
              <option key={value} value={value}>
                {TIMEFRAME_LABELS[value]}
              </option>
            ))}
          </select>
          {errors.timeframe && (
            <p className={ERROR_CLASS}>{errors.timeframe.message}</p>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Person                                                            */}
      {/* ---------------------------------------------------------------- */}
      <div>
        <Label htmlFor="fl-name">Name *</Label>
        <input
          id="fl-name"
          type="text"
          autoComplete="name"
          placeholder="Max Mustermann"
          {...register("name", {
            required: "Bitte Namen angeben.",
            minLength: {
              value: LEAD_LIMITS.name.min,
              message: "Bitte vollständigen Namen angeben.",
            },
            maxLength: { value: LEAD_LIMITS.name.max, message: "Name ist zu lang." },
          })}
          className={FIELD_CLASS}
        />
        {errors.name && <p className={ERROR_CLASS}>{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="fl-phone" hint="schnellste Rückmeldung">
            Telefon
          </Label>
          <input
            id="fl-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0176 668 25 889"
            {...register("phone", {
              pattern: {
                value: PHONE_PATTERN,
                message: "Bitte eine gültige Telefonnummer angeben.",
              },
              maxLength: {
                value: LEAD_LIMITS.phone.max,
                message: "Telefonnummer ist zu lang.",
              },
            })}
            className={`${FIELD_CLASS} border-brand-blue/40 focus:border-brand-blue`}
          />
          {errors.phone ? (
            <p className={ERROR_CLASS}>{errors.phone.message}</p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">
              Für Rückfragen zum Aufmaß am schnellsten.
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="fl-email" hint="alternativ">
            E-Mail
          </Label>
          <input
            id="fl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="beispiel@mail.de"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Bitte eine gültige E-Mail-Adresse angeben.",
              },
              maxLength: {
                value: LEAD_LIMITS.email.max,
                message: "E-Mail-Adresse ist zu lang.",
              },
            })}
            className={FIELD_CLASS}
          />
          {errors.email ? (
            <p className={ERROR_CLASS}>{errors.email.message}</p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">
              Telefon oder E-Mail genügt – eines von beiden brauchen wir.
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="fl-message" hint="optional">
          Nachricht
        </Label>
        <textarea
          id="fl-message"
          rows={4}
          maxLength={LEAD_LIMITS.message.max}
          placeholder="Z. B. Baujahr, aktueller Fenstertyp, besondere Wünsche zu Verglasung oder Sicherheit …"
          {...register("message", {
            maxLength: {
              value: LEAD_LIMITS.message.max,
              message: "Nachricht ist zu lang.",
            },
          })}
          className={FIELD_CLASS}
        />
        {errors.message && <p className={ERROR_CLASS}>{errors.message.message}</p>}
      </div>

      {/* Datenschutz – bewusst OHNE Werbeeinwilligung vermischt */}
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            {...register("privacyConsent", {
              required: "Bitte Zustimmung zur Datenverarbeitung geben.",
            })}
            className="mt-1 h-4 w-4 shrink-0 rounded border-input bg-background text-brand-text focus:ring-ring"
          />
          <span className="text-muted-foreground">
            Ich akzeptiere die Verarbeitung meiner Angaben zur Beantwortung meiner
            Anfrage. Weitere Infos in der{" "}
            <a href="/datenschutz" className="underline">
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>
        {errors.privacyConsent && (
          <p className={ERROR_CLASS}>{errors.privacyConsent.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          aria-busy={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-brand-solid-hover sm:w-auto"
        >
          {isLoading ? "Wird gesendet…" : "Kostenlose Fenster-Beratung anfragen"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Unverbindlich. Keine Kosten. Keine Werbemails.
        </p>
      </div>

      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-sm text-blue-600 dark:text-blue-400">
          {errorMsg}
        </p>
      )}

      {/* reCAPTCHA-Pflichthinweis (Badge ist ausgeblendet) */}
      <div className="mt-2 flex items-center gap-3 border-t border-border/60 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400"
        >
          <ShieldCheck size={22} strokeWidth={2} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium text-foreground">
            Geschützt durch reCAPTCHA
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Datenschutz
            </a>
            {" · "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Nutzungsbedingungen
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
