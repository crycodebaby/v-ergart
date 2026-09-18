// src/components/KarriereHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

type Props = {
  /** Anzahl aktiver Stellen aus Sanity – steuert Badge, CTA und Kennzahl. */
  jobCount: number;
};

export function KarriereHero({ jobCount }: Props) {
  const hasJobs = jobCount > 0;

  const stats = [
    {
      value: hasJobs ? String(jobCount) : "Initiativ",
      label: hasJobs
        ? jobCount === 1
          ? "offene Stelle"
          : "offene Stellen"
        : "Bewerbungen willkommen",
    },
    { value: "13+", label: "Jahre Erfahrung" },
    { value: "Neuss", label: "& Rhein-Kreis – kurze Wege" },
    { value: "Fest", label: "unbefristete Anstellung möglich" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Bühne: Teamfoto, dauerhaft dunkel abgedeckt (unabhängig vom Theme) */}
      <Image
        src="/bilder_ordner/ueberuns/teamfoto-vor-hauptzentrale-ergart.webp"
        alt="Das Team von Alexander Ergart vor der Hauptzentrale in Neuss"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-slate-950 to-transparent"
      />

      <div className="container mx-auto px-4 pb-10 pt-20 lg:pb-14 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hasJobs ? "Wir stellen ein" : "Karriere bei Ergart"}
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Handwerk mit Zukunft.
            <span className="mt-2 block text-brand-blue">Werden Sie Teil des Teams.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
            Hausmeisterservice, Gebäudereinigung und Fensterbau in Neuss –
            mit festen Ansprechpartnern, moderner Ausstattung und einem Team,
            das zusammenhält.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#offene-stellen"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-base font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100"
            >
              {hasJobs ? "Offene Stellen ansehen" : "Zur Initiativbewerbung"}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:info@ergart.de?subject=Initiativbewerbung"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              <Mail size={18} aria-hidden="true" />
              Initiativ bewerben
            </a>
          </div>
        </motion.div>

        {/* Kennzahlen-Leiste */}
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <li key={stat.label} className="bg-slate-950/70 p-5 lg:p-6">
              <p className="text-3xl font-bold tracking-tight lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
