// src/components/ProcessStepper.tsx
/**
 * ProcessStepper – Production Rewrite
 *
 * ARCHITEKTUR:
 * ─────────────────────────────────────────────────────────
 * Mobile  (<768px)  : Vertikales Accordion – jeder Schritt klappt auf,
 *                     zeigt Bild (aspect-video) + Beschreibung inline.
 * Tablet  (768-1023):  Stacked – Bild-Preview oben (aspect-video),
 *                     Schritt-Liste darunter. Kein sticky nötig.
 * Desktop (≥1024px) : Sticky-Split 2-Spalten – links Schritt-Liste,
 *                     rechts sticky Bild-Panel.
 *
 * SEO-STRATEGIE:
 * ─────────────────────────────────────────────────────────
 * Alle Beschreibungen sind IMMER im DOM (kein conditional rendering).
 * Visuelles Show/Hide erfolgt ausschließlich via CSS (max-h / opacity).
 * → Google indexiert alle 8 Schritte vollständig.
 *
 * TRUST & EXPERTISE:
 * ─────────────────────────────────────────────────────────
 * - Große Schritt-Nummerierung (01–08) mit Bauhaus-Typographie
 * - Progress-Indicator oben
 * - Schritt 8 ("Abschluss") mit Termin-Buchungs-CTA
 * - Header-Badges: "12+ Jahre Erfahrung" + "Meisterbetrieb"
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, ChevronDown } from "lucide-react";

// ─── Konstanten ──────────────────────────────────────────────────────────────

const GOOGLE_CALENDAR_URL = "https://calendar.app.google/ZYpM2cqo9omejSDR7";

// ─── Step-Daten (Schritt 3 ↔ 4 korrigiert: Logistik vor Anlieferung) ─────────

const processSteps = [
  {
    title: "Bestandsaufnahme",
    description:
      "Jedes Projekt beginnt mit der Analyse. Wir begutachten die alten Fenster und die Bausubstanz – so entstehen keine Überraschungen beim Einbau.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster.webp",
    alt: "Bestandsaufnahme alter Fenster vor der Montage – Fensterservice Neuss Alexander Ergart",
  },
  {
    title: "Vorbereitung",
    description:
      "Nach dem Ausbau der alten Elemente wird der Arbeitsplatz sauber vorbereitet und geschützt. Sauberkeit und Schutz Ihrer Räume sind für uns selbstverständlich.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster-ausgebaut-vorbereiteter-arbeitsplatz.webp",
    alt: "Vorbereiteter Arbeitsplatz nach Ausbau alter Fenster – Meisterbetrieb Neuss",
  },
  {
    // War Schritt 4 (Logistik) – jetzt Schritt 3
    title: "Logistik",
    description:
      "Mit schwerem Gerät wie Kränen und Spezialfahrzeugen positionieren wir auch große Fensterelemente millimetergenau – sicher und schadensfrei.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
    alt: "Kranmontage großer Fensterelemente – Fensterbau Profi Neuss",
  },
  {
    // War Schritt 3 (Anlieferung) – jetzt Schritt 4
    title: "Anlieferung",
    description:
      "Die neuen, maßgefertigten HÖNING-Fensterelemente werden sicher auf Spezialgestellen angeliefert. Jedes Element wird auf Transportschäden geprüft.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheiben-auf-gestell-für-fensterelemente.webp",
    alt: "Anlieferung maßgefertigter HÖNING Fensterscheiben auf Gestell – Fenstereinbau Neuss",
  },
  {
    title: "Präzisionsarbeit",
    description:
      "Der spezielle Saugkraft-Hebelift ermöglicht eine sichere und beschädigungsfreie Handhabung der Scheiben. Modernste Technik für maximale Qualität.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheibe-hochgehoben-durch-saugkraft-lift.webp",
    alt: "Saugkraft-Hebelift für sichere Fensterscheiben-Handhabung – Fensterprofi Neuss",
  },
  {
    title: "Montage",
    description:
      "Das neue Fensterelement wird passgenau in die Öffnung eingesetzt und professionell verankert. Jeder Handgriff sitzt – das Ergebnis hält Jahrzehnte.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/montageprozess-der-neuen-scheibe-via-sauglift.webp",
    alt: "Professionelle Fenstermontage via Sauglift – Fenstereinbau Meisterbetrieb Neuss",
  },
  {
    title: "Finale Justierung",
    description:
      "Nach dem Einbau wird alles absolut präzise justiert: Dichtigkeit, Öffnungswinkel, Beschläge. Erst wenn alles perfekt sitzt, ist der Schritt abgeschlossen.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/finale-fensterelement-abdichtung.webp",
    alt: "Finale Abdichtung und Justierung des Fensterelements – Qualitätskontrolle Fensterbau Neuss",
  },
  {
    title: "Abschluss & Übergabe",
    description:
      "Das Endergebnis: Eine neue, saubere und energieeffiziente Fensterfront. Wir erklären Ihnen die Pflege und Funktionen – und hinterlassen eine makellos saubere Baustelle.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
    alt: "Fertig montierte neue Fensterfront – professioneller Fenstereinbau Ergebnis Neuss",
  },
] as const;

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

/** Zweistellige Schrittnummer: 1 → "01" */
function stepNum(i: number) {
  return String(i + 1).padStart(2, "0");
}

// ─── Sub-Komponenten ─────────────────────────────────────────────────────────

/** Fortschrittsleiste (Desktop + Tablet) */
function ProgressBar({ active, total }: { active: number; total: number }) {
  return (
    <div
      aria-label={`Schritt ${active + 1} von ${total}`}
      className="flex gap-1.5 mb-10"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full transition-all duration-500",
            i <= active ? "bg-brand-blue" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

/** Terminbuchungs-CTA (nur in letztem Schritt) */
function BookingCTA() {
  return (
    <div className="mt-5 pt-5 border-t border-brand-blue/20">
      <p className="text-sm text-muted-foreground mb-3">
        Überzeugt? Vereinbaren Sie jetzt Ihren kostenlosen Beratungstermin:
      </p>
      <Link
        href={GOOGLE_CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track="process-stepper-calendar-cta"
        className={cn(
          "inline-flex items-center gap-2 rounded-lg",
          "bg-brand-blue text-white px-5 py-2.5",
          "text-sm font-semibold shadow-md",
          "hover:opacity-90 active:scale-95 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        )}
      >
        <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
        Termin online buchen
      </Link>
    </div>
  );
}

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export const ProcessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReduced = useReducedMotion();
  const total = processSteps.length;

  const handleStep = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section
      aria-label="Unser Montageprozess – 8 Schritte"
      className="py-20 md:py-28 bg-slate-50 dark:bg-zinc-900"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 text-xs font-semibold text-brand-blue uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              12+ Jahre Erfahrung
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              Meisterbetrieb HWK Düsseldorf
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Transparenz von Anfang bis Ende
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verfolgen Sie unseren bewährten Montageprozess, der höchste Qualität
            und Sorgfalt in jedem der {total} Schritte sicherstellt.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            📱 MOBILE LAYOUT  (< 768px)
            Vertikales Accordion: Bild + Beschreibung klappen inline auf.
            Kein separates Bild-Panel – alles im Flow.
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-3 md:hidden">
          {processSteps.map((step, index) => {
            const isActive = activeStep === index;
            const isLast = index === total - 1;

            return (
              <div
                key={step.title}
                className={cn(
                  "rounded-xl border-2 transition-all duration-300 overflow-hidden",
                  isActive
                    ? "border-brand-blue bg-white dark:bg-zinc-800 shadow-lg"
                    : "border-border bg-white/60 dark:bg-zinc-800/40"
                )}
              >
                {/* Step Header – immer sichtbar, klickbar */}
                <button
                  onClick={() => handleStep(index)}
                  aria-expanded={isActive}
                  aria-controls={`step-content-${index}`}
                  className="w-full flex items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-inset rounded-xl"
                >
                  {/* Schrittnummer */}
                  <span
                    className={cn(
                      "shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-colors duration-300",
                      isActive
                        ? "bg-brand-blue text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                    aria-hidden="true"
                  >
                    {stepNum(index)}
                  </span>

                  <span className="flex-1 font-bold text-base text-foreground">
                    {step.title}
                  </span>

                  {/* Abgeschlossen-Checkmark für vorherige Schritte */}
                  {index < activeStep ? (
                    <CheckCircle2
                      className="w-5 h-5 text-green-500 shrink-0"
                      aria-label="Abgeschlossen"
                    />
                  ) : (
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isActive && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* ── Expandierbarer Inhalt (immer im DOM – SEO-safe!) ── */}
                {/* WICHTIG: max-h-Transition statt conditional rendering.
                    Google und andere Crawler sehen alle 8 Beschreibungen. */}
                <div
                  id={`step-content-${index}`}
                  className={cn(
                    "transition-all duration-500 ease-in-out overflow-hidden",
                    isActive ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                  )}
                  aria-hidden={!isActive}
                >
                  <div className="px-4 pb-5">
                    {/* Bild inline (aspect-video) */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 shadow-sm">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1px"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      {/* Step-Label Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                        <span className="text-white text-xs font-semibold">
                          Schritt {index + 1} von {total}
                        </span>
                      </div>
                    </div>

                    {/* Beschreibung */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* CTA im letzten Schritt */}
                    {isLast && <BookingCTA />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            📐 TABLET LAYOUT  (768px – 1023px)
            Bild-Preview oben, Schritt-Liste darunter.
            Kein sticky nötig – Bild ist im normalen Flow.
        ══════════════════════════════════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden flex-col gap-8">
          {/* Fortschrittsleiste */}
          <ProgressBar active={activeStep} total={total} />

          {/* Bild-Preview oben */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={prefersReduced ? undefined : { opacity: 0, scale: 1.03 }}
                animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) and (max-width: 1023px) 100vw, 1px"
                  priority={activeStep === 0}
                />
                {/* Overlay mit Step-Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                  <p className="text-white/70 text-sm font-medium mb-1">
                    Schritt {activeStep + 1} von {total}
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {processSteps[activeStep].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Schritt-Grid (2-spaltig auf Tablet) */}
          <div className="grid grid-cols-2 gap-3">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isLast = index === total - 1;
              return (
                <div key={step.title}>
                  <button
                    onClick={() => handleStep(index)}
                    aria-pressed={isActive}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-300",
                      isActive
                        ? "border-brand-blue bg-brand-blue/5 shadow-md"
                        : "border-border hover:border-brand-blue/40 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={cn(
                          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black",
                          isActive
                            ? "bg-brand-blue text-white"
                            : index < activeStep
                            ? "bg-green-100 dark:bg-green-900/40 text-green-600"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {index < activeStep ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          stepNum(index)
                        )}
                      </span>
                      <span className="font-bold text-sm text-foreground">
                        {step.title}
                      </span>
                    </div>
                    {/* Beschreibung – immer im DOM (SEO!), visuell nur bei aktiv sichtbar */}
                    <p
                      className={cn(
                        "text-xs text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden",
                        isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                      )}
                      aria-hidden={!isActive}
                    >
                      {step.description}
                    </p>
                  </button>

                  {/* Booking CTA nach letztem Schritt auf Tablet */}
                  {isLast && isActive && (
                    <div className="mt-3 px-1">
                      <BookingCTA />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            🖥️ DESKTOP LAYOUT  (≥ 1024px)
            Sticky-Split: Links Schritt-Liste, rechts sticky Bild-Panel.
        ══════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block">
          {/* Fortschrittsleiste */}
          <ProgressBar active={activeStep} total={total} />

          <div className="grid grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 items-start">
            {/* ── Linke Spalte: Schritt-Liste ──────────────────────── */}
            <div className="flex flex-col gap-3">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isLast = index === total - 1;

                return (
                  <div key={step.title}>
                    <button
                      onClick={() => handleStep(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "w-full text-left p-5 rounded-xl border-2 transition-all duration-300 group",
                        isActive
                          ? "border-brand-blue bg-brand-blue/5 shadow-lg"
                          : "border-transparent hover:border-brand-blue/30 hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {/* Große Schrittnummer – Bauhaus-Stil */}
                        <span
                          className={cn(
                            "shrink-0 font-black text-2xl leading-none tabular-nums transition-colors duration-300",
                            isActive
                              ? "text-brand-blue"
                              : index < activeStep
                              ? "text-green-500"
                              : "text-muted-foreground/40"
                          )}
                          aria-hidden="true"
                        >
                          {stepNum(index)}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-foreground">
                              {step.title}
                            </h3>
                            {index < activeStep && (
                              <CheckCircle2
                                className="w-4 h-4 text-green-500 shrink-0"
                                aria-label="Abgeschlossen"
                              />
                            )}
                          </div>
                        </div>

                        {/* Chevron-Indikator */}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0",
                            isActive ? "rotate-180 text-brand-blue" : "group-hover:text-brand-blue"
                          )}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Beschreibung – IMMER im DOM (SEO!), CSS-Show/Hide */}
                      <p
                        className={cn(
                          "text-sm text-muted-foreground leading-relaxed pl-10 transition-all duration-400 overflow-hidden",
                          isActive ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
                        )}
                        aria-hidden={!isActive}
                      >
                        {step.description}
                      </p>

                      {/* Terminbuchungs-CTA im letzten Schritt */}
                      {isLast && (
                        <div
                          className={cn(
                            "pl-10 overflow-hidden transition-all duration-400",
                            isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          )}
                          aria-hidden={!isActive}
                        >
                          <BookingCTA />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Rechte Spalte: Sticky Bild-Panel ─────────────────── */}
            <div className="sticky top-24">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={prefersReduced ? undefined : { opacity: 0, x: 30 }}
                    animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={processSteps[activeStep].image}
                      alt={processSteps[activeStep].alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 55vw, 1px"
                      priority={activeStep === 0}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Step-Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/70 text-sm font-medium mb-1">
                            Schritt {activeStep + 1} von {total}
                          </p>
                          <h3 className="text-white text-2xl font-bold">
                            {processSteps[activeStep].title}
                          </h3>
                        </div>
                        {/* Großes Schrittnummer-Badge */}
                        <span className="text-white/20 font-black text-6xl leading-none tabular-nums select-none">
                          {stepNum(activeStep)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Schritt-Navigation">
                {processSteps.map((step, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={activeStep === i}
                    aria-label={`Schritt ${i + 1}: ${step.title}`}
                    onClick={() => handleStep(i)}
                    className={cn(
                      "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                      activeStep === i
                        ? "w-6 h-2 bg-brand-blue"
                        : "w-2 h-2 bg-border hover:bg-brand-blue/50"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStepper;
