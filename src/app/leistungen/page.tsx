// src/app/leistungen/page.tsx
import { generateSEOMetadata } from "@/lib/seo-utils";
import { LeistungenHero } from "@/components/LeistungenHero";
import { LeistungenContent } from "@/components/LeistungenContent";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";
import { TrustAndPartnerSection } from "@/components/TrustAndPartnerSection";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
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
      <LeistungenHero />
      <LeistungenContent />
      <TerrassenFensterSlider />

      <HoeningShowroom />
      <HoeningEnergierechner />
      <HoeningGarantieCard />
      <TrustAndPartnerSection />
      <CTA />
    </>
  );
}
