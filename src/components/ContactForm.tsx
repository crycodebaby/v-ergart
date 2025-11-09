// src/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
  "Hausmeisterservice",
  "Fensterservice / Glasreinigung",
  "Reparaturen & Wartung",
  "Grundstückspflege",
  "Verwaltung von Mietimmobilien",
  "Verwaltung von Eigentumswohnungen",
  "Verwaltung von Apartmentkomplexen",
  "Hotelmanagement (technischer Service)",
  "Verwaltung gewerblicher Immobilien",
  "Verwaltung von Immobilienanlagen",
  "Verwaltung von Immobilien auf Inseln",
  "Eigenheimverwaltung",
  "Hausverwaltung für Ferienunterkünfte",
  "Immobilienmanagement (allgemein)",
];

export default function ContactForm() {
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
          source: "Kontaktseite",
          project: "Alexander Ergart – Hausmeister- & Fensterservice",
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
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(
        e?.message || "Senden fehlgeschlagen. Bitte später erneut versuchen."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2 py-1 text-xs font-medium text-brand-blue">
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
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition"
            placeholder="Max Mustermann"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
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
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition"
            placeholder="beispiel@mail.de"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition"
            placeholder="+49 …"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Anliegen / Leistung
          </label>
          <select
            {...register("service")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition"
            defaultValue=""
          >
            <option value="" disabled>
              Bitte wählen (optional)
            </option>
            {SERVICES.map((s) => (
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
          className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition"
          placeholder="Beschreiben Sie kurz Ihr Anliegen, Objektart/Lage, gewünschte Leistung und ggf. Zeitfenster …"
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          {...register("consent", {
            required: "Bitte Zustimmung zur Datenverarbeitung geben.",
          })}
          className="mt-1 h-4 w-4 rounded border-input bg-background text-brand-blue focus:ring-brand-blue/50"
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
        <p className="text-sm text-red-600 -mt-2">{errors.consent.message}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-brand-blue to-brand-blue/80 hover:from-brand-blue/90 hover:to-brand-blue/70 text-white"
        >
          {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
        </Button>
        {status === "success" && (
          <span className="text-sm text-emerald-600">
            Vielen Dank! Wir melden uns zeitnah.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">{errorMsg}</span>
        )}
      </div>
    </form>
  );
}
