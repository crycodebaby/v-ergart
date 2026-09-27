// src/components/about/AboutLeadership.tsx
/**
 * Wer entscheidet. Auf einer Über-uns-Seite die conversionrelevanteste
 * Sektion überhaupt: sie beantwortet "mit wem habe ich es zu tun".
 *
 * Vorher war das ein Fließtext aus drei Sätzen neben einem Foto. Jetzt steht
 * die Aufteilung als Aufteilung da — zwei Namen, zwei Zuständigkeiten,
 * getrennt durch eine Haarlinie. Wer eine Rechnungsfrage hat, sieht sofort,
 * dass er damit nicht beim Einsatzleiter landen muss.
 *
 * Server-Komponente. Fläche und Abstand kommen von aussen.
 */
import Image from "next/image";

import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";

export default function AboutLeadership() {
  const { eyebrow, title, lede, people, figure } = ABOUT_PAGE_DATA.leadership;

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
      <figure className="max-w-xs md:max-w-none">
        <div className="relative">
          <div
            aria-hidden="true"
            className="blueprint-grid absolute -bottom-3 -left-3 h-full w-full rounded-xl border border-border bg-background/50 text-border"
          />
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={figure.src}
              alt={figure.alt}
              fill
              sizes={figure.sizes ?? "(min-width: 768px) 320px, 60vw"}
              className="object-cover object-center"
            />
          </div>
        </div>
        {figure.caption ? (
          <figcaption className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
            {figure.caption}
          </figcaption>
        ) : null}
      </figure>

      <div>
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />

        <dl className="mt-10 divide-y divide-border border-t border-border">
          {people.map((person) => (
            <div key={person.name} className="py-6 sm:grid sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8">
              <dt>
                <span className="block text-base font-semibold text-foreground">
                  {person.name}
                </span>
                <span className="mt-1 block font-mono text-xs uppercase tracking-wider text-brand-text">
                  {person.role}
                </span>
              </dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground sm:mt-0">
                {person.focus}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
