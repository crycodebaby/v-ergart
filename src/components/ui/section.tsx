// src/components/ui/section.tsx
/**
 * Section — die Seitenfläche des Ergart Design-Systems v1.
 *
 * Grundregel (Welle 2A): Die PAGE entscheidet über die Sektionsfläche,
 * nicht die Inhaltskomponente. Eine wiederverwendbare Komponente wie
 * ProcessStepper rendert nur ihren Inhalt; Hintergrund, vertikaler
 * Rhythmus und Contentbreite kommen von aussen.
 *
 * Bewusst NICHT vorhanden:
 *   - keine seam/fade/soft-Prop. Harte Kante ist Standard, die
 *     Flaechenstaffel ist mit 1.10-1.14:1 leise genug. Weiche Uebergaenge
 *     gehoeren in die jeweilige Media-/Hero-Komponente, nicht hierher.
 *   - keine card/popover-Surface. Beides sind Bauteile, keine Sections.
 *   - kein "use client". Reine Darstellung, kein State.
 *
 * DOM: genau zwei Knoten — <section> traegt die Flaeche ueber die volle
 * Breite, <div> begrenzt den Inhalt. Weniger geht nicht, mehr braucht es
 * nicht.
 */
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// overflow-x-clip: Inhaltskomponenten fliegen teils horizontal ein
// (framer-motion `x: ±50`). Bis die Animation laeuft, steht das Element
// 50px neben seiner Position und ragt – bei 16-32px Container-Padding –
// aus dem Viewport: horizontales Scrollen. `clip` statt `hidden`, weil es
// keinen Scroll-Container erzeugt und `position: sticky` im Inhalt nicht bricht.
const sectionVariants = cva("w-full overflow-x-clip", {
  variants: {
    surface: {
      base: "bg-background",
      muted: "bg-muted",
      inverse: "bg-surface-inverse text-foreground-inverse",
    },
    spacing: {
      compact: "py-12 md:py-16",
      default: "py-16 md:py-24",
      spacious: "py-24 md:py-32",
    },
  },
  defaultVariants: {
    surface: "base",
    spacing: "default",
  },
});

/**
 * Contentbreiten. Bewusst drei Rollen statt der bisher sechs freien
 * max-w-Werte. Das Padding ist hier responsiv (16/24/32px) — das
 * projektweit uebliche `container mx-auto px-4` haelt den Rand dagegen
 * auf allen Breakpoints bei 16px fest.
 */
const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    width: {
      prose: "max-w-3xl",
      default: "max-w-7xl",
      wide: "max-w-[1400px]",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

type SectionProps = VariantProps<typeof sectionVariants> &
  VariantProps<typeof containerVariants> & {
    id?: string;
    "aria-label"?: string;
    /** Klassen fuer die Flaeche (z. B. `relative overflow-hidden`). */
    className?: string;
    children: ReactNode;
  };

export function Section({
  surface,
  spacing,
  width,
  id,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ surface, spacing }), className)}
      {...rest}
    >
      <div className={cn(containerVariants({ width }))}>{children}</div>
    </section>
  );
}

export { sectionVariants, containerVariants };
export default Section;
