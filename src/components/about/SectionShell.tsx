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
  muted: "bg-slate-50 dark:bg-zinc-900/50",
  accent: "bg-brand-blue/5 dark:bg-brand-blue/10",
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
    <Tag id={id} className={cn(toneClasses[tone], spacingClasses[spacing], className)}>
      <div className={cn("container mx-auto px-4", widthClasses[containerWidth])}>
        {children}
      </div>
    </Tag>
  );
}
