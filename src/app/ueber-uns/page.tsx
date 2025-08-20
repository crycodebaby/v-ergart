// src/app/ueber-uns/page.tsx
import UeberUnsHero from "@/components/UeberUnsHero";
import { StoryTimeline } from "@/components/StoryTimeline";
import ValuesSection from "@/components/ValuesSection";
import CTA from "@/components/CTA";

export default function UeberUnsPage() {
    return (
        <>
            <UeberUnsHero />
            <StoryTimeline />
            <ValuesSection />
            <CTA />
        </>
    );
}