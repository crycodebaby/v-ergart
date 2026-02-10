// src/app/danke/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

/**
 * Utility-Seite: Formular-Bestätigung
 * - Nicht für SEO gedacht (noindex)
 * - Wird nach Formular-Absendung angezeigt
 */
export const metadata: Metadata = {
  title: "Vielen Dank | Alexander Ergart",
  robots: {
    index: false,  // Nicht indexieren
    follow: true,  // Links folgen
  },
};

export default function DankePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <CheckCircle className="text-green-500 h-16 w-16 mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-4">Vielen Dank!</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Ihre Nachricht wurde erfolgreich an uns übermittelt. Wir werden uns so
        schnell wie möglich bei Ihnen melden.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
