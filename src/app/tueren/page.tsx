// src/app/tueren/page.tsx
import {
  FeatureGallery,
  FeatureGalleryProps,
} from "@/components/FeatureGallery"; // <-- Prop-Typ importieren
import ReferenzenHero from "@/components/ReferenzenHero";
import CTA from "@/components/CTA";

// KORREKTUR: Wir sagen TypeScript, dass dieses Array dem Bauplan entspricht
const tuerenFeatures: FeatureGalleryProps[] = [
  {
    galleryImages: [
      {
        src: "/bilder_ordner/hoening/tueren/wood-tuer.webp",
        alt: "Moderne Haustür in Holzoptik",
      },
      {
        src: "/bilder_ordner/hoening/tueren/haustuer.webp",
        alt: "Elegante schwarze Haustür",
      },
      {
        src: "/bilder_ordner/hoening/tueren/stahl-tuer.webp",
        alt: "Stabile Stahltür",
      },
    ],
    title: "Black Edition Woodstyle & Ceramic",
    description:
      "Erleben Sie die natürliche Ausstrahlung von Holz oder die einzigartige Haptik von Keramik, kombiniert mit der Langlebigkeit und Sicherheit einer modernen Aluminiumtür.",
    features: [
      {
        icon: "Sparkles",
        text: "Authentische Optik mit tiefer Prägung und mattem Finish.",
      },
      {
        icon: "Sparkles",
        text: "Absolut pflegeleicht und witterungsbeständig, nie wieder streichen.",
      },
      {
        icon: "Sparkles",
        text: "Extrem kratzfeste Oberflächen für den anspruchsvollen Alltag.",
      },
    ],
  },
  {
    galleryImages: [
      {
        src: "/bilder_ordner/hoening/tueren/aluminium-tuer2.webp",
        alt: "Detailansicht eines Fingerscanners an einer Haustür",
      },
      {
        src: "/bilder_ordner/hoening/nebeneingangtueren/nebentuer.webp",
        alt: "Robuste Nebeneingangstür",
      },
      {
        src: "/bilder_ordner/hoening/tueren/aluminium-tuer1.webp",
        alt: "Sichere Aluminium-Haustür",
      },
    ],
    title: "Sicherheit & Technologie",
    description:
      "Eine moderne Haustür schützt nicht nur, sie denkt auch mit. Unsere Türen sind mit modernster Schließtechnik und optionalen smarten Features ausgestattet.",
    features: [
      {
        icon: "Fingerprint",
        text: "Schlüsselloser Komfort mit dem ekey dLine Fingerscanner.",
      },
      {
        icon: "ShieldCheck",
        text: "Geprüfter Einbruchschutz bis zur hohen Widerstandsklasse RC2.",
      },
      {
        icon: "ShieldCheck",
        text: "Automatische Verriegelung mit Winkhaus autoLock.",
      },
    ],
    reverse: true,
  },
];

export default function TuerenPage() {
  return (
    <>
      <ReferenzenHero />
      {tuerenFeatures.map((feature) => (
        <FeatureGallery key={feature.title} {...feature} />
      ))}
      <CTA />
    </>
  );
}
