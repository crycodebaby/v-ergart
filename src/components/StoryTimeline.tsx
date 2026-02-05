// src/components/StoryTimeline.tsx
"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { ueberUnsMilestones } from "@/lib/ueber-uns-data";
import { Button } from "@/components/ui/button";

/**
 * Struktur in ueberUnsMilestones:
 * {
 *   year: string | number;
 *   title: string;
 *   text: string;
 *   image: string;
 *   badge?: string;
 *   align?: "left" | "right";
 * }
 */
type Milestone = (typeof ueberUnsMilestones)[number];

// --- Typ-sichere Easing-Definition (Cubic Bezier) ---
type Bezier = [number, number, number, number];
const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];

// --- Variants für Fade-Up ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 45%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);

  const isLeft =
    (milestone.align ?? (index % 2 === 0 ? "left" : "right")) === "left";

  return (
    <motion.article
      ref={ref}
      style={prefersReducedMotion ? undefined : { opacity, y }}
      className={`grid items-center gap-6 sm:gap-8 lg:gap-12 ${isLeft
        ? "lg:grid-cols-[1fr_1fr]"
        : "lg:grid-cols-[1fr_1fr] lg:[&>*:first-child]:order-2"
        }`}
      aria-label={`Meilenstein ${milestone.year}: ${milestone.title}`}
    >
      {/* Textblock */}
      <div>
        <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          {milestone.year}
        </span>
        <h3 className="mt-3 text-2xl font-bold leading-snug text-foreground sm:text-[1.65rem]">
          {milestone.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {milestone.text}
        </p>
        {milestone.badge && (
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border/40 bg-card shadow-sm flex-shrink-0">
              <Image
                src={milestone.badge}
                alt="Zertifizierung"
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <p className="text-xs text-muted-foreground italic">
              Offiziell anerkannt und zertifiziert
            </p>
          </div>
        )}
      </div>

      {/* Bildblock */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-md">
        <div className="relative aspect-[16/10] sm:aspect-[4/3]">
          <Image
            src={milestone.image}
            alt={milestone.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
            priority={index < 2}
          />
        </div>
      </div>
    </motion.article>
  );
}

export function StoryTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Fortschrittslinie in der Mitte füllt sich beim Scrollen
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 25%"],
  });

  const pathScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestones = useMemo(() => ueberUnsMilestones, []);

  return (
    <section
      ref={trackRef}
      className="relative py-20 sm:py-24 lg:py-28"
      aria-labelledby="timeline-heading"
    >
      {/* Solider Hintergrund (kein Durchscheinen) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--background))] dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-[hsl(var(--background))]" />

      <div className="container mx-auto max-w-6xl px-4 xl:max-w-7xl">
        {/* Intro */}
        <motion.header
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
          transition={prefersReducedMotion ? undefined : { delay: 0 }}
        >
          <h2
            id="timeline-heading"
            className="text-pretty text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Unsere Geschichte in Etappen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Wer wir sind, was uns antreibt und welche Schritte uns hierher
            geführt haben – kompakt und klar, vom Start bis heute.
          </p>
        </motion.header>

        {/* Zentraler Track */}
        <div className="relative">
          {/* Desktop: Linie */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          {/* Füll-Gradient entlang der Linie (Desktop) */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute left-1/2 top-28 hidden w-px -translate-x-1/2 lg:block"
              style={{
                scaleY: pathScale,
                transformOrigin: "top",
                background: "linear-gradient(#3399FF, rgba(51,153,255,0.12))",
                height: "calc(100% - 7rem)",
              }}
            />
          )}

          {/* Mobile: Leitlinie links */}
          <div className="absolute left-4 top-0 h-full w-px bg-border lg:hidden" />

          {/* Items */}
          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {milestones.map((m, i) => (
              <div key={`${m.year}-${i}`} className="relative">
                {/* Marker/Badge Desktop Mitte */}
                <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 lg:block">
                  <div className="relative -top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-[0.9rem] font-semibold text-foreground shadow">
                    {m.year}
                  </div>
                </div>

                {/* Marker Mobile links */}
                <div className="pointer-events-none absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border border-border/70 bg-card shadow lg:hidden" />

                <MilestoneCard milestone={m} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* NEU: „Zukunftsausblick“ – starker, thematischer Abschluss */}
        {/* ================================================================== */}
        <motion.div
          className="mx-auto mt-20 max-w-3xl text-center lg:mt-28"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.5 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
            Die Zukunft im Blick – für Neuss und die Region
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Unsere Geschichte ist ein Fundament, auf dem wir weiter bauen. Mit
            starken Partnern wie HÖNING an unserer Seite schaffen wir künftig
            noch mehr nachhaltige und wertige Lösungen für Ihr Zuhause.
          </p>
          <Button asChild className="mt-8">
            <Link href="/kontakt">
              Lassen Sie uns über Ihr Projekt sprechen
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default StoryTimeline;
