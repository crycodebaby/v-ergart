// src/app/leistungen/page.tsx
import ReferenzenHero from "@/components/ReferenzenHero";
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import CTA from "@/components/CTA";
import { LeistungenContent } from "@/components/LeistungenContent"; // Importiere die neue Client-Komponente

export default function LeistungenPage() {
  return (
    <>
      <ReferenzenHero
        title="Ihre Projekte, unsere Expertise"
        description="Entdecken Sie die Vielfalt unserer Leistungen, maßgeschneidert für Ihre Anforderungen – von der Beratung bis zur perfekten Umsetzung."
        imageSrc="/bilder_ordner/leistungen-hero.webp"
        heightClass="h-[70vh]"
      />
      <LeistungenContent />
      <TerrassenFensterSlider />
      <HoeningShowroom />
      <CTA />
    </>
  );
}
