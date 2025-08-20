// src/app/referenzen/page.tsx
import ReferenzenHero from "@/components/ReferenzenHero";
import IntroSection from "@/components/IntroSection";
import PortfolioGallery from "@/components/PortfolioGallery";
import CTA from "@/components/CTA";

export default function ReferenzenPage() {
  return (
    <>
      <ReferenzenHero />
      <IntroSection /> {/* <-- HIER EINGEFÜGT */}
      <PortfolioGallery />
      <CTA />
    </>
  );
}
