// src/components/BewerbungsAblauf.tsx
import { FileText, Handshake, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Bewerbung senden",
    text: "Lebenslauf, Zeugnisse und ein kurzes Anschreiben per E-Mail – mehr braucht es nicht.",
  },
  {
    icon: Handshake,
    title: "Persönlich kennenlernen",
    text: "Wir melden uns zeitnah und lernen uns im Gespräch in Neuss kennen.",
  },
  {
    icon: Rocket,
    title: "Einarbeitung & Start",
    text: "Strukturierte Einarbeitung mit festem Ansprechpartner – Sie starten nicht allein.",
  },
];

/**
 * Bewerbungsablauf in drei Schritten – auf /karriere und in jeder
 * Stellenanzeige. Rendert nur Inhalt; die Fläche kommt von aussen.
 */
export function BewerbungsAblauf({ title = "So läuft Ihre Bewerbung" }: { title?: string }) {
  return (
    <div>
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
          In 3 Schritten
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute right-6 top-4 text-6xl font-bold leading-none text-brand-blue/15"
            >
              {index + 1}
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <step.icon className="h-6 w-6 text-brand-text" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
