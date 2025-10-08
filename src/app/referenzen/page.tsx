// src/app/referenzen/page.tsx
import ReferenzenHero from "@/components/ReferenzenHero";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import PartnerBrandSpotlight from "@/components/PartnerBrandSpotlight"; // NEUER IMPORT
import CTA from "@/components/CTA";

export default function ReferenzenPage() {
  return (
    <>
      <ReferenzenHero />

      {/* NEU: Partner-Sektion als Qualitätsversprechen eingefügt */}
      <PartnerBrandSpotlight
        className="py-12 md:py-24"
        title="Qualität, die man sieht: Unsere Partnerschaft mit HÖNING"
        subtitle="Exzellente Ergebnisse beginnen mit erstklassigen Materialien."
        description="Jedes unserer Referenzprojekte basiert auf dem Versprechen, nur das Beste zu verwenden. Als Partner von HÖNING garantieren wir den Einsatz von Produkten, die in Sachen Langlebigkeit, Ästhetik und Funktionalität Maßstäbe setzen."
        ctaText="Mehr über unsere Fenster"
        ctaHref="/fenster"
        imageSrc="/bilder_ordner/ueberuns/fensterbau-werkstatt.webp"
      />

      <PortfolioGallery />

      <CTA />
    </>
  );
}
