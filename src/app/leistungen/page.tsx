// src/app/leistungen/page.tsx
import LeistungenHero from "@/components/LeistungenHero";
import PartnerSection from "@/components/PartnerSection";
import ProductShowcase from "@/components/ProductShowcase";
import DoorCarousel from "@/components/DoorCarousel"; // <-- IMPORT
import ClassicServices from "@/components/ClassicServices";
import CTA from "@/components/CTA";

export default function LeistungenPage() {
    return (
        <>
            <LeistungenHero />
            <PartnerSection />
            <ProductShowcase />
            <DoorCarousel /> {/* <-- ADDED HERE */}
            <ClassicServices />
            <CTA />
        </>
    );
}