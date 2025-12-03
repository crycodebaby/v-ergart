// src/app/leistungen/page.tsx
import { LeistungenHero } from "@/components/LeistungenHero";
import { LeistungenContent } from "@/components/LeistungenContent";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Leistungen | Alexander Ergart - Full-Service Dienstleister",
  description:
    "Fenster & Türen, Innenausbau, Gartenpflege, Hausmeisterdienste, Gebäudereinigung und Sicherheitstechnik. Ihr kompetenter Partner in Neuss & Umgebung.",
  alternates: {
    canonical: "/leistungen",
  },
};

export default function LeistungenPage() {
  return (
    <>
      <LeistungenHero />
      <LeistungenContent />
      <TerrassenFensterSlider />
      <HoeningShowroom />
      <CTA />
    </>
  );
}
