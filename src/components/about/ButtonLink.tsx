// src/components/about/ButtonLink.tsx
/**
 * CTA-Link der Über-uns-Seite.
 *
 * Korrektur am Token: vorher `bg-brand-blue text-white`. `brand-blue` ist ein
 * Alias auf `--brand` (#3399FF), und globals.css sagt zu diesem Token
 * ausdrücklich "NICHT als Fläche unter weissem Text" — Weiss darauf erreicht
 * nur 2.94:1 und fällt damit unter WCAG AA. Die gefüllte Button-Rolle ist
 * `--brand-solid`, erreichbar über `bg-primary` (4.78:1), mit
 * `brand-solid-hover` als Hover. Damit sieht der Button praktisch gleich aus
 * und ist lesbar.
 *
 * Geometrie wie auf /karriere: h-12, rounded-lg, sichtbarer Fokusring.
 */
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { AboutCtaLink } from "@/lib/about/types";

type ButtonLinkProps = {
  link: AboutCtaLink;
  variant?: "solid" | "outline";
  className?: string;
};

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const variants = {
  solid: "bg-primary text-primary-foreground shadow-sm hover:bg-brand-solid-hover",
  outline: "border border-input text-foreground hover:bg-muted",
} as const;

export default function ButtonLink({
  link,
  variant = "solid",
  className,
}: ButtonLinkProps) {
  const isExternal = link.kind === "external";

  return (
    <Link
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-track={link.trackingId}
      aria-label={link.ariaLabel}
      className={cn(base, variants[variant], className)}
    >
      {link.label}
    </Link>
  );
}
