// src/components/BewerbungsAblauf.tsx
/**
 * Bewerbungsablauf in drei Schritten – auf /karriere und in jeder
 * Stellenanzeige. Nummer in Mono, Haarlinie als Zeitachse, kein Kartenraster.
 * Rendert nur Inhalt; die Fläche kommt von aussen.
 */
import { KARRIERE_STEPS } from "@/lib/karriere-data";

export function BewerbungsAblauf({ title = "So läuft Ihre Bewerbung" }: { title?: string }) {
  return (
    <div>
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Ablauf
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Drei Schritte, keine Formulare, keine Wartezeiten von Wochen.
        </p>
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
        {KARRIERE_STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-border pt-5">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text">
              Schritt {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
