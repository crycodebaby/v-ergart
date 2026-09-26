// src/components/KarriereHero.tsx
/**
 * Einstieg des Karriere-Portals: Text links, Teamfoto rechts, darunter drei
 * belegbare Fakten. Server-Komponente, keine Animation – der erste Eindruck
 * soll ruhig und sofort lesbar sein (LCP ohne Hydration).
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Mail } from "lucide-react";
import { KARRIERE_HERO } from "@/lib/karriere-data";
import { CONTACT } from "@/lib/site-links";

type Props = {
  /** Anzahl aktiver Stellen aus Sanity – steuert die Beschriftung des CTA. */
  jobCount: number;
};

export function KarriereHero({ jobCount }: Props) {
  const hasJobs = jobCount > 0;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {KARRIERE_HERO.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
          {KARRIERE_HERO.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {KARRIERE_HERO.lede}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#offene-stellen"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {hasJobs
              ? `${jobCount} offene ${jobCount === 1 ? "Stelle" : "Stellen"} ansehen`
              : "Zur Initiativbewerbung"}
            <ArrowDown size={18} aria-hidden="true" />
          </Link>
          <a
            href={`${CONTACT.emailHref}?subject=${encodeURIComponent("Initiativbewerbung")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Mail size={18} aria-hidden="true" />
            Initiativ bewerben
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-8">
          {KARRIERE_HERO.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted lg:aspect-[4/5]">
          <Image
            src={KARRIERE_HERO.image.src}
            alt={KARRIERE_HERO.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <figcaption className="mt-3 text-xs text-muted-foreground">
          Das Team vor der Zentrale an der Further Straße in Neuss.
        </figcaption>
      </figure>
    </div>
  );
}
