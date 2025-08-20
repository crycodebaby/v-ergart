// src/app/page.tsx
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyErgart from "@/components/WhyErgart";
import MapSection from "@/components/MapSection";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyErgart />
      <ProfileCard />
      <Testimonials />
      <MapSection />
      <CTA />
    </>
  );
}