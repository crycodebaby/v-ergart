// src/components/LeistungenHero.tsx
/**
 * Einstieg der Leistungsübersicht.
 *
 * Vorher: ein zentrierter Texthero auf viel leerer Fläche, direkt gefolgt
 * von einer zweiten Einleitung ("Unsere Kernkompetenzen"), die dasselbe
 * noch einmal sagte. Jetzt trägt der Hero die Einleitung allein und
 * übernimmt das Muster von /ueber-uns: links Aussage und Handlung, rechts
 * ein echtes Foto mit versetztem Blaupausen-Blatt.
 *
 * Die Bereichsliste unter den CTAs ist Sprungnavigation zu den vier
 * Hauptbereichen darunter und zeigt schon im ersten Bildschirm, was der
 * Betrieb macht.
 *
 * Server-Komponente, keine Einflug-Animation: der Text steht sofort da und
 * ist das LCP-Element.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Phone } from "lucide-react";

import SectionHeader from "@/components/about/SectionHeader";
import { CORE_SERVICES } from "@/lib/service-data";
import { CONTACT } from "@/lib/site-links";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function LeistungenHero() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-7">
        <SectionHeader
          as="h1"
          eyebrow="Leistungen"
          title="Ein Ansprechpartner für Ihre Immobilie. Vom Treppenhaus bis zum neuen Fenster."
          lede="Hausmeisterservice, Gebäudereinigung, Garten- und Außenpflege sowie Fenster und Türen aus einem Betrieb. Wir betreuen Wohnanlagen, Gewerbeobjekte und Privathäuser in Neuss und im Rhein-Kreis."
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/kontakt"
            data-track="cta-leistungen-anfrage"
            className={`${buttonBase} bg-primary text-primary-foreground shadow-sm hover:bg-brand-solid-hover`}
          >
            Unverbindlich anfragen
          </Link>
          <a
            href={CONTACT.phoneHref}
            data-track="call-leistungen"
            className={`${buttonBase} border border-input text-foreground hover:bg-muted`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <nav aria-label="Leistungsbereiche" className="mt-10 border-t border-border pt-6">
          <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {CORE_SERVICES.map((area, index) => (
              <li key={area.id}>
                <a
                  href={`#${area.id}`}
                  className="group inline-flex items-baseline gap-3 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {area.title}
                  <ArrowDown
                    className="h-3.5 w-3.5 self-center text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-brand-text"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <figure className="lg:col-span-5">
        <div className="relative">
          <div
            aria-hidden="true"
            className="blueprint-grid absolute -bottom-3 -right-3 h-full w-full rounded-xl border border-border bg-muted/50 text-border md:-bottom-4 md:-right-4"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src="/bilder_ordner/ueberuns/teamfoto-vor-hauptzentrale-ergart.webp"
              alt="Team von Alexander Ergart in Firmenjacken vor der Zentrale in Neuss"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </figure>
    </div>
  );
}
