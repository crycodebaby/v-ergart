import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
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
