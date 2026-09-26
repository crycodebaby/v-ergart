// src/components/BewerbungsAblauf.tsx
"use client";

/**
 * Bewerbungsablauf in drei Schritten – auf /karriere und in jeder
 * Stellenanzeige. Nummer in Mono, Haarlinie als Zeitachse, kein Kartenraster.
 *
 * Detail 4: Sobald der Block ins Bild kommt, zeichnet sich eine Linie in
 * Brandfarbe über die Haarlinie durch alle drei Schritte – der Weg von der
 * Bewerbung bis zum Start, einmal, ruhig, nicht wiederholt.
 *
 * Rendert nur Inhalt; die Fläche kommt von aussen.
 */
import { motion, useReducedMotion } from "framer-motion";
import { KARRIERE_STEPS } from "@/lib/karriere-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BewerbungsAblauf({ title = "So läuft Ihre Bewerbung" }: { title?: string }) {
  const reduce = useReducedMotion();

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

      <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
        {/* Zeitachse: Haarlinie über die volle Breite (nur ab md, wo die
            Schritte nebeneinander liegen), darüber die gezeichnete Linie. */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-border md:block" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-px origin-left bg-brand md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? { duration: 0 } : { duration: 1.4, ease: EASE, delay: 0.2 }}
        />

        {KARRIERE_STEPS.map((step, index) => (
          <li key={step.title} className="relative border-t border-border pt-5 md:border-t-0">
            {/* Marker auf der Zeitachse */}
            <motion.span
              aria-hidden="true"
              className="absolute -top-[3.5px] left-0 hidden h-2 w-2 rounded-full bg-brand md:block"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.35, ease: EASE, delay: 0.2 + index * 0.45 }
              }
            />
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
