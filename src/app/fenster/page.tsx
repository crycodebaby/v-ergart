// src/app/fenster/page.tsx
import { FeatureGallery } from "@/components/FeatureGallery";
import FensterHero from "@/components/FensterHero";
import CTA from "@/components/CTA";
import { ProcessStepper } from "@/components/ProcessStepper";
import PartnerBrandSpotlight from "@/components/PartnerBrandSpotlight"; // NEUER IMPORT
import PartnerBenefitsSplit from "@/components/PartnerBenefitsSplit"; // NEUER IMPORT
import { fensterFeatures } from "@/lib/fenster-data"; // NEUER IMPORT-PFAD

export default function FensterPage() {
  return (
    <>
      <FensterHero />

      {/* Die 3 Feature-Galerien bleiben erhalten, sie liefern wertvolle Details. */}
      {fensterFeatures.map((feature) => (
        <FeatureGallery key={feature.title} {...feature} />
      ))}

      {/* Der Spotlight stellt die Partnerschaft als zentrales Qualitätsmerkmal vor. */}
      <PartnerBrandSpotlight
        className="py-12 md:py-24"
        title="Qualität bis ins Detail: Unsere Partnerschaft mit HÖNING"
        subtitle="Deutsche Ingenieurskunst für Ihr Zuhause"
        description="Wir überlassen nichts dem Zufall. Deshalb setzen wir bei Fenstern auf die kompromisslose Qualität von HÖNING. Jedes Element wird nach höchsten Standards gefertigt und von uns meisterhaft montiert."
        ctaText="Beratungstermin vereinbaren"
        ctaHref="/kontakt"
        imageSrc="/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp"
      />

      <ProcessStepper />

      {/* Der Benefits-Split liefert die konkreten Argumente, warum HÖNING die richtige Wahl ist. */}
      <PartnerBenefitsSplit
        className="py-12 md:py-24"
        title="Ihre Vorteile auf einen Blick"
        subtitle="Warum sich die Investition in HÖNING Fenster lohnt"
        features={[
          "Maximale Energieeffizienz senkt Ihre Heizkosten nachhaltig.",
          "Zertifizierter Einbruchschutz für ein sicheres Gefühl.",
          "Überlegener Schallschutz für mehr Ruhe und Entspannung.",
          "Langlebige Materialien und präzise Verarbeitung für jahrzehntelange Freude.",
          "Enorme Designvielfalt, die perfekt zu Ihrer Architektur passt.",
        ]}
        ctaText="Mehr technische Details"
        ctaHref="https://www.hoening.de/produkte/kunststofffenster/systemuebersicht-pvc-fenster/"
        imageSrc="/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp"
      />

      <CTA />
    </>
  );
}
