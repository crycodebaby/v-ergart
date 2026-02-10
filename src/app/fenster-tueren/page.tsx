// src/app/fenster-und-tueren/page.tsx
import { ShowroomDashboard } from "@/components/ShowroomDashboard";
import CTA from "@/components/CTA";
import { HandwerkskammerCard } from "@/components/HandwerkskammerCard";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Fenster & Türen HÖNING | Alexander Ergart Neuss",
  description: "Hochwertige Fenster und Haustüren von HÖNING in Neuss: Deutsche Qualität, professioneller Einbau, individuelle Beratung. Fensterbau & Türenmontage vom Meisterbetrieb.",
  path: "/fenster-tueren",
  image: {
    url: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
    alt: "HÖNING Fenster und Türen – Alexander Ergart Neuss",
  },
});

export default function FensterTuerenDashboardPage() {
  return (
    <>
      <ShowroomDashboard />
      <div className="container mx-auto px-4">
        <HandwerkskammerCard />
      </div>
      <CTA />
    </>
  );
}
