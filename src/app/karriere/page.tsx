// src/app/karriere/page.tsx
import { generateSEOMetadata } from "@/lib/seo-utils";
import { fetchJobs } from "@/lib/jobs-queries";
import JobsList from "@/components/JobsList";
import { KarriereHero } from "@/components/KarriereHero";
import { WhyWorkWithUs } from "@/components/WhyWorkWithUs";
import { BewerbungsAblauf } from "@/components/BewerbungsAblauf";
import { Section } from "@/components/ui/section";
import { BewerbungsCTA } from "@/components/BewerbungsCTA";

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
      <KarriereHero jobCount={jobs.length} />

      {/* scroll-mt: Sprungziel des Hero-CTA, Platz für den Sticky-Header */}
      <Section id="offene-stellen" surface="base" className="scroll-mt-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
                Stellenangebote
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                Offene Stellen
              </h2>
            </div>
            <p className="text-muted-foreground">
              {jobs.length > 0
                ? `${jobs.length} ${jobs.length === 1 ? "Position" : "Positionen"} in Neuss & Umgebung`
                : "Bewerben Sie sich initiativ – wir freuen uns auf Sie!"}
            </p>
          </div>

          <JobsList jobs={jobs} />
        </div>
      </Section>

      <Section surface="muted">
        <WhyWorkWithUs />
      </Section>

      <Section surface="base">
        <BewerbungsAblauf />
      </Section>

      <BewerbungsCTA />
    </>
  );
}
