"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string; // Honeypot (hidden)
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>();
  const { errors } = formState;
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(
          json?.error || "Senden fehlgeschlagen. Bitte später erneut versuchen."
        );
        return;
      }

      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg("Netzwerkfehler. Bitte später erneut versuchen.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
        className="hidden"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register("name", { required: "Bitte Namen angeben." })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
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
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
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
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="+49 …"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Betreff</label>
          <input
            {...register("subject")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="Worum geht es?"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nachricht *</label>
        <textarea
          rows={6}
          {...register("message", {
            required: "Bitte eine Nachricht schreiben.",
          })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Beschreibe kurz dein Anliegen …"
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        Mit dem Absenden akzeptieren Sie die Verarbeitung Ihrer Angaben zur
        Beantwortung Ihrer Anfrage. Weitere Infos in der{" "}
        <a href="/datenschutz" className="underline">
          Datenschutzerklärung
        </a>
        .
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={status === "loading"}>
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
