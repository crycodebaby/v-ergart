// src/app/tueren/page.tsx
import { FeatureGallery } from "@/components/FeatureGallery";
import TuerenHero from "@/components/TuerenHero";
// Der PartnerBrandSpotlight wird nicht mehr benötigt
import PartnerBenefitsSplit from "@/components/PartnerBenefitsSplit"; // Nur diesen importieren
import CTA from "@/components/CTA";
import { Section } from "@/components/ui/section";
import { tuerenFeatures } from "@/lib/tueren-data";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Haustüren & Türen von HÖNING | Alexander Ergart Neuss",
  description: "Premium Haustüren und Türelemente in Neuss: HÖNING Qualität made in Germany, fachgerechter Einbau, individuelle Beratung. Sicherheit trifft Design. ✓ Jetzt Angebot anfordern!",
  path: "/tueren",
  image: {
    url: "/bilder_ordner/hoening/tueren/vorschau-aluminium-tuer.webp",
    alt: "HÖNING Premium Haustüren in Neuss – Alexander Ergart",
  },
});

export default function TuerenPage() {
  return (
    <>
      <TuerenHero />

      {/* Der Benefits-Split liefert die konkreten Vorteile für den Kunden */}
      {/* Wrapper erhaelt den bisherigen Zustand dieser Route. Die
          Section-Migration von /tueren folgt in einem spaeteren Batch. */}
      <Section surface="base">
        <PartnerBenefitsSplit
        title="Warum eine HÖNING Tür die richtige Wahl ist"
        subtitle="Sicherheit, Komfort und Design in Perfektion"
        features={[
          "Zertifizierte Einbruchhemmung für maximale Sicherheit (bis RC2)",
          "Hervorragende Schall- und Wärmedämmwerte für mehr Wohnqualität",
          "Langlebige, pflegeleichte Materialien wie Aluminium und Kunststoff",
          "Vielfältige Gestaltungsmöglichkeiten in Farbe, Form und Oberfläche",
          "Fachgerechter Einbau für perfekte Funktionalität und Dichtigkeit",
        ]}
        ctaText="Unverbindlich anfragen"
        ctaHref="/kontakt"
        imageSrc="/bilder_ordner/hoening/tueren/vorschau-aluminium-tuer.webp"
        />
      </Section>

      {/* Die Feature-Galerien zeigen die Produktvielfalt und -details */}
      {tuerenFeatures.map((feature) => (
        <Section key={feature.title} surface="base">
          <FeatureGallery {...feature} />
        </Section>
      ))}

      {/*
        Der PartnerBrandSpotlight wurde entfernt, um Redundanz zu vermeiden.
        Wir konzentrieren uns auf die faktenbasierte PartnerBenefitsSplit-Komponente.
      */}

      <CTA />
    </>
  );
}
