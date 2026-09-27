// src/components/about/AboutHero.tsx
/**
 * Einstieg der Über-uns-Seite.
 *
 * Bewusst kein dunkles Vollbild mit Glaskasten mehr: Text auf Theme-Fläche
 * liest sich sofort, bringt das LCP ohne Hydration und lässt das Foto Foto
 * sein. Links Aussage und Handlung, rechts die Zentrale — hinter dem Foto
 * versetzt ein Blaupausen-Blatt (dasselbe Rastermotiv wie Footer und
 * Karriere-Hero).
 *
 * Unter dem Fold-Rand steht das Faktenband: drei Zahlen und ein Nachweis.
 * Das ist der Teil, der Vertrauen trägt — deshalb Haarlinie statt Karten,
 * damit die Zahlen und nicht deren Rahmen auffallen.
 *
 * Server-Komponente, keine Animation.
 */
import Image from "next/image";

import CTAGroup from "@/components/about/CTAGroup";
import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";

export default function AboutHero() {
  const { title, eyebrow, lede, figure, ctas, facts, credential } =
    ABOUT_PAGE_DATA.hero;

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader as="h1" eyebrow={eyebrow} title={title} lede={lede} />
          <div className="mt-8">
            <CTAGroup data={ctas} />
          </div>
        </div>

        <figure className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden="true"
              className="blueprint-grid absolute -bottom-3 -right-3 h-full w-full rounded-xl border border-border bg-muted/50 text-border md:-bottom-4 md:-right-4"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={figure.src}
                alt={figure.alt}
                fill
                priority={figure.priority}
                sizes={figure.sizes ?? "(min-width: 1024px) 45vw, 100vw"}
                className="object-cover object-center"
              />
            </div>
          </div>
          {figure.caption ? (
            <figcaption className="mt-6 font-mono text-xs text-muted-foreground">
              {figure.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>

      {/* Faktenband. dl statt div-Suppe: Zahl und Bedeutung gehören zusammen,
          `order-2` dreht die visuelle Reihenfolge, ohne die semantische zu
          brechen (Zahl oben, Erklärung darunter). */}
      <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col">
            <dt className="order-2 mt-1.5 text-sm leading-snug text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="text-3xl font-bold tracking-tight text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}

        {/* Vierte Zelle: ein Nachweis statt einer weiteren Behauptung. */}
        <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <Image
            src={credential.image.src}
            alt={credential.image.alt}
            width={credential.image.width ?? 48}
            height={credential.image.height ?? 48}
            /* Die Datei traegt dunkelblaue Buchstaben auf Transparenz. Im
               Dark Mode stehen die auf fast schwarzem Grund und verschwinden;
               brightness-0 + invert macht daraus weisse Buchstaben. */
            className="h-11 w-11 shrink-0 object-contain dark:brightness-0 dark:invert"
          />
          <p className="text-sm leading-snug">
            <span className="font-semibold text-foreground">{credential.title}</span>
            <span className="block text-muted-foreground">{credential.detail}</span>
          </p>
        </div>
      </dl>
    </div>
  );
}
