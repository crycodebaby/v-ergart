// src/app/fenster/page.tsx
import {
  FeatureGallery,
  FeatureGalleryProps,
} from "@/components/FeatureGallery";
import ReferenzenHero from "@/components/ReferenzenHero";
import CTA from "@/components/CTA";
import { ProcessStepper } from "@/components/ProcessStepper";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import PartnerSection from "@/components/PartnerSection";

// Daten für die Feature-Galerien
const fensterFeatures: FeatureGalleryProps[] = [
  {
    galleryImages: [
      {
        src: "/bilder_ordner/hoening/fenster/fenster1.webp",
        alt: "Modernes Haus mit großen Fensterfronten",
      },
      {
        src: "/bilder_ordner/hoening/fenster/fenster4.webp",
        alt: "Detailansicht eines eleganten, schwarzen Fensterrahmens",
      },
      {
        src: "/bilder_ordner/hoening/fenster/kuechenfenster.webp",
        alt: "Helle Küche mit großem Fenster",
      },
    ],
    title: "Design & Licht: Fenster als Stilelement",
    description:
      "Moderne Fenster sind mehr als nur Glas – sie sind entscheidende Architekturelemente. Unsere Systeme mit schmalen Rahmen maximieren die Glasfläche, fluten Ihre Räume mit Tageslicht und verleihen Ihrer Fassade eine zeitlose Eleganz.",
    features: [
      {
        icon: "Lightbulb",
        text: "Klare Formsprache für eine geradlinige, moderne Architektur.",
      },
      {
        icon: "Lightbulb",
        text: "Bis zu 25 % mehr Tageslichteinfall durch schlanke Profile.",
      },
      {
        icon: "Lightbulb",
        text: "Auf Wunsch komplett verdeckt liegende Beschläge für eine makellose Ästhetik.",
      },
    ],
  },
  {
    galleryImages: [
      {
        src: "/bilder_ordner/hoening/fenster/fenster2.webp",
        alt: "Energieeffizientes Fenster in einem Wohnzimmer",
      },
      {
        src: "/bilder_ordner/referenzen/grundreinigung-privat-neuss-fensterrahmen.webp",
        alt: "Professionelle Montage eines Fensterrahmens",
      },
      {
        src: "/bilder_ordner/referenzen/reinigungsservice-neuss-fensterjustierung.webp",
        alt: "Präzise Justierung eines Fensters",
      },
    ],
    title: "Wärme & Energie: Spürbar Kosten senken",
    description:
      "In Zeiten steigender Energiepreise ist eine hervorragende Wärmedämmung wichtiger denn je. Unsere Fenster sind bereits im Standard passivhaustauglich und senken Ihre Heizkostenrechnung spürbar und nachhaltig.",
    features: [
      {
        icon: "ThermometerSun",
        text: "Exzellente U-Werte, die den Energieverbrauch erheblich reduzieren.",
      },
      {
        icon: "ThermometerSun",
        text: "Schützen Sie die Umwelt und sparen Sie pro Jahr bis zu 1.286 kg CO2 ein.",
      },
      {
        icon: "ThermometerSun",
        text: "Keine Chance für Kondenswasser und Schimmelbildung dank thermisch verbessertem Randverbund.",
      },
    ],
    reverse: true,
  },
  {
    galleryImages: [
      {
        src: "/bilder_ordner/hoening/fenster/fenster3.webp",
        alt: "Detailaufnahme eines sicheren Fensterbeschlags",
      },
      {
        src: "/bilder_ordner/referenzen/gebaeudereinigung-privathaushalt-neuss-fenster.webp",
        alt: "Sauber montiertes Fenster in einem Privathaushalt",
      },
      {
        src: "/bilder_ordner/referenzen/reinigungsdienst-neuss-fensteranlagen.webp",
        alt: "Große Fensteranlage in einem modernen Gebäude",
      },
    ],
    title: "Sicherheit & Komfort: Sorgenfrei leben",
    description:
      "Fühlen Sie sich rundum sicher und geborgen. Unsere Fenster werden mit hochwertigen Sicherheitsbauteilen ausgestattet, die einen optimalen Widerstand gegen Einbruchsversuche bieten und gleichzeitig für himmlische Ruhe sorgen.",
    features: [
      {
        icon: "ShieldCheck",
        text: "Geprüfter Einbruchschutz bis zur hohen Widerstandsklasse RC2 nach DIN EN 1627.",
      },
      {
        icon: "ShieldCheck",
        text: "Robuste Schließbleche aus massivem Stahl für extreme Widerstandsfähigkeit.",
      },
      {
        icon: "ShieldCheck",
        text: "Effektiver Schallschutz für mehr Lebensqualität dank spezieller Schallschutzgläser.",
      },
    ],
  },
];

export default function FensterPage() {
  return (
    <>
      <ReferenzenHero />
      {fensterFeatures.map((feature) => (
        <FeatureGallery key={feature.title} {...feature} />
      ))}
      <ProcessStepper />
      <BeforeAfterSlider />
      <PartnerSection />
      <CTA />
    </>
  );
}
