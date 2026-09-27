// src/components/about/SectionHeader.tsx
/**
 * Sektionskopf der Über-uns-Seite.
 *
 * Vorher stand unter jeder Überschrift eine handgezeichnete Wellenlinie in
 * Brandblau. Sie war das einzige Ornament der Seite, wiederholte sich zehnmal
 * und wirkte dabei jedes Mal beliebiger — an den Enden lief sie aus, im Dark
 * Mode franste sie sichtbar aus.
 *
 * Der Ersatz ist kein zweites Ornament, sondern die Markierung, die der Rest
 * des Designsystems schon benutzt (Footer, Karriere): eine kurze gerade
 * Haarlinie in Brandfarbe VOR dem Eyebrow. Sie sitzt dort, wo der Blick die
 * Sektion ohnehin beginnt, trägt die Markenfarbe mit einer einzigen geraden
 * Kante und lässt die Überschrift von unten frei.
 *
 * `meta` nimmt eine rechtsbündige Mono-Angabe auf (z. B. die Spanne der
 * Zeitachse) — dieselbe Rolle wie der Board-Stand auf /karriere.
 */
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Rechtsbündige Zusatzangabe in Mono, nur ab sm sichtbar nebeneinander. */
  meta?: ReactNode;
  /** h1 nur im Hero, sonst h2. */
  as?: "h1" | "h2";
  /** Zeilenlänge des Ledes. Default: 2xl (ca. 65 Zeichen). */
  ledeWidth?: "md" | "xl" | "2xl";
  className?: string;
};

const ledeWidthClasses = {
  md: "max-w-md",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
} as const;

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  meta,
  as = "h2",
  ledeWidth = "2xl",
  className,
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <header className={cn("max-w-3xl", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-text">
          {/* Die Haarlinie ist Dekoration und gehört nicht in den Lesefluss. */}
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-brand" />
          {eyebrow}
        </p>
        {meta ? (
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground sm:shrink-0">
            {meta}
          </p>
        ) : null}
      </div>

      <Heading
        className={cn(
          "mt-4 font-bold tracking-tight text-foreground",
          as === "h1"
            ? "text-4xl leading-[1.1] md:text-5xl"
            : "text-2xl leading-tight md:text-3xl"
        )}
      >
        {title}
      </Heading>

      {lede ? (
        <p
          className={cn(
            "mt-4 leading-relaxed text-muted-foreground",
            as === "h1" ? "text-lg" : "text-base",
            ledeWidthClasses[ledeWidth]
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
