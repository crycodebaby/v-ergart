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
 * - Header-Badges: "13+ Jahre Erfahrung" + "Mitglied der HWK Düsseldorf"
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, ChevronDown } from "lucide-react";
import { SITE_LINKS } from "@/lib/site-links";

// ─── Konstanten ──────────────────────────────────────────────────────────────

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
    alt: "Vorbereiteter Arbeitsplatz nach Ausbau alter Fenster – Fenstermontage Neuss",
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
    alt: "Professionelle Fenstermontage via Sauglift – Fenstereinbau Neuss",
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
            // brand-solid statt brand: der Balken zeigt Fortschritt an und
            // ist damit ein Statusindikator (WCAG 1.4.11, 3:1). Das helle
            // --brand erreicht auf --muted nur 2.68:1, --brand-solid 4.36:1
            // (light) bzw. 3.77:1 (dark).
            i <= active ? "bg-brand-solid" : "bg-border"
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
        href={SITE_LINKS.external.googleCalendarBooking}
        target="_blank"
        rel="noopener noreferrer"
        data-track="process-stepper-calendar-cta"
        className={cn(
          "inline-flex items-center gap-2 rounded-lg",
          "bg-primary text-primary-foreground px-5 py-2.5",
          "text-sm font-semibold shadow-md",
          "hover:opacity-90 active:scale-95 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

  // Kein aria-label auf diesem div: ohne Rolle wird es ignoriert. Die
  // Benennung gehoert an die <Section> der jeweiligen Page, die als
  // <section> eine echte Landmark rendert.
  return (
    <div>
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 text-xs font-semibold text-brand-text uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              13+ Jahre Erfahrung
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              Mitglied der HWK Düsseldorf
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
            EIN LAYOUT FÜR ALLE BREITEN  (Batch 2, Phase 7)
            ─────────────────────────────────────────────────────────────
            Vorher gab es drei getrennte DOM-Bäume (md:hidden /
            hidden md:flex lg:hidden / hidden lg:block). Jeder davon
            rendert alle acht Schritt-Titel und -Beschreibungen – der
            komplette Prozesstext stand also DREIMAL im ausgelieferten
            HTML, zwei Kopien nur per CSS versteckt. Auf zwei Seiten
            (/fenster, /fensterservice) waren das sechs Kopien desselben
            Textes.

            Jetzt eine gemeinsame Struktur, die per Breakpoint umsortiert:
              < 768px  Accordion, Bild klappt inline im Schritt auf
              768–1023 Bild-Panel oben, Schritte zweispaltig darunter
              ≥ 1024px Sticky-Split: Schritte links, Bild-Panel rechts

            Die Show/Hide-Logik bleibt wie gehabt CSS-basiert (max-h /
            opacity), damit alle acht Beschreibungen im DOM stehen.
        ══════════════════════════════════════════════════════════════ */}

        {/* Fortschrittsleiste: ab Tablet. Auf Mobile traegt das Accordion
            den Fortschritt selbst (aufgeklappter Schritt + Haken). */}
        <div className="hidden md:block">
          <ProgressBar active={activeStep} total={total} />
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12 xl:gap-16">
          {/* ── Bild-Panel ───────────────────────────────────────────
              Mobile: ausgeblendet, das Bild steckt im offenen Schritt.
              Tablet: oben im Fluss. Desktop: rechte Spalte, sticky. */}
          <div className="hidden md:block lg:sticky lg:top-24 lg:order-2">
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl lg:aspect-[4/3] lg:shadow-2xl">
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
                    sizes="(min-width: 1024px) 55vw, (min-width: 768px) 100vw, 1px"
                    priority={activeStep === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="mb-1 text-sm font-medium text-white/70">
                          Schritt {activeStep + 1} von {total}
                        </p>
                        <h3 className="text-xl font-bold text-white lg:text-2xl">
                          {processSteps[activeStep].title}
                        </h3>
                      </div>
                      {/* Rein dekorativ: "Schritt X von Y" steht daneben. */}
                      <span
                        aria-hidden="true"
                        className="hidden select-none text-6xl font-black leading-none tabular-nums text-white/20 lg:inline"
                      >
                        {stepNum(activeStep)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots – ab Desktop */}
            <div
              className="mt-4 hidden justify-center gap-2 lg:flex"
              role="tablist"
              aria-label="Schritt-Navigation"
            >
              {processSteps.map((step, i) => (
                <button
                  key={step.title}
                  role="tab"
                  aria-selected={activeStep === i}
                  aria-label={`Schritt ${i + 1}: ${step.title}`}
                  onClick={() => handleStep(i)}
                  className={cn(
                    "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    // brand-solid: der aktive Punkt ist Statusindikator,
                    // nicht Dekoration. Siehe ProgressBar.
                    activeStep === i
                      ? "h-2 w-6 bg-brand-solid"
                      : "h-2 w-2 bg-border hover:bg-brand-blue/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* ── Schritt-Liste ────────────────────────────────────────
              Mobile einspaltig (Accordion), Tablet zweispaltig,
              Desktop wieder einspaltig in der linken Spalte. */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:order-1 lg:grid-cols-1">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isDone = index < activeStep;
              const isLast = index === total - 1;

              return (
                <div
                  key={step.title}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition-all duration-300",
                    isActive
                      ? "border-brand-blue bg-card shadow-lg lg:bg-brand-blue/5"
                      : "border-border bg-card/60 lg:border-transparent lg:bg-transparent lg:hover:border-brand-blue/30 lg:hover:bg-muted/50"
                  )}
                >
                  <button
                    onClick={() => handleStep(index)}
                    aria-expanded={isActive}
                    aria-controls={`step-content-${index}`}
                    className="group flex w-full items-center gap-4 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:p-5"
                  >
                    {/* Schrittnummer: Badge bis Tablet, grosse Ziffer ab Desktop */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black tabular-nums transition-colors duration-300",
                        "lg:h-auto lg:w-auto lg:rounded-none lg:bg-transparent lg:text-2xl lg:leading-none",
                        isActive
                          ? "bg-primary text-primary-foreground lg:text-brand-text"
                          : isDone
                          ? "bg-muted text-muted-foreground lg:text-green-500"
                          : "bg-muted text-muted-foreground lg:text-muted-foreground/40"
                      )}
                    >
                      {stepNum(index)}
                    </span>

                    <span className="flex-1 text-base font-bold text-foreground">
                      {step.title}
                    </span>

                    {isDone ? (
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-green-500"
                        aria-label="Abgeschlossen"
                      />
                    ) : (
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                          isActive
                            ? "rotate-180 lg:text-brand-text"
                            : "lg:group-hover:text-brand-text"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {/* ── Inhalt: IMMER im DOM, Show/Hide per CSS ──────
                      max-h-Transition statt conditional rendering, damit
                      Crawler alle acht Beschreibungen sehen. */}
                  <div
                    id={`step-content-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-in-out",
                      isActive ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                    )}
                    aria-hidden={!isActive}
                  >
                    <div className="px-4 pb-5 lg:pl-[3.75rem] lg:pr-5">
                      {/* Bild inline – nur Mobile, sonst uebernimmt das Panel */}
                      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg shadow-sm md:hidden">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 1px"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                          <span className="text-xs font-semibold text-white">
                            Schritt {index + 1} von {total}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      {isLast && <BookingCTA />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
};

export default ProcessStepper;
