// src/components/Stats.tsx
/**
 * Kennzahlen + Bewertungsbereich der Startseite.
 *
 * Die Zahlen sind das Gestaltungselement – keine Icons, keine Einflug-
 * Animation. Vier Metric Panels teilen sich einen Rahmen (gap-px auf
 * bg-border ergibt Haarlinien statt vier schwebender Karten); eine kurze
 * Brandlinie oben links markiert jedes Panel, analog zum Eyebrow im
 * SectionHeader.
 *
 * Darunter der Bewertungsbereich: Google ist die primäre Handlung (gefüllter
 * Button), Trustpilot die ruhige Alternative daneben. Nur der Trustpilot-
 * Teil ist Client-Code; die Sektion selbst bleibt Server-Komponente.
 */
import { ArrowUpRight } from "lucide-react";

import SectionHeader from "@/components/about/SectionHeader";
import TrustpilotReviewCollector from "@/components/TrustpilotReviewCollector";
import { Section } from "@/components/ui/section";
import {
  GOOGLE_RATING,
  GOOGLE_RATING_DISPLAY,
  TRUSTPILOT_CONFIGURED,
} from "@/lib/reviews";
import { cn } from "@/lib/utils";

type Metric = {
  value: string;
  /** Kleiner Zusatz hinter der Zahl, z. B. "+" oder "/5" */
  suffix: string;
  label: string;
  rating?: boolean;
};

const metrics: Metric[] = [
  { value: "300", suffix: "+", label: "Zufriedene Kunden" },
  { value: "1.500", suffix: "+", label: "Abgeschlossene Projekte" },
  { value: GOOGLE_RATING_DISPLAY, suffix: "/5", label: "Google-Bewertung", rating: true },
  { value: "13", suffix: "+", label: "Jahre Erfahrung" },
];

function StarRow() {
  return (
    <span aria-hidden="true" className="flex gap-0.5 text-brand-text">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const Stats = () => {
  return (
    <Section id="stats" surface="muted">
      <SectionHeader
        eyebrow="Ergart in Zahlen"
        title="Unsere Erfolge in Neuss: Zufriedene Kunden & Mehr"
      />

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:mt-12 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative flex min-w-0 flex-col bg-card p-4 xs:p-5 sm:p-6 lg:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute left-4 top-0 h-0.5 w-8 bg-brand xs:left-5 sm:left-6 lg:left-8"
            />
            {/* dt steht semantisch vorn, visuell unter der Zahl. */}
            <dt className="order-2 mt-2 hyphens-auto text-sm font-medium leading-snug text-muted-foreground sm:text-base">
              {metric.label}
            </dt>
            <dd className="order-1 flex items-baseline font-bold tracking-tight tabular-nums text-foreground">
              <span className="text-3xl xs:text-4xl sm:text-5xl xl:text-6xl">
                {metric.value}
              </span>
              <span
                className={
                  metric.rating
                    ? "ml-1 text-lg font-semibold text-muted-foreground sm:text-xl"
                    : "ml-0.5 text-2xl text-brand-text sm:text-3xl xl:text-4xl"
                }
              >
                {metric.suffix}
              </span>
            </dd>
            {metric.rating ? (
              <dd className="order-3 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <StarRow />
                <span>{GOOGLE_RATING.count} Bewertungen</span>
              </dd>
            ) : null}
          </div>
        ))}
      </dl>

      <div className="mt-6 grid overflow-hidden rounded-xl border border-border bg-card lg:grid-cols-12">
        <div
          className={cn(
            "p-6 md:p-8",
            TRUSTPILOT_CONFIGURED ? "lg:col-span-7" : "lg:col-span-12"
          )}
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Zufrieden mit unserer Arbeit?
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
            Eine kurze Bewertung auf Google hilft anderen bei der Entscheidung
            und zeigt uns, was wir gut machen und wo wir besser werden können.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={GOOGLE_RATING.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="review-google-home"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Auf Google bewerten
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={GOOGLE_RATING.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-text underline-offset-4 hover:underline"
            >
              Alle {GOOGLE_RATING.count} Bewertungen lesen
            </a>
          </div>
        </div>

        {TRUSTPILOT_CONFIGURED ? (
          <div className="flex flex-col justify-center border-t border-border p-6 md:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold text-foreground">
              Lieber auf Trustpilot?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Auch dort freuen wir uns über Ihre Erfahrung.
            </p>
            <TrustpilotReviewCollector className="mt-4" />
          </div>
        ) : null}
      </div>
    </Section>
  );
};
export default Stats;
