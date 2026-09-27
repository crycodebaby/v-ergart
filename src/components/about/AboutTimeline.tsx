// src/components/about/AboutTimeline.tsx
"use client";

/**
 * Die Zeitachse ist das Kernbild der Seite: acht Jahre Betrieb in Neuss, in
 * fünf Stationen, ohne dass irgendwo eine Jahreszahl gesucht werden muss.
 *
 * Statt vier gleich aussehender Kacheln (vorher) eine durchgehende senkrechte
 * Achse. Die Haarlinie liegt ruhig da; darüber zeichnet sich beim Scrollen eine
 * Linie in Brandfarbe mit — scrollgebunden, nicht als Abspielanimation. Der
 * Fortschritt gehört dem Leser, nicht einem Timer. Das ist der beruhigende
 * Teil: die Bewegung antwortet, sie drängt nicht.
 *
 * Die letzte Station ist ein Vorhaben, kein Beleg. Ihr Punkt bleibt hohl und
 * gestrichelt, ihre Jahresangabe steht in Grau statt in Brandfarbe, und der
 * Planungshinweis hängt direkt daran. Ein Plan darf nicht so aussehen wie
 * etwas, das schon passiert ist.
 *
 * Fläche und Abstand kommen von aussen (<Section>).
 */
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutTimeline() {
  const { eyebrow, title, lede, span, stations, note } = ABOUT_PAGE_DATA.timeline;
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  // Die Achse füllt sich zwischen "Block betritt das untere Fünftel" und
  // "Block verlässt die Bildmitte" — bei normalem Lesetempo ist die Linie
  // genau dann voll, wenn die letzte Station gelesen ist.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      {/* Ab lg bleibt der Kopf stehen, während die Stationen daran
          vorbeilaufen. Das füllt nicht nur die rechte Hälfte, die sonst leer
          bliebe — es hält auch die Frage sichtbar, die die Achse beantwortet.
          `top-28` hält Abstand zum Sticky-Header der Seite. */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            meta={span}
            ledeWidth="md"
            className="max-w-none"
          />
        </div>
      </div>

      <div ref={railRef} className="relative mt-12 md:mt-14 lg:col-span-8 lg:mt-0">
        {/* Ruhende Achse. */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[7px] top-3 w-px bg-border"
        />
        {/* Mitgezeichnete Linie in Brandfarbe. `origin-top` + scaleY statt
            height: läuft auf dem Compositor, kein Layout pro Frame.

            `scaleY` hängt bewusst NICHT von `reduce` ab. Der Server kennt die
            Nutzereinstellung nicht und würde immer die animierte Variante
            ausliefern — ein `reduce ? 1 : progress` im style-Attribut ist
            damit ein Hydration-Mismatch. Stattdessen übernimmt CSS: die
            Utility `motion-reduce:!transform-none` schlägt den Inline-Style
            und lässt die Linie schlicht vollständig stehen. Kein Branch im
            Render, dasselbe Ergebnis. */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-brand motion-reduce:!transform-none"
          style={{ scaleY: progress }}
        />

        <ol className="space-y-12 md:space-y-14">
          {stations.map((station) => (
            <li
              key={station.id}
              className="relative grid gap-x-8 gap-y-2 pl-10 md:grid-cols-[7.5rem_minmax(0,1fr)] md:pl-12"
            >
              {/* Punkt auf der Achse: aussen ein Ring auf Seitengrund, damit
                  die Achse ihn nicht durchschneidet, innen der Kern. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-background",
                  station.outlook
                    ? "border-dashed border-muted-foreground/70"
                    : "border-brand"
                )}
              >
                {station.outlook ? null : (
                  <motion.span
                    className="h-[7px] w-[7px] rounded-full bg-brand"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: 0.1 }
                    }
                  />
                )}
              </span>

              <p
                className={cn(
                  "font-mono text-sm uppercase tracking-wider md:pt-0.5",
                  station.outlook ? "text-muted-foreground" : "text-brand-text"
                )}
              >
                {station.period}
              </p>

              <div>
                <h3 className="text-lg font-semibold leading-snug text-foreground md:text-xl">
                  {station.title}
                </h3>
                <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
                  {station.text}
                </p>
                {station.badge ? (
                  <p className="mt-3 inline-flex items-center gap-2 border-t border-border pt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
                    {station.badge}
                  </p>
                ) : null}

                {/* Partner-Beleg: dasselbe Gewicht wie ein Badge, nur mit
                    Logo. `dark:invert` wie im Footer — die Datei ist schwarz
                    auf Transparenz und verschwände sonst im Dark Mode. Das
                    Logo ist Beleg, kein Inhalt: der Name steht daneben,
                    deshalb bleibt das Bild fuer Screenreader leer. */}
                {station.partner ? (
                  <p className="mt-3 flex items-center gap-2.5 border-t border-border pt-3">
                    <Image
                      src={station.partner.image.src}
                      alt=""
                      aria-hidden="true"
                      width={station.partner.image.width ?? 500}
                      height={station.partner.image.height ?? 500}
                      className="h-6 w-6 shrink-0 object-contain dark:invert"
                    />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {station.partner.label}
                    </span>
                  </p>
                ) : null}
                {station.outlook ? (
                  <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-foreground">
                    {note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
