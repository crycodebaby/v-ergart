// src/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck } from "lucide-react";
import { trackEvent, trackLeadForm } from "@/lib/analytics";
import { useRecaptcha } from "@/hooks/useRecaptcha";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string; // Honeypot (hidden)
  consent: boolean;
};

const SERVICES = [
  "Hausmeisterdienste",
  "Fensterservice",
  "Fenster & Türen",
  "Innenausbau & Renovierung",
  "Gebäudereinigung",
  "Garten- & Landschaftspflege",
  "Winterdienst",
  "Sicherheitstechnik",
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
  const { executeRecaptcha } = useRecaptcha();

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
    // simple bot-stop: if honeypot filled, silently succeed
    if (values.website) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // reCAPTCHA v3: Token vor dem Absenden holen
      const recaptchaToken = await executeRecaptcha("contact_form");
      if (!recaptchaToken) {
        setStatus("error");
        setErrorMsg("Sicherheitscheck fehlgeschlagen. Bitte Seite neu laden.");
        return;
      }

      const res = await fetch("https://formcarry.com/s/tUPZr1Mwu_1", {
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
          // Zusatzinfos, hilfreich im Posteingang:
          source: source,
          project: "Alexander Ergart – Hausmeister- & Fensterservice",
          // reCAPTCHA v3 Token – wird von Formcarry serverseitig verifiziert
          "g-recaptcha-response": recaptchaToken,
          // Honeypot wird nicht gesendet (bereits abgefangen)
        }),
      });

      // Formcarry liefert i. d. R. 200/OK mit JSON
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Unbekannter Fehler beim Senden.");
      }

      setStatus("success");
      reset();

      // Primary Conversion Google Ads & Plausible
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 
          event: "fensterservice_lead_submit_success",
          source: source,
          service: values.service || "Keine Angabe"
        });
        trackLeadForm('submit', 'contact_form', source);
      }
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(
        e?.message || "Senden fehlgeschlagen. Bitte später erneut versuchen."
      );
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

      {/* Consent */}
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          {...register("consent", {
            required: "Bitte Zustimmung zur Datenverarbeitung geben.",
          })}
          className="mt-1 h-4 w-4 rounded border-input bg-background text-brand-text focus:ring-ring"
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
      {errors.consent && (
        <p className="text-sm text-blue-600 dark:text-blue-400 -mt-2">{errors.consent.message}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground hover:bg-brand-solid-hover"
        >
          {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
        </Button>
        {status === "success" && (
          <span className="text-sm text-emerald-600">
            Vielen Dank! Wir melden uns zeitnah.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-blue-600 dark:text-blue-400">{errorMsg}</span>
        )}
      </div>

      {/* reCAPTCHA-Pflichthinweis (ersetzt das ausgeblendete Badge) */}
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
