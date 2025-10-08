// src/app/tueren/page.tsx
import { FeatureGallery } from "@/components/FeatureGallery";
import TuerenHero from "@/components/TuerenHero";
// Der PartnerBrandSpotlight wird nicht mehr benötigt
import PartnerBenefitsSplit from "@/components/PartnerBenefitsSplit"; // Nur diesen importieren
import CTA from "@/components/CTA";
import { tuerenFeatures } from "@/lib/tueren-data";

export default function TuerenPage() {
  return (
    <>
      <TuerenHero />

      {/* Der Benefits-Split liefert die konkreten Vorteile für den Kunden */}
      <PartnerBenefitsSplit
        className="py-12 md:py-24"
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
        imageSrc="/bilder_ordner/hoening/tueren/tueren-detail2.png"
      />

      {/* Die Feature-Galerien zeigen die Produktvielfalt und -details */}
      {tuerenFeatures.map((feature) => (
        <FeatureGallery key={feature.title} {...feature} />
      ))}

      {/*
        Der PartnerBrandSpotlight wurde entfernt, um Redundanz zu vermeiden.
        Wir konzentrieren uns auf die faktenbasierte PartnerBenefitsSplit-Komponente.
      */}

      <CTA />
    </>
  );
}
