// src/app/fenster/page.tsx
import Script from "next/script";
import { generateSEOMetadata } from "@/lib/seo-utils";
import { FeatureGallery } from "@/components/FeatureGallery";
import FensterHero from "@/components/FensterHero";
import CTA from "@/components/CTA";
import { ProcessStepper } from "@/components/ProcessStepper";
import { Section } from "@/components/ui/section";
import PartnerBrandSpotlight from "@/components/PartnerBrandSpotlight";
import PartnerBenefitsSplit from "@/components/PartnerBenefitsSplit";
import { fensterFeatures } from "@/lib/fenster-data";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
import HoeningGarantieCard from "@/components/HoeningGarantieCard";

export const metadata = generateSEOMetadata({
  title: "Fensterservice & Fenstermontage in Neuss | Alexander Ergart",
  description:
    "Professioneller Fensterservice in Neuss: Montage, Wartung und Pflege hochwertiger Fenster für Wohn- und Gewerbeobjekte. Partner von HÖNING – Qualität made in Germany.",
  path: "/fenster",
  image: {
    url: "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp",
    alt: "Hochwertige Fenster von HÖNING in Neuss",
  },
});

/**
 * HowTo Schema.org JSON-LD
 * Beschreibt den 8-Schritte-Montageprozess für Google Rich Snippets.
 * Kann als nummerierte Liste direkt in den Google-Suchergebnissen erscheinen.
 */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Fenstermontage – Transparenz von Anfang bis Ende",
  description:
    "Unser bewährter 8-Schritte-Montageprozess für professionellen Fenstereinbau in Neuss und Umgebung – meisterhaft ausgeführt von Alexander Ergart.",
  totalTime: "PT4H",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "400",
  },
  tool: [
    { "@type": "HowToTool", name: "Saugkraft-Hebelift" },
    { "@type": "HowToTool", name: "Montagekran" },
    { "@type": "HowToTool", name: "Präzisionswerkzeug" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Bestandsaufnahme",
      text: "Jedes Projekt beginnt mit der Analyse. Wir begutachten die alten Fenster und die Bausubstanz – so entstehen keine Überraschungen beim Einbau.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster.webp",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Vorbereitung",
      text: "Nach dem Ausbau der alten Elemente wird der Arbeitsplatz sauber vorbereitet und geschützt. Sauberkeit und Schutz Ihrer Räume sind für uns selbstverständlich.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster-ausgebaut-vorbereiteter-arbeitsplatz.webp",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Logistik",
      text: "Mit schwerem Gerät wie Kränen und Spezialfahrzeugen positionieren wir auch große Fensterelemente millimetergenau – sicher und schadensfrei.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Anlieferung",
      text: "Die neuen, maßgefertigten HÖNING-Fensterelemente werden sicher auf Spezialgestellen angeliefert. Jedes Element wird auf Transportschäden geprüft.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheiben-auf-gestell-für-fensterelemente.webp",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Präzisionsarbeit",
      text: "Der spezielle Saugkraft-Hebelift ermöglicht eine sichere und beschädigungsfreie Handhabung der Scheiben. Modernste Technik für maximale Qualität.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheibe-hochgehoben-durch-saugkraft-lift.webp",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Montage",
      text: "Das neue Fensterelement wird passgenau in die Öffnung eingesetzt und professionell verankert. Jeder Handgriff sitzt – das Ergebnis hält Jahrzehnte.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/montageprozess-der-neuen-scheibe-via-sauglift.webp",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Finale Justierung",
      text: "Nach dem Einbau wird alles absolut präzise justiert: Dichtigkeit, Öffnungswinkel, Beschläge. Erst wenn alles perfekt sitzt, ist der Schritt abgeschlossen.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/finale-fensterelement-abdichtung.webp",
    },
    {
      "@type": "HowToStep",
      position: 8,
      name: "Abschluss & Übergabe",
      text: "Das Endergebnis: Eine neue, saubere und energieeffiziente Fensterfront. Wir erklären Ihnen die Pflege und Funktionen – und hinterlassen eine makellos saubere Baustelle.",
      image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
    },
  ],
};

export default function FensterPage() {
  return (
    <>
      {/* HowTo Structured Data – Google Rich Snippets */}
      <Script
        id="fenster-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <FensterHero />

      {/* Die 3 Feature-Galerien bleiben erhalten, sie liefern wertvolle Details.
          Der Flaechenwechsel trennt die drei Themen voneinander. */}
      {fensterFeatures.map((feature, i) => (
        <Section key={feature.title} surface={i % 2 === 0 ? "base" : "muted"}>
          <FeatureGallery {...feature} />
        </Section>
      ))}

      {/* Der Spotlight stellt die Partnerschaft als zentrales Qualitätsmerkmal vor. */}
      <Section surface="muted">
        <PartnerBrandSpotlight
        title="Qualität bis ins Detail: Unsere Partnerschaft mit HÖNING"
        subtitle="Deutsche Ingenieurskunst für Ihr Zuhause"
        description="Wir überlassen nichts dem Zufall. Deshalb setzen wir bei Fenstern auf die kompromisslose Qualität von HÖNING. Jedes Element wird nach höchsten Standards gefertigt und von uns meisterhaft montiert."
        ctaText="Beratungstermin vereinbaren"
        ctaHref="/kontakt"
        imageSrc="/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp"
        />
      </Section>

      {/* HÖNING-Block: Rechner und Garantie gehoeren inhaltlich zusammen
          und teilen sich deshalb eine Flaeche (wie auf /fensterservice). */}
      <Section surface="base">
        <HoeningEnergierechner />
        <div className="mt-16 md:mt-20">
          <HoeningGarantieCard />
        </div>
      </Section>

      {/* Montageprozess – 8 Schritte */}
      <Section surface="muted" aria-label="Unser Montageprozess – 8 Schritte">
        <ProcessStepper />
      </Section>

      {/* Der Benefits-Split liefert die konkreten Argumente, warum HÖNING die richtige Wahl ist. */}
      <Section surface="base">
        <PartnerBenefitsSplit
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
      </Section>

      <CTA />
    </>
  );
}
