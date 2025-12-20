// src/app/karriere/page.tsx
import { generateSEOMetadata } from "@/lib/seo-utils";
import { fetchJobs } from "@/lib/jobs-queries";
import JobsList from "@/components/JobsList";
import { KarriereHero } from "@/components/KarriereHero";
import { WhyWorkWithUs } from "@/components/WhyWorkWithUs";
import CTA from "@/components/CTA";

export const metadata = generateSEOMetadata({
  title: "Karriere bei Alexander Ergart | Jobs im Hausmeisterservice in Neuss",
  description:
    "Entdecken Sie offene Stellen bei Alexander Ergart: Jobs im Hausmeisterservice, in der Objektpflege und im Fensterservice in Neuss und Umgebung. Bewerben Sie sich jetzt und werden Sie Teil des Teams.",
  path: "/karriere",
});

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
