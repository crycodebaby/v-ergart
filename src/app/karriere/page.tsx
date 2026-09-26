// src/app/karriere/page.tsx
/**
 * Karriere-Portal, Übersicht.
 *
 * Reihenfolge: Einstieg → Stellenboard (das Wichtigste, deshalb direkt nach
 * dem Einstieg) → Arbeitgeber-Argumente → Ablauf → Ansprechpartner.
 * Alle Flächen im Theme (base/muted), keine dauerhaft dunklen Bühnen.
 */
import { Mail } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo-utils";
import { fetchJobs, formatPostedDate } from "@/lib/jobs-queries";
import { CONTACT } from "@/lib/site-links";
import JobsList from "@/components/JobsList";
import { KarriereHero } from "@/components/KarriereHero";
import { WhyWorkWithUs } from "@/components/WhyWorkWithUs";
import { BewerbungsAblauf } from "@/components/BewerbungsAblauf";
import { KarriereAnsprechpartner } from "@/components/KarriereAnsprechpartner";
import { Section } from "@/components/ui/section";

export const metadata = generateSEOMetadata({
  title: "Karriere bei Alexander Ergart | Jobs im Hausmeisterservice in Neuss",
  description:
    "Offene Stellen bei Alexander Ergart in Neuss: Hausmeisterservice, Gebäudereinigung und Fensterbau. Unbefristete Anstellung, kurze Wege, direkter Ansprechpartner. Jetzt bewerben.",
  path: "/karriere",
});

export default async function KarrierePage() {
  const jobs = await fetchJobs();

  // Jüngste Ausschreibung = Stand des Boards (Sanity liefert nach Datum sortiert).
  const latest = formatPostedDate(
    jobs.map((j) => j._createdAt).filter(Boolean).sort().at(-1)
  );

  return (
    <>
      <Section surface="base" spacing="default">
        <KarriereHero jobCount={jobs.length} />
      </Section>

      {/* scroll-mt: Sprungziel des Hero-CTA, Platz für den Sticky-Header */}
      <Section id="offene-stellen" surface="base" spacing="compact" className="scroll-mt-32 hairline-t">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Offene Stellen
              </h2>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground sm:text-right">
                {jobs.length > 0
                  ? `${jobs.length} ${jobs.length === 1 ? "Position" : "Positionen"} · Neuss & Umgebung`
                  : "Derzeit keine Ausschreibung"}
                {latest ? (
                  <span className="mt-1 block normal-case tracking-normal">Stand {latest}</span>
                ) : null}
              </p>
            </div>
            <JobsList jobs={jobs} />
          </div>

          <aside className="lg:pt-14">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">Nichts Passendes dabei?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Wir prüfen jede Initiativbewerbung und melden uns, sobald eine
                Stelle frei wird, die zu Ihnen passt.
              </p>
              <a
                href={`${CONTACT.emailHref}?subject=${encodeURIComponent("Initiativbewerbung")}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-text hover:underline"
              >
                <Mail size={16} aria-hidden="true" />
                Initiativbewerbung senden
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* Getönte Flächen laufen oben und unten weich in den Seitengrund aus. */}
      <Section surface="muted" className="surface-soft-muted">
        <WhyWorkWithUs />
      </Section>

      <Section surface="base">
        <BewerbungsAblauf />
      </Section>

      <Section surface="muted" className="surface-soft-muted">
        <KarriereAnsprechpartner />
      </Section>
    </>
  );
}
