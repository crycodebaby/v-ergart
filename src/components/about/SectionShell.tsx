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

const toneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  default: "bg-background",
  muted:
    "bg-gradient-to-b from-slate-50/80 to-background dark:from-zinc-900/60 dark:to-background",
  accent:
    "bg-gradient-to-b from-brand-blue/10 via-brand-blue/5 to-background dark:from-brand-blue/15 dark:via-brand-blue/8 dark:to-background",
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

  return (
    <Tag
      id={id}
      className={cn(
        "relative overflow-hidden",
        toneClasses[tone],
        spacingClasses[spacing],
        className
      )}
    >
      {tone !== "default" ? (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <svg
            viewBox="0 0 1200 220"
            aria-hidden="true"
            className="absolute -top-12 right-[-12rem] h-[220px] w-[560px] text-brand-blue/10 dark:text-brand-blue/15"
          >
            <circle cx="320" cy="110" r="180" fill="currentColor" />
            <circle cx="520" cy="110" r="120" fill="currentColor" />
          </svg>
        </div>
      ) : null}
      <div className={cn("container mx-auto px-4", widthClasses[containerWidth])}>
        {children}
      </div>
    </Tag>
  );
}
