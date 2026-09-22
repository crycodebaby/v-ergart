// src/app/fenster/page.tsx
/**
 * /fenster – primäre VERKAUFSSEITE für neue Fenster und Fensteraustausch.
 *
 * Rollenverteilung seit Batch 2 (Intent-Trennung Fenster):
 *   /fenster        Ich will neue Fenster kaufen / meine alten austauschen.
 *   /fensterservice Mein vorhandenes Fenster klemmt, zieht, ist defekt.
 *
 * Vorher hatten beide URLs nahezu denselben Wortschatz (Montage, Service,
 * Reparatur, Austausch, HÖNING) und konkurrierten damit gegeneinander.
 *
 * Aufbau der Seite folgt bewusst einem Verkaufsablauf:
 *   Hero (Versprechen + CTA)
 *     -> Bedarf: Wann lohnt sich ein Austausch?
 *     -> Produktqualität: Design / Energie / Sicherheit
 *     -> Warum HÖNING + konkrete Vorteile
 *     -> Wirtschaftlichkeit: Energierechner + Garantie
 *     -> Preisorientierung + echte Google-Bewertungen
 *     -> Beweis: der Montageprozess in 8 Schritten
 *     -> Fragen vor dem Kauf
 *     -> Beratung & Angebot (Formular)
 */
import { generateSEOMetadata, BASE_URL, SITE_NAME } from "@/lib/seo-utils";
import { FeatureGallery } from "@/components/FeatureGallery";
import FensterHero from "@/components/FensterHero";
import FensterAustauschCheck from "@/components/FensterAustauschCheck";
import FensterBeratung from "@/components/FensterBeratung";
import FaqAccordion from "@/components/FaqAccordion";
import PreisUndBewertungen from "@/components/PreisUndBewertungen";
import { ProcessStepper } from "@/components/ProcessStepper";
import { Section } from "@/components/ui/section";
import PartnerBrandSpotlight from "@/components/PartnerBrandSpotlight";
import PartnerBenefitsSplit from "@/components/PartnerBenefitsSplit";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fensterFeatures } from "@/lib/fenster-data";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
import HoeningGarantieCard from "@/components/HoeningGarantieCard";
import { FENSTER_KAUF_FAQS, buildFaqJsonLd } from "@/lib/fenster-faq-data";
import { GOOGLE_AGGREGATE_RATING } from "@/lib/reviews";

export const metadata = generateSEOMetadata({
  title: "Neue Fenster in Neuss kaufen & austauschen | Alexander Ergart",
  description:
    "Neue Fenster für Neuss & Umgebung: HÖNING Fensterelemente, Fensteraustausch und fachgerechte Montage vom Handwerksbetrieb aus Neuss. Beratung und Aufmaß kostenlos. ☎ 0176 668 25 889",
  path: "/fenster",
  image: {
    url: "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp",
    alt: "Neue HÖNING Fensterelemente – Fensterbau Alexander Ergart in Neuss",
  },
});

/**
 * Service-JSON-LD für den Verkaufs-Intent.
 *
 * Eigene @id (#fenster-verkauf), damit sich das Schema nicht mit dem
 * LocalBusiness-Knoten der Startseite oder dem Reparatur-Knoten auf
 * /fensterservice überschreibt. Die angebotenen Leistungen spiegeln exakt
 * das, was auf dieser Seite sichtbar beworben wird – Verkauf, Aufmaß,
 * Montage. Reparatur/Wartung stehen hier bewusst NICHT mehr drin.
 */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/fenster#fenster-verkauf`,
  name: "Neue Fenster & Fensteraustausch",
  serviceType: "Fensterbau, Fensteraustausch und Fenstermontage",
  description:
    "Verkauf, Aufmaß und fachgerechte Montage neuer HÖNING Fensterelemente in Neuss und Umgebung – für Neubau, Sanierung und den Austausch alter Fenster.",
  url: `${BASE_URL}/fenster`,
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    telephone: "+49 176 668 25 889",
    email: "info@ergart.de",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Neuss",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
    aggregateRating: GOOGLE_AGGREGATE_RATING,
  },
  areaServed: [
    { "@type": "City", name: "Neuss" },
    { "@type": "City", name: "Düsseldorf" },
    { "@type": "City", name: "Kaarst" },
    { "@type": "City", name: "Dormagen" },
    { "@type": "City", name: "Meerbusch" },
    { "@type": "City", name: "Korschenbroich" },
    { "@type": "City", name: "Grevenbroich" },
  ],
  brand: { "@type": "Brand", name: "HÖNING" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fenster kaufen & austauschen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Neue Fensterelemente",
          description:
            "Maßgefertigte HÖNING Fenster für Neubau und Sanierung – Beratung zu Verglasung, Sicherheit und Optik.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fensteraustausch",
          description:
            "Austausch alter Fenster gegen moderne, energieeffiziente Elemente inklusive Ausbau der Altelemente.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aufmaß & Beratung",
          description:
            "Kostenloses Aufmaß vor Ort und unverbindliches Angebot für neue Fenster.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fenstermontage",
          description:
            "Fachgerechter Einbau neuer Fensterelemente mit präziser Ausrichtung und Abdichtung.",
        },
      },
    ],
  },
};

/**
 * HowTo zum sichtbaren 8-Schritte-Montageprozess (ProcessStepper).
 *
 * `estimatedCost` wurde in Batch 2 entfernt: Der Wert (400 €) war im
 * Repository durch nichts belegt und hätte als Rich Snippet einen Festpreis
 * für die Montage suggeriert. Die Preisorientierung steht sichtbar und mit
 * Vorbehalt weiter oben auf der Seite.
 */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Fenstermontage – Transparenz von Anfang bis Ende",
  description:
    "Unser bewährter 8-Schritte-Montageprozess für professionellen Fenstereinbau in Neuss und Umgebung – fachgerecht ausgeführt von Alexander Ergart.",
  totalTime: "PT4H",
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

/** FAQ-Schema aus genau der Liste, die unten auch sichtbar gerendert wird. */
const faqJsonLd = buildFaqJsonLd(FENSTER_KAUF_FAQS);

export default function FensterPage() {
  return (
    <>
      {/* Structured Data bewusst als normales <script>, NICHT via
          next/script. Befund Batch 2 am gerendertem Output: <Script>
          rendert mit der Default-Strategie "afterInteractive"
          clientseitig – im ausgelieferten HTML stand kein einziges
          <script type="application/ld+json">, die Daten lagen nur in
          der RSC-Payload. Ein einfaches <script>-Element wird
          server-seitig mitgerendert. */}
      <script
        id="fenster-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
    />
      <script
        id="fenster-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
    />
      <script
        id="fenster-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />

      <FensterHero />

      {/* Bedarf: Der Besucher kommt mit einem Symptom, nicht mit einer
          Bestellabsicht. Erst einordnen, dann verkaufen. */}
      <Section surface="base">
        <FensterAustauschCheck />
      </Section>

      {/* Produktqualität – drei Themen, drei Flächen, echte Projektfotos. */}
      {fensterFeatures.map((feature, i) => (
        <Section key={feature.title} surface={i % 2 === 0 ? "muted" : "base"}>
          <FeatureGallery {...feature} />
        </Section>
      ))}

      {/* Warum HÖNING */}
      <Section surface="muted">
        <PartnerBrandSpotlight
          title="Warum wir auf HÖNING Fenster setzen"
          subtitle="Deutsche Fertigung, maßgefertigt für Ihre Öffnungen"
          description="Wir überlassen nichts dem Zufall. Deshalb setzen wir bei Fenstern auf die kompromisslose Qualität von HÖNING. Jedes Element wird nach höchsten Standards gefertigt und von uns fachgerecht montiert."
          ctaText="Kostenlose Fenster-Beratung anfragen"
          ctaHref="#fenster-beratung"
          imageSrc="/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp"
        />
      </Section>

      {/* Die konkreten Kaufargumente */}
      <Section surface="base">
        <PartnerBenefitsSplit
          title="Was Sie mit neuen Fenstern gewinnen"
          subtitle="Energie, Sicherheit, Ruhe und Optik – in einem Zug"
          features={[
            "Maximale Energieeffizienz senkt Ihre Heizkosten nachhaltig.",
            "Zertifizierter Einbruchschutz für ein sicheres Gefühl.",
            "Überlegener Schallschutz für mehr Ruhe und Entspannung.",
            "Langlebige Materialien und präzise Verarbeitung für jahrzehntelange Freude.",
            "Enorme Designvielfalt, die perfekt zu Ihrer Architektur passt.",
          ]}
          ctaText="Angebot für neue Fenster anfragen"
          ctaHref="#fenster-beratung"
          imageSrc="/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp"
        />
      </Section>

      {/* Wirtschaftlichkeit: Rechner und Garantie gehoeren inhaltlich
          zusammen und teilen sich deshalb eine Flaeche. */}
      <Section surface="muted">
        <HoeningEnergierechner />
        <div className="mt-16 md:mt-20">
          <HoeningGarantieCard />
        </div>
      </Section>

      {/* Preisorientierung + Bewertungen: die Preisfrage ist auf einer
          Kaufseite die erste echte Hürde. Sie steht deshalb VOR dem
          Formular, nicht danach. */}
      <Section surface="base">
        <PreisUndBewertungen
          title="Was kosten neue Fenster?"
          description="Ein transparenter Richtwert für das Fensterelement – und Kunden aus Neuss und Umgebung, die uns auf Google bewerten."
          price={{
            label: "Fensterelement (Richtwert, ohne Montage)",
            value: "ca. 400–600 €",
            note: "Gilt für ein durchschnittliches PVC-Fensterelement in Standardgröße – reiner Elementpreis, ohne Einbau.",
            hint: "Montage, Ausbau der alten Fenster, Anschlussarbeiten und Zusatzleistungen sind nicht enthalten und werden nach dem Aufmaß individuell kalkuliert. Beratung und Aufmaß sind kostenlos. Lieferzeit für Fensterelemente aktuell bis zu 9 Wochen.",
          }}
          ctaHref="#fenster-beratung"
          ctaLabel="Unverbindliches Angebot anfragen"
        />
      </Section>

      {/* Beweis: so läuft die Montage tatsächlich ab – echte Baustellenfotos */}
      <Section surface="muted" aria-label="Unser Montageprozess – 8 Schritte">
        <ProcessStepper />
      </Section>

      {/* Fragen, die vor einem Kauf tatsächlich gestellt werden */}
      <Section surface="base" width="prose">
        <FaqAccordion
          items={FENSTER_KAUF_FAQS}
          eyebrow="Vor dem Kauf"
          title="Häufige Fragen zu neuen Fenstern"
          description="Kosten, Ablauf, Dauer und die Frage Austausch oder Reparatur."
        />
      </Section>

      {/* Conversion-Abschluss */}
      <Section
        id="fenster-beratung"
        surface="muted"
        spacing="spacious"
        className="relative overflow-hidden"
      >
        <FensterBeratung />
      </Section>

      <StickyMobileCTA />
    </>
  );
}
