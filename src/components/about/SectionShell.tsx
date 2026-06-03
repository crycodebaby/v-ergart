import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  as?: "section" | "article" | "div";
  tone?: "default" | "muted" | "accent";
  spacing?: "sm" | "md" | "lg";
  containerWidth?: "lg" | "xl" | "2xl";
  className?: string;
  children: ReactNode;
};

/**
 * Weiche Sektions-Übergänge ohne harte Kanten.
 *
 * Jede Sektion steht auf `bg-background`. Getönte Sektionen erhalten lediglich
 * einen zart gefederten Verlaufs-Layer, der an Ober- UND Unterkante auf
 * `transparent` ausläuft. Dadurch ist die Nahtstelle zweier Sektionen immer
 * dieselbe Farbe (background → background) – es gibt keine sichtbare Trennlinie
 * und keine harten Schwarz/Weiß-Kontraste, nur ein sanftes „Atmen“ des Tons.
 */
const toneOverlay: Record<NonNullable<SectionShellProps["tone"]>, string | null> = {
  default: null,
  muted: "bg-gradient-to-b from-transparent via-muted/60 to-transparent",
  accent: "bg-gradient-to-b from-transparent via-brand-blue/[0.08] to-transparent",
};

const spacingClasses: Record<NonNullable<SectionShellProps["spacing"]>, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-24",
};

const widthClasses: Record<NonNullable<SectionShellProps["containerWidth"]>, string> = {
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
};

export default function SectionShell({
  id,
  as = "section",
  tone = "default",
  spacing = "md",
  containerWidth = "xl",
  className,
  children,
}: SectionShellProps) {
  const Tag = as;
  const overlay = toneOverlay[tone];

  return (
    <Tag
      id={id}
      className={cn(
        "relative isolate bg-background",
        spacingClasses[spacing],
        className
      )}
    >
      {overlay ? (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0 -z-10", overlay)}
        />
      ) : null}
      <div className={cn("container mx-auto px-4", widthClasses[containerWidth])}>
        {children}
      </div>
    </Tag>
  );
}
