// src/components/LeistungenContent.tsx
/**
 * Leistungsarchitektur der Übersichtsseite.
 *
 * Zwei Ebenen, sichtbar unterschiedlich gewichtet:
 *   - die vier Hauptbereiche als 2×2-Raster mit Foto, Aufgabenliste und
 *     Weg zur Detailseite. Fenster & Türen bündelt drei Seiten und trennt
 *     dabei Neukauf und Reparatur ausdrücklich.
 *   - Zusatzleistungen darunter als flache Querkarte ohne großes Foto.
 *
 * Keine eigene Einleitung: die steht im Hero. Die Karten tragen die IDs,
 * auf die die Sprungliste im Hero zeigt.
 *
 * Server-Komponente, keine Animation.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import SectionHeader from "@/components/about/SectionHeader";
import {
  CORE_SERVICES,
  SUPPLEMENTARY_SERVICES,
  type ServiceArea,
} from "@/lib/service-data";

const textLink =
  "inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand-text hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function LeistungenContent() {
  return (
    <>
      <SectionHeader eyebrow="Hauptbereiche" title="Vier Bereiche, ein Betrieb" />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {CORE_SERVICES.map((area, index) => (
          <CoreServiceCard key={area.id} area={area} index={index} />
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        <h2 className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-border" />
          Ergänzende Leistung
        </h2>
        <div className="mt-6 space-y-6">
          {SUPPLEMENTARY_SERVICES.map((area) => (
            <SupplementaryServiceCard key={area.id} area={area} />
          ))}
        </div>
      </div>
    </>
  );
}

function CoreServiceCard({ area, index }: { area: ServiceArea; index: number }) {
  const Icon = area.icon;

  return (
    <article
      id={area.id}
      className="flex scroll-mt-32 flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative aspect-[16/9] bg-muted lg:aspect-[2/1]">
        <Image
          src={area.image}
          alt={area.imageAlt}
          fill
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
          <span aria-hidden="true" className="h-px w-6 bg-brand" />
        </p>
        <h3 className="mt-3 flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground">
          <Icon className="h-6 w-6 shrink-0 text-brand-text" aria-hidden="true" />
          {area.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{area.description}</p>

        {area.subLinks ? (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {area.subLinks.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  className="group flex items-center justify-between gap-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-semibold text-foreground group-hover:text-brand-text">
                    {sub.label}
                  </span>
                  <span className="flex items-center gap-2 text-right text-muted-foreground">
                    {sub.note}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-text"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm text-foreground sm:grid-cols-2">
            {area.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-text" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <Link href={area.link} className={textLink}>
            {area.linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SupplementaryServiceCard({ area }: { area: ServiceArea }) {
  const Icon = area.icon;

  return (
    <article
      id={area.id}
      className="grid scroll-mt-32 overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-[12rem_1fr] md:grid-cols-[16rem_1fr]"
    >
      <div className="relative aspect-[16/9] bg-muted sm:aspect-auto">
        <Image
          src={area.image}
          alt={area.imageAlt}
          fill
          sizes="(min-width: 768px) 256px, (min-width: 640px) 192px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
        <div>
          <h3 className="flex items-center gap-3 text-xl font-bold text-foreground">
            <Icon className="h-5 w-5 shrink-0 text-brand-text" aria-hidden="true" />
            {area.title}
          </h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
            {area.description}
          </p>
          <p className="mt-3 text-sm text-foreground">{area.points.join(" · ")}</p>
        </div>
        <Link href={area.link} className={`${textLink} shrink-0`}>
          Mehr erfahren
          <span className="sr-only"> über {area.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
