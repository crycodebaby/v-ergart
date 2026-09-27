// src/components/about/AboutEngagement.tsx
/**
 * Regionales Engagement. Bleibt auf der Seite, weil lokales Engagement in
 * Neuss ein echtes Vertrauenssignal ist — aber knapp: Bild, zwei Zeilen,
 * Hinweis. Vorher belegte der Abschnitt eine volle Sektion mit Platzhalter-
 * Logik für ein Bild, das inzwischen geliefert ist.
 *
 * Server-Komponente. Fläche und Abstand kommen von aussen.
 */
import Image from "next/image";

import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";

export default function AboutEngagement() {
  const { eyebrow, title, body, note, figure } = ABOUT_PAGE_DATA.engagement;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-12 lg:gap-16">
      <div>
        <SectionHeader eyebrow={eyebrow} title={title} lede={body} />
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      </div>

      {figure ? (
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border border-border bg-muted md:max-w-none">
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            sizes={figure.sizes ?? "(min-width: 768px) 288px, 100vw"}
            className="object-cover object-center"
          />
        </div>
      ) : null}
    </div>
  );
}
