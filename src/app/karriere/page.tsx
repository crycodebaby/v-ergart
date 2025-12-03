// src/app/karriere/page.tsx
import type { Metadata } from "next";
import { fetchJobs } from "@/lib/jobs-queries";
import JobsList from "@/components/JobsList";
import { KarriereHero } from "@/components/KarriereHero";
import { WhyWorkWithUs } from "@/components/WhyWorkWithUs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Karriere bei Alexander Ergart | Jobs in Neuss & Umgebung",
  description:
    "Werden Sie Teil unseres Teams! Hausmeisterservice, Fensterservice und mehr. Offene Stellen in Neuss für Fenster- und Türenbauer, Hausmeister und Servicetechniker.",
  alternates: {
    canonical: "/karriere",
  },
  openGraph: {
    title: "Karriere bei Alexander Ergart | Jobs in Neuss",
    description:
      "Werden Sie Teil unseres Teams! Offene Stellen in Neuss für Fenster- und Türenbauer, Hausmeister und Servicetechniker.",
    type: "website",
    url: "/karriere",
    locale: "de_DE",
    siteName: "Alexander Ergart Hausmeister- & Fensterservice",
  },
  twitter: {
    card: "summary",
    title: "Karriere bei Alexander Ergart",
    description:
      "Werden Sie Teil unseres Teams! Offene Stellen in Neuss für Fenster- und Türenbauer, Hausmeister und Servicetechniker.",
  },
};

export default async function KarrierePage() {
  const jobs = await fetchJobs();

  return (
    <>
      <KarriereHero />
      
      {/* Main Content */}
      <div className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Offene Stellen
              </h2>
              <p className="text-lg text-muted-foreground">
                {jobs.length > 0
                  ? `${jobs.length} ${jobs.length === 1 ? 'Position' : 'Positionen'} verfügbar`
                  : 'Bewerben Sie sich initiativ – wir freuen uns auf Sie!'}
              </p>
            </div>

            {/* Jobs List */}
            <JobsList jobs={jobs} />
          </div>
        </div>
      </div>

      <WhyWorkWithUs />
      
      <CTA />
    </>
  );
}
