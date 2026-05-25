import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  body: string;
  eyebrow?: string;
  badge?: string;
  icon?: ReactNode;
  className?: string;
  as?: "article" | "li" | "div";
};

export default function FeatureCard({
  title,
  body,
  eyebrow,
  badge,
  icon,
  className,
  as = "article",
}: FeatureCardProps) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "h-full rounded-xl border border-border/40 bg-card p-6 shadow-sm",
        className
      )}
    >
      {(eyebrow || badge) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {eyebrow ? (
            <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
              {eyebrow}
            </span>
          ) : null}
          {badge ? (
            <span className="rounded-full border border-border/60 bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {badge}
            </span>
          ) : null}
        </div>
      )}
      <h3 className="flex items-start gap-2 text-xl font-bold text-foreground">
        {icon ? <span className="mt-0.5 text-brand-blue">{icon}</span> : null}
        <span>{title}</span>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Tag>
  );
}
