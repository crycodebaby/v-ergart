// src/components/WhyWorkWithUs.tsx
"use client";

import { motion } from "framer-motion";
import { Award, Heart, Shield, Sparkles, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Sicherer Arbeitsplatz",
    description:
      "Unbefristeter Vertrag, moderne Ausrüstung und ein professionelles Umfeld für Ihre langfristige Perspektive.",
  },
  {
    icon: Heart,
    title: "Wertschätzung",
    description:
      "Faire Bezahlung, Anerkennung Ihrer Leistung und ein respektvoller Umgang auf Augenhöhe.",
  },
  {
    icon: Users,
    title: "Starkes Team",
    description:
      "Familiäres Arbeitsklima mit gegenseitiger Unterstützung und ehrlichem, direktem Austausch.",
  },
  {
    icon: TrendingUp,
    title: "Entwicklung",
    description:
      "Weiterbildung, Schulungen und die Chance, mit dem Unternehmen zu wachsen.",
  },
  {
    icon: Sparkles,
    title: "Moderne Ausstattung",
    description:
      "Hochwertiges Werkzeug, gepflegte Fahrzeuge und alles, was Sie für saubere Arbeit brauchen.",
  },
  {
    icon: Award,
    title: "Qualitätsfokus",
    description:
      "Arbeit, auf die man stolz sein kann – mit namhaften Partnern und Lieferanten im Rücken.",
  },
];

/**
 * Arbeitgeber-Vorteile. Rendert nur Inhalt – Fläche, Abstand und Breite
 * kommen von der umgebenden <Section> der Seite.
 */
export function WhyWorkWithUs() {
  return (
    <div>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
          Ihre Vorteile
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Warum bei Ergart arbeiten?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Mehr als nur ein Job – ein Arbeitsplatz, an dem Sie sich wohlfühlen
          und Ihre Fähigkeiten einbringen können.
        </p>
      </div>

      <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <motion.li
            key={benefit.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="bg-card p-6 lg:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <benefit.icon className="h-6 w-6 text-brand-text" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
