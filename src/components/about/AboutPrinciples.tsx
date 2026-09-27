// src/components/about/AboutPrinciples.tsx
/**
 * Arbeitsweise. Fasst zusammen, was vorher zweimal auf der Seite stand:
 * "Qualitätsanspruch" und "Werte" waren inhaltlich dasselbe in zwei
 * Kartenrastern. Ein Abschnitt, vier Punkte, jeweils ein Satz.
 *
 * Keine Karten: ein Icon, ein Titel, ein Satz. Vier Rahmen nebeneinander
 * erzeugen zwölf sichtbare Kanten, die nichts bedeuten — die Liste erzeugt
 * keine. Dasselbe Muster wie die Arbeitgeber-Argumente auf /karriere.
 *
 * Server-Komponente. Fläche und Abstand kommen von aussen.
 */
import SectionHeader from "@/components/about/SectionHeader";
import { DynamicIcon } from "@/components/DynamicIcon";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";

export default function AboutPrinciples() {
  const { eyebrow, title, lede, items } = ABOUT_PAGE_DATA.principles;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} ledeWidth="md" />
      </div>

      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <DynamicIcon
              name={item.icon}
              size={20}
              className="mt-0.5 shrink-0 text-brand-text"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
