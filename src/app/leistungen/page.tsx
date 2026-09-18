// src/app/leistungen/page.tsx
import { generateSEOMetadata } from "@/lib/seo-utils";
import { LeistungenHero } from "@/components/LeistungenHero";
import { LeistungenContent } from "@/components/LeistungenContent";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";
import { TrustAndPartnerSection } from "@/components/TrustAndPartnerSection";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
import { Section } from "@/components/ui/section";
import HoeningGarantieCard from "@/components/HoeningGarantieCard";

export const metadata = generateSEOMetadata({
  title: "Leistungen | Hausmeisterservice & Objektpflege in Neuss – Alexander Ergart",
  description:
    "Übersicht aller Leistungen von Alexander Ergart: Hausmeisterservice, Objektpflege, Gebäudereinigung, Fenster- und Türservice in Neuss und Umgebung. Zuverlässig, regional und persönlich.",
  path: "/leistungen",
  image: {
    url: "/bilder_ordner/leistungen-hero.webp",
    alt: "Leistungsübersicht Hausmeisterservice Neuss",
  },
});

export default function LeistungenPage() {
  return (
    <>
      {/* Seiteneinstieg: Texthero, deshalb spacious statt Bildflaeche. */}
      <Section surface="base" spacing="spacious">
        <LeistungenHero />
      </Section>

      <Section surface="muted">
        <LeistungenContent />
      </Section>

      <Section surface="base">
        <TerrassenFensterSlider />
      </Section>

      {/* Showroom: Bildstrecke auf ruhiger Gegenflaeche. */}
      <Section surface="muted">
        <HoeningShowroom />
      </Section>

      {/* HÖNING-Block: Rechner und Garantie gehoeren inhaltlich zusammen
          und teilen sich eine Flaeche (wie auf /fensterservice und /fenster).
          Der Flaechenwechsel markiert den Uebergang vom Sehen zum Rechnen. */}
      <Section surface="base">
        <HoeningEnergierechner />
        <div className="mt-16 md:mt-20">
          <HoeningGarantieCard />
        </div>
      </Section>

      <Section surface="muted" spacing="compact">
        <TrustAndPartnerSection />
      </Section>
      <CTA />
    </>
  );
}
