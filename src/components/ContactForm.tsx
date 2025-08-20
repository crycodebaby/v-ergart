// src/components/ContactForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type FormInputs = {
  name: string;
  email: string;
  message: string;
  // Honeypot (sollte leer bleiben)
  hp?: string;
};

export const ContactForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorRegionRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setFocus,
  } = useForm<FormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Nach Submit-Fehler: Fokus ins Fehler-Region setzen
  useEffect(() => {
    if (submitError && errorRegionRef.current) {
      errorRegionRef.current.focus();
    }
  }, [submitError]);

  // Beim ersten Validierungsfehler automatisch zum Feld springen
  const onError = () => {
    const firstErrorName = (Object.keys(errors)[0] ?? "") as keyof FormInputs;
    if (firstErrorName) setFocus(firstErrorName);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Honeypot abfangen (Bots füllen das Feld)
    if (data.hp && data.hp.trim().length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mvgqjwkw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: "Neue Nachricht über das Kontaktformular",
          _source: "website-contact-form",
        }),
      });

      if (response.ok) {
        // Erfolgreich -> Danke-Seite
        router.push("/danke");
      } else {
        // Versuche Formspree-Fehler auszulesen (falls vorhanden)
        let errText = "Fehler beim Senden der Nachricht.";
        try {
          const json = await response.json();
          if (json?.errors?.[0]?.message) errText = json.errors[0].message;
        } catch {
          /* ignore JSON parse errors */
        }
        throw new Error(errText);
      }
    } catch (err: unknown) {
      setSubmitError(
        "Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background p-8 rounded-2xl shadow-lg border border-border/20">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Schreiben Sie uns eine Nachricht
      </h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {/* Honeypot (für Bots sichtbar, für Nutzer unsichtbar) */}
        <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="company">Firma</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            {...register("hp")}
          />
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name || undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", {
                required: "Bitte geben Sie Ihren Namen an.",
                minLength: {
                  value: 2,
                  message: "Der Name sollte mindestens 2 Zeichen lang sein.",
                },
              })}
              className="w-full bg-secondary rounded-md border border-border/50 p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              required
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* E-Mail */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email || undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Bitte geben Sie Ihre E-Mail an.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
                },
              })}
              className="w-full bg-secondary rounded-md border border-border/50 p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              required
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Nachricht */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Ihre Nachricht
            </label>
            <textarea
              id="message"
              rows={5}
              aria-invalid={!!errors.message || undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message", {
                required: "Bitte geben Sie eine Nachricht ein.",
                minLength: {
                  value: 10,
                  message:
                    "Die Nachricht sollte mindestens 10 Zeichen enthalten.",
                },
                maxLength: {
                  value: 5000,
                  message: "Die Nachricht ist zu lang.",
                },
              })}
              className="w-full bg-secondary rounded-md border border-border/50 p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              required
            />
            {errors.message && (
              <p id="message-error" className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 py-6 text-lg"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center">
              <Loader2 className="mr-2 animate-spin" size={18} />
              Wird gesendet...
            </span>
          ) : (
            <>
              Nachricht senden <Send className="ml-2" size={18} />
            </>
          )}
        </Button>
      </form>

      {/* Fehlerbereich (nur bei Fehlversuch) */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            role="alert"
            tabIndex={-1}
            ref={errorRegionRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 p-3 rounded-md bg-red-500/10 text-red-700 dark:text-red-400 focus:outline-none"
            aria-live="polite"
          >
            <AlertTriangle size={20} />
            {submitError}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
