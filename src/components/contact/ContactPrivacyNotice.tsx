"use client";

import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CONTACT } from "@/lib/site-links";

export function ContactPrivacyNotice({
  consent,
  error,
}: {
  consent: UseFormRegisterReturn;
  error?: string;
}) {
  const hintId = useId();
  const errorId = `${hintId}-error`;

  return (
    <div className="space-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
      <p>
        Wir verarbeiten Ihre Angaben zur Bearbeitung Ihrer Anfrage. Bitte geben Sie keine sensiblen Daten an.
        {" "}<a href="/datenschutz#kontaktformular" className="underline underline-offset-2">Datenschutzhinweise zum Formular</a>
      </p>
      <label className="flex items-start gap-3 text-foreground">
        <input
          type="checkbox"
          {...consent}
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
          className="mt-1 h-4 w-4 shrink-0 rounded border-input bg-background text-brand-text focus:ring-ring"
        />
        <span>Ich willige ein, dass beim Absenden Google reCAPTCHA zur Spam-Prüfung eingesetzt wird.</span>
      </label>
      <p id={hintId} className="text-xs">
        Google verarbeitet dabei technische Daten und kann ein Cookie setzen.
        {" "}<a href="/datenschutz#recaptcha" className="underline underline-offset-2">Details zu reCAPTCHA</a>
      </p>
      {error && <p id={errorId} role="alert" className="text-blue-600 dark:text-blue-400">{error}</p>}
      <p className="text-xs">
        Ohne Google-Prüfung erreichen Sie uns unter{" "}
        <a href={CONTACT.emailHref} className="underline underline-offset-2">{CONTACT.email}</a>
        {" "}oder telefonisch unter{" "}
        <a href={CONTACT.phoneHref} className="underline underline-offset-2">{CONTACT.phoneDisplay}</a>.
      </p>
    </div>
  );
}
