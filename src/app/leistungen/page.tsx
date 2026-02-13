// src/app/leistungen/page.tsx
import { generateSEOMetadata } from "@/lib/seo-utils";
import { LeistungenHero } from "@/components/LeistungenHero";
import { LeistungenContent } from "@/components/LeistungenContent";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";
import { HandwerkskammerCard } from "@/components/HandwerkskammerCard";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";

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
      import HoeningEnergierechner from "@/components/HoeningEnergierechner";

      // ... imports ...

      <TerrassenFensterSlider />
      <HoeningShowroom />
      <HoeningEnergierechner />
      <div className="container mx-auto px-4">
        <HandwerkskammerCard />
      </div>
      <CTA />
    </>
  );
}
