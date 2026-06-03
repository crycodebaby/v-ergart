// src/components/PartnersSection.tsx
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPartners, type Partner } from "@/lib/partners";
import { cn } from "@/lib/utils";

type PartnersSectionProps = {
  /** Optionaler Kopfbereich – wenn kein title gesetzt ist, wird nur das Grid gerendert. */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Teilmenge in definierter Reihenfolge (IDs aus src/lib/partners.ts). Default: alle. */
  ids?: string[];
  className?: string;
};

/**
 * PartnersSection – zentrale, wiederverwendbare Partner-Sektion.
 *
 * EINE Quelle (src/lib/partners.ts), EIN Layout, überall identisch.
 * Responsive: 1 Spalte (Mobile) → 2 (Tablet) → 3 (Desktop). Gleich hohe,
 * vollständig klickbare Karten mit Standard-Layout: Logo · Name · Text · Link.
 */
export default function PartnersSection({
  eyebrow,
  title,
  description,
  ids,
  className,
}: PartnersSectionProps) {
  const partners = getPartners(ids);

  return (
    <section
      aria-label={title ?? "Partner & Kooperationen"}
      className={cn("w-full max-w-7xl mx-auto px-4 py-12 md:py-16", className)}
    >
      {title ? (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </ul>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const { logo } = partner;
  const isDarkPlaque = logo.plaque === "dark";

  return (
    <li className="group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg focus-within:border-brand-blue/40">
      {/* Logo-Plakette: einheitliche Höhe, kontraststark in Light & Dark Mode */}
      <div
        className={cn(
          "relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl px-4 ring-1",
          isDarkPlaque
            ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 ring-black/10"
            : "bg-white ring-black/5"
        )}
      >
        {isDarkPlaque ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),transparent_65%)]"
          />
        ) : null}

        {logo.external ? (
          // Externes Widget-Logo (z. B. Cylex) direkt laden – keine next.config-Domain nötig.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="lazy"
            decoding="async"
            className="relative max-h-12 w-auto object-contain"
          />
        ) : (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="max-h-12 w-auto object-contain"
            unoptimized
          />
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {partner.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {partner.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
        {partner.hrefLabel ?? "Website besuchen"}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>

      {/* Stretched Link: gesamte Karte klickbar, dennoch barrierefrei beschriftet */}
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} – Website öffnen (neuer Tab)`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </li>
  );
}
