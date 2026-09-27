// src/app/ueber-uns/page.tsx
/**
 * Über uns.
 *
 * Auftrag der Seite: in acht Jahren Betrieb in Neuss Vertrauen aufbauen und
 * zum Gespräch führen — mit so viel Text wie nötig und so wenig wie möglich.
 * Vorher standen hier elf Sektionen, darunter zwei inhaltlich gleiche
 * Wertekataloge und ein Fließtext-Ausblick. Jetzt sind es acht, und die
 * Reihenfolge folgt dem Lesebedürfnis:
 *
 *   1 Hero        Wer ist das, und warum glaubwürdig (Faktenband)
 *   2 Zeitachse   Wie lange schon, und was ist passiert
 *   3 Führung     Mit wem habe ich es zu tun
 *   4 Arbeitsweise Wonach wird gearbeitet
 *   5 Einsatzgebiet Kommen die zu mir, und wie schnell
 *   6 Partner     Wer steht hinter der Ausführung
 *   7 Engagement  Was macht der Betrieb ausserhalb der Rechnung
 *   8 Kontakt     Nächster Schritt, mit Gesicht und Telefonnummer
 *
 * Flächenführung: base und muted wechseln sich ab, die getönten laufen über
 * `surface-soft-muted` oben und unten weich in den Seitengrund aus. Dadurch
 * gibt es auf der ganzen Seite keine harte Sektionskante — dasselbe Verfahren
 * wie auf /karriere. Die Seite entscheidet über die Fläche, nicht die
 * Inhaltskomponente (Design-System v1, Welle 2A).
 */
import PartnersSection from "@/components/PartnersSection";
import AboutEngagement from "@/components/about/AboutEngagement";
import AboutFinalCta from "@/components/about/AboutFinalCta";
import AboutHero from "@/components/about/AboutHero";
import AboutLeadership from "@/components/about/AboutLeadership";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutRegionScope from "@/components/about/AboutRegionScope";
import AboutTimeline from "@/components/about/AboutTimeline";
import SectionHeader from "@/components/about/SectionHeader";
import { Section } from "@/components/ui/section";
import { ABOUT_ASSETS } from "@/lib/about/about-assets";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";
import { generateSEOMetadata } from "@/lib/seo-utils";

/**
 * Partner, die auf dieser Seite gezeigt werden — Produktion, Fachhandel,
 * Engagement und Verzeichnis. Bewusst ohne "immobilienverwaltung", siehe
 * Kommentar an der Sektion.
 */
const ABOUT_PARTNER_IDS = [
  "hoening",
  "german-windows",
  "wuerth",
  "kilbinger",
  "verkehrswacht",
  "cylex",
];

export const metadata = generateSEOMetadata({
  title:
    "Über uns | Alexander Ergart – Hausmeisterservice & Fensterservice in Neuss",
  description:
    "Seit 2018 in Neuss: Hausmeisterservice und Fenster- und Türenservice aus einem Betrieb. Eingetragen bei der Handwerkskammer Düsseldorf, mit festen Ansprechpartnern und kurzen Wegen.",
  path: "/ueber-uns",
  image: {
    url: ABOUT_ASSETS.hero.src,
    alt: ABOUT_ASSETS.hero.alt,
  },
});

export default function UeberUnsPage() {
  const data = ABOUT_PAGE_DATA;

  return (
    <>
      <Section id={data.hero.id} surface="base" spacing="default" className="scroll-mt-28">
        <AboutHero />
      </Section>

      <Section id={data.timeline.id} surface="muted" className="scroll-mt-28 surface-soft-muted">
        <AboutTimeline />
      </Section>

      <Section id={data.leadership.id} surface="base" className="scroll-mt-28">
        <AboutLeadership />
      </Section>

      <Section id={data.principles.id} surface="muted" className="scroll-mt-28 surface-soft-muted">
        <AboutPrinciples />
      </Section>

      <Section id={data.region.id} surface="base" className="scroll-mt-28">
        <AboutRegionScope />
      </Section>

      <Section id={data.partners.id} surface="muted" className="scroll-mt-28 surface-soft-muted">
        <SectionHeader
          eyebrow={data.partners.eyebrow}
          title={data.partners.title}
          lede={data.partners.lede}
        />
        <div className="mt-10">
          {/* Ohne `ids` zeigt die Sektion auch die Karte "Ergart
              Immobilienverwaltung" mit der Rolle "Unternehmensgruppe". Die
              Verwaltung ist eine eigenstaendige Firma und gehoert nicht zu
              den zwei Bereichen, um die es auf dieser Seite geht — auf einer
              Seite ueber "wer wir sind" liest sich eine Gruppenzugehoerigkeit
              als Aussage ueber uns. Andere Seiten sind nicht betroffen. */}
          <PartnersSection ids={ABOUT_PARTNER_IDS} />
        </div>
      </Section>

      <Section id={data.engagement.id} surface="base" spacing="compact" className="scroll-mt-28">
        <AboutEngagement />
      </Section>

      <Section id={data.finalCta.id} surface="muted" className="scroll-mt-28 surface-soft-muted">
        <AboutFinalCta />
      </Section>
    </>
  );
}
