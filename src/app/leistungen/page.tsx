// src/app/leistungen/page.tsx
import type { Metadata } from "next";
import { LeistungenHero } from "@/components/LeistungenHero";
import { LeistungenContent } from "@/components/LeistungenContent";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Leistungen Neuss | Hausmeisterservice, Gartenpflege & mehr | Ergart",
  description:
    "Professionelle Dienstleistungen in Neuss & Umgebung: ✓ Hausmeisterservice ✓ Gartenpflege ✓ Gebäudereinigung ✓ Innenausbau ✓ Fenster & Türen ✓ Sicherheitstechnik. Kostenlos beraten lassen!",
  keywords:
    "Hausmeisterservice Neuss, Gartenpflege Rhein-Kreis Neuss, Gebäudereinigung Kaarst, Innenausbau Dormagen, Fenster Neuss, Sicherheitstechnik Düsseldorf",
  alternates: {
    canonical: "/leistungen",
  },
  openGraph: {
    title: "Unsere Leistungen in Neuss & Rhein-Kreis Neuss | Alexander Ergart",
    description:
      "Professionelle Dienstleistungen für Privat & Gewerbe im Rhein-Kreis Neuss. Von Hausmeisterservice bis Gartenpflege – Ihr zuverlässiger Partner.",
    type: "website",
    url: "/leistungen",
    locale: "de_DE",
    siteName: "Alexander Ergart Hausmeister- & Fensterservice",
  },
  other: {
    "geo.region": "DE-NW",
    "geo.placename": "Neuss",
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
