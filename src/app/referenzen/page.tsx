//src/app/referenzen/page.tsx
import ReferenzenHero from "@/components/ReferenzenHero";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import PartnerBrandSpotlight from "@/components/PartnerBrandSpotlight"; // NEUER IMPORT
import CTA from "@/components/CTA";
import { Section } from "@/components/ui/section";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Referenzen – Unsere Projekte | Alexander Ergart",
  description: "Einblicke in unsere hochwertigen Fenster-, Türen- und Hausmeisterprojekte in Neuss und Umgebung. Qualität made in Germany mit HÖNING-Produkten.",
  path: "/referenzen",
  image: {
    url: "/bilder_ordner/ueberuns/fensterbau-werkstatt.webp",
    alt: "Referenzprojekte Alexander Ergart Fensterservice Neuss",
  },
});

export default function ReferenzenPage() {
  return (
    <>
      <ReferenzenHero />

      {/* NEU: Partner-Sektion als Qualitätsversprechen eingefügt */}
      {/* Wrapper erhaelt den bisherigen Zustand dieser Route. */}
      <Section surface="base">
        <PartnerBrandSpotlight
        title="Qualität, die man sieht: Unsere Partnerschaft mit HÖNING"
        subtitle="Exzellente Ergebnisse beginnen mit erstklassigen Materialien."
        description="Jedes unserer Referenzprojekte basiert auf dem Versprechen, nur das Beste zu verwenden. Als Partner von HÖNING garantieren wir den Einsatz von Produkten, die in Sachen Langlebigkeit, Ästhetik und Funktionalität Maßstäbe setzen."
        ctaText="Mehr über unsere Fenster"
        ctaHref="/fenster"
        imageSrc="/bilder_ordner/ueberuns/fensterbau-werkstatt.webp"
        />
      </Section>

      <PortfolioGallery />

      <CTA />
    </>
  );
}
