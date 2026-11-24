// src/components/ContactForm.tsx
"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { trackEvent, trackLeadForm } from "@/lib/analytics";
import { ContactPrivacyNotice } from "@/components/contact/ContactPrivacyNotice";
import { executeRecaptcha } from "@/lib/recaptcha-client";
import {
  CONTACT_RECAPTCHA_ACTION,
  type ContactResponse,
} from "@/lib/contact-lead";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string; // Honeypot (hidden)
  recaptchaConsent: boolean;
};

const SERVICES = [
  "Hausmeisterdienste",
  "Fensterservice",
  "Fenster & Türen",
  "Innenausbau & Renovierung",
  "Gebäudereinigung",
  "Garten- & Landschaftspflege",
  "Winterdienst",
  "Sonstiges",
];

type ContactFormProps = {
  /** Optionale custom Service-Liste (z.B. für Landingpages) */
  customServices?: string[];
  /** Optionale Quelle für Tracking (z.B. "Fensterservice Landingpage") */
  source?: string;
};

export default function ContactForm({
  customServices,
  source = "Kontaktseite"
}: ContactFormProps = {}) {
  const [hasStarted, setHasStarted] = useState(false);

  /**
   * Synchrone Doppel-Absende-Sperre: `status` und das `disabled` am Button
   * greifen erst nach dem naechsten Render, ein schneller Doppelklick feuert
   * vorher bereits den zweiten Submit ab.
   */
  const inFlight = useRef(false);
  /** Bleibt ueber Retries gleich -> serverseitige Idempotenz. */
  const submissionId = useRef<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Track form first interaction (friction tracking)
  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_start" });
        trackEvent('lead_form_view', { form_context: source });
      }
    }
  };

  // Track form validation errors (friction tracking)
  const onFormError = (errors: any) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 
        event: "form_error",
        errorFields: Object.keys(errors)
      });
      trackEvent('cta_contact_click', { form_context: source, error_type: 'validation' });
    }
  };

  // Services: Custom falls übergeben, sonst Standard
  const services = customServices || SERVICES;

  const onSubmit = async (values: FormValues) => {
    // Doppelklick / Enter-Spam laeuft ins Leere, solange ein Request laeuft.
    if (inFlight.current) return;
    inFlight.current = true;

    // simple bot-stop: if honeypot filled, silently succeed
    if (values.website) {
      // Vor dem try-Block, das finally greift hier nicht.
      inFlight.current = false;
      setStatus("success");
      reset();
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
      // reCAPTCHA v3: Token vor dem Absenden holen. Die Action ist die
      // zentrale Konstante, die der Server exakt gegenpruft.
      const recaptchaToken = await executeRecaptcha(CONTACT_RECAPTCHA_ACTION);
      if (!recaptchaToken) {
        setStatus("error");
        setErrorMsg("Die Spam-Prüfung ist gerade nicht verfügbar. Ihre Angaben bleiben im Formular. Bitte versuchen Sie es erneut oder nutzen Sie den direkten Kontakt.");
        return;
      }

      // Der eigene Server prüft das Token vor der Zustellung an Formspark.
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone ?? "",
          service: values.service ?? "",
          message: values.message,
          consent: values.recaptchaConsent === true,
          source: source,
          recaptchaToken,
          submissionId: submissionId.current,
          // Honeypot wird nicht gesendet (bereits abgefangen)
        }),
      });

      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (!res.ok || !data || data.ok !== true) {
        setStatus("error");
        setErrorMsg(
          (data && data.ok === false && data.error) ||
            "Senden fehlgeschlagen. Bitte später erneut versuchen."
        );
        return;
      }

      setStatus("success");
      submissionId.current = "";
      reset();

      // Primary Conversion Google Ads & Plausible – unveraendert gegenueber
      // Batch 3.1, damit keine bestehende GTM-Conversion ausfaellt.
      if (data.delivered === true && typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "fensterservice_lead_submit_success",
          source: source,
          service: values.service || "Keine Angabe"
        });
        trackLeadForm('submit', 'contact_form', source);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onFormError)}
      onChange={handleFormStart}
      onFocusCapture={handleFormStart}
      className="space-y-5 relative rounded-xl border border-border bg-gradient-to-b from-card to-card/80 p-5 md:p-6"
    >
      {/* subtile Akzentkante oben */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
        className="hidden"
      />

      {/* Headline/Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2 py-1 text-xs font-medium text-brand-text">
          <Sparkles size={14} />
          Schnellanfrage
        </span>
        <span className="text-xs text-muted-foreground">
          Antwort i. d. R. &lt; 24h
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register("name", { required: "Bitte Namen angeben." })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-ring transition"
            placeholder="Max Mustermann"
          />
          {errors.name && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-Mail *</label>
          <input
            type="email"
            {...register("email", {
              required: "Bitte E-Mail angeben.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ungültige E-Mail.",
              },
            })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-ring transition"
            placeholder="beispiel@mail.de"
          />
          {errors.email && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-ring transition"
            placeholder="+49 …"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Anliegen
          </label>
          <select
            {...register("service")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-ring transition"
            defaultValue=""
          >
            <option value="" disabled>
              Bitte wählen (optional)
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nachricht *</label>
        <textarea
          rows={6}
          {...register("message", {
            required: "Bitte eine Nachricht schreiben.",
          })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-ring transition"
          placeholder="Beschreiben Sie kurz Ihr Anliegen, Objektart/Lage, gewünschte Leistung und ggf. Zeitfenster …"
        />
        {errors.message && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{errors.message.message}</p>
        )}
      </div>

      <ContactPrivacyNotice
        consent={register("recaptchaConsent", {
          required: "Bitte erlauben Sie die Spam-Prüfung oder nutzen Sie den direkten Kontakt.",
        })}
        error={errors.recaptchaConsent?.message}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground hover:bg-brand-solid-hover"
        >
          {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
        </Button>
        {status === "success" && (
          <span role="status" className="text-sm text-emerald-600">
            Vielen Dank! Wir melden uns zeitnah.
          </span>
        )}
        {status === "error" && (
          <span role="alert" className="text-sm text-blue-600 dark:text-blue-400">{errorMsg}</span>
        )}
      </div>
    </form>
  );
}
