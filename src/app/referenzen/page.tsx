// src/app/referenzen/page.tsx
import ReferenzenHero from "@/components/ReferenzenHero";
import { PortfolioGallery } from "@/components/PortfolioGallery"; // Alter Name, neue Power!
import CTA from "@/components/CTA";

export default function ReferenzenPage() {
  return (
    <>
      <ReferenzenHero />
      <PortfolioGallery />
      <CTA />
    </>
  );
}
