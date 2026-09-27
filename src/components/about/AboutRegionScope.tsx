// src/components/about/AboutRegionScope.tsx
"use client";

/**
 * Einsatzgebiet und Leistungsspektrum.
 *
 * Vorher standen hier fünfzehn gleich aussehende Orts-Pills in einer Karte.
 * Das beantwortet die eigentliche Frage nicht: "Kommen Sie zu mir — und wie
 * schnell?" Deshalb jetzt drei Zonen statt einer Wolke, und daneben ein
 * Visual, das die Staffelung zeigt.
 *
 * Das Visual ist bewusst KEINE Landkarte. Eine gezeichnete Karte des
 * Rheinlands müsste Grenzen behaupten, die so nicht stimmen. Drei konzentrische
 * Ringe um Neuss behaupten nur das, was wahr ist: es gibt einen Kern, einen
 * Nahbereich und ein Gebiet nach Absprache. Die Ringe tragen dieselbe
 * Deckkraft wie die Punkte in der Legende — Bild und Liste sind dieselbe
 * Information, nicht Deko plus Text.
 *
 * Eine Welle läuft langsam nach aussen (14 s, sehr leise). Sie ist der einzige
 * Dauerloop der Seite und liegt bewusst unter der Wahrnehmungsschwelle: man
 * sieht ihn erst, wenn man hinschaut. Bei `prefers-reduced-motion` entfällt er.
 *
 * Fläche und Abstand kommen von aussen (<Section>).
 */
import { motion, useReducedMotion } from "framer-motion";

import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Radien der drei Zonenringe im 240er-Koordinatensystem, innen nach aussen. */
const ZONE_RADII = [46, 82, 116] as const;
/** Deckkraft pro Zone — dieselben Werte nutzt die Legende. */
const ZONE_OPACITY = [0.9, 0.58, 0.34] as const;
/** Strichstärke pro Zone: nach aussen leiser, wie die Verbindlichkeit. */
const ZONE_STROKE = [1.75, 1.25, 1] as const;

export default function AboutRegionScope() {
  const { eyebrow, title, lede, center, zones, scopes } = ABOUT_PAGE_DATA.region;
  const reduce = useReducedMotion();

  return (
    <div>
      <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Visual + Legende: gehören zusammen, deshalb eine Spalte. */}
        <div className="lg:col-span-7">
          <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)] sm:gap-10">
            <svg
              viewBox="0 0 240 240"
              role="img"
              aria-label={`Einsatzgebiet in drei Zonen um ${center}: ${zones
                .map((zone) => `${zone.label} mit ${zone.places.join(", ")}`)
                .join("; ")}.`}
              className="w-full max-w-[16.5rem] text-brand"
            >
              <defs>
                {/* Weicher Kern, damit die Mitte nicht als harter Fleck sitzt. */}
                <radialGradient id="about-zone-core">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="120" cy="120" r="118" fill="url(#about-zone-core)" />

              {/* Achsenkreuz als leises Raster — greift das Blaupausen-Motiv
                  auf, ohne ein zweites Muster einzuführen. */}
              <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="1">
                <line x1="120" y1="8" x2="120" y2="232" />
                <line x1="8" y1="120" x2="232" y2="120" />
              </g>

              {ZONE_RADII.map((radius, index) => (
                <motion.circle
                  key={radius}
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={ZONE_OPACITY[index]}
                  strokeWidth={ZONE_STROKE[index]}
                  strokeDasharray={index === 2 ? "4 5" : undefined}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.9, ease: EASE, delay: 0.1 + index * 0.18 }
                  }
                  style={{ transformOrigin: "120px 120px" }}
                />
              ))}

              {/* Die auslaufende Welle. Kein `once: true`: der Loop soll nur
                  laufen, solange das Visual im Bild ist.

                  WICHTIG: `reduce` steuert hier ausschliesslich `whileInView`
                  und `transition` — beides wertet framer-motion erst nach dem
                  Mount aus. Das Element selbst und sein `initial` sind in
                  beiden Fällen identisch, deshalb stimmt das Server-HTML mit
                  dem ersten Client-Render überein. Würde `reduce` stattdessen
                  über `null` die Struktur oder über `style` das SSR-Markup
                  entscheiden, liefe die Hydration auseinander: der Server
                  kennt die Nutzereinstellung nicht und rendert immer die
                  Variante ohne Reduktion. */}
              <motion.circle
                cx="120"
                cy="120"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={
                  reduce ? { opacity: 0 } : { scale: [1, 2.55], opacity: [0, 0.3, 0] }
                }
                viewport={{ amount: 0.5 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 14, ease: "easeOut", repeat: Infinity, repeatDelay: 1.5 }
                }
                style={{ transformOrigin: "120px 120px" }}
              />

              <circle cx="120" cy="120" r="4" fill="currentColor" />
              <text
                x="120"
                y="108"
                textAnchor="middle"
                className="fill-foreground font-mono text-[11px] uppercase tracking-wider"
              >
                {center}
              </text>
            </svg>

            <ul className="space-y-6">
              {zones.map((zone, index) => (
                <li key={zone.id}>
                  <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-foreground">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-full border border-brand"
                      style={{ opacity: ZONE_OPACITY[index] }}
                    />
                    {zone.label}
                  </p>
                  <p className="mt-1.5 pl-[1.3rem] text-sm leading-relaxed text-muted-foreground">
                    {zone.places.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Leistungen nach Zielgruppe: zwei Haarlinien-Listen, keine Karten. */}
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:gap-10">
          {scopes.map((scope) => (
            <div key={scope.id}>
              <h3 className="border-b border-border pb-3 text-base font-semibold text-foreground">
                {scope.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {scope.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
