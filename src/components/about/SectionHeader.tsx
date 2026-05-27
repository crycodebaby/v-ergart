import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  icon?: ReactNode;
  compact?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  icon,
  compact = false,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" && "text-center", className)}>
      {icon ? (
        <div
          className={cn(
            "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue/10 text-brand-blue",
            align === "center" && "mx-auto"
          )}
        >
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl",
          compact && "md:text-3xl"
        )}
      >
        {title}
      </h2>
      <svg
        viewBox="0 0 120 8"
        aria-hidden="true"
        className={cn("mt-4 h-2 w-28 text-brand-blue/70", align === "center" && "mx-auto")}
      >
        <path
          d="M2 6C18 1 34 1 50 6C66 11 82 11 98 6C106 3.5 112 2.5 118 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {intro ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
