// src/components/JobsList.tsx
/**
 * Stellenliste als Board: eine Zeile pro Stelle, durch Haarlinien getrennt,
 * Meta-Zeile in Mono, Titel, ein Satz, rechts der Verweis. Keine Karten,
 * keine Badges, keine Einflug-Animation – eine Liste, die man scannt.
 */
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { formatEmploymentType, type JobPosting } from "@/lib/jobs-queries";
import { CONTACT } from "@/lib/site-links";

export default function JobsList({ jobs }: { jobs: JobPosting[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-input p-8">
        <h3 className="text-lg font-semibold text-foreground">
          Derzeit keine ausgeschriebenen Stellen
        </h3>
        <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
          Gute Leute nehmen wir trotzdem gern in unsere Planung auf. Schicken
          Sie uns eine kurze Initiativbewerbung mit Lebenslauf – wir melden
          uns, sobald eine passende Stelle frei wird.
        </p>
        <a
          href={`${CONTACT.emailHref}?subject=${encodeURIComponent("Initiativbewerbung")}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-text hover:underline"
        >
          <Mail size={16} aria-hidden="true" />
          Initiativbewerbung senden
        </a>
      </div>
    );
  }

  return (
    <ul className="border-t border-border">
      {jobs.map((job) => {
        const meta = [
          formatEmploymentType(job.employmentType),
          job.location,
          "Start nächstmöglich",
        ].filter(Boolean);

        return (
          <li key={job._id} className="border-b border-border">
            <Link
              href={`/karriere/${job.slug.current}`}
              aria-label={`${job.title} – Stellenanzeige ansehen`}
              className={[
                "group relative -mx-3 grid gap-4 rounded-lg px-3 py-6 transition-colors hover:bg-muted/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-7",
                // Detail 2: eine Markierung zeichnet sich beim Hover von oben
                // nach unten am linken Rand – wie ein Haken am Aushang.
                "before:absolute before:bottom-5 before:left-0 before:top-5 before:w-0.5 before:rounded-full before:bg-brand",
                "before:origin-top before:scale-y-0 before:transition-transform before:duration-300 before:ease-soft",
                "hover:before:scale-y-100 focus-visible:before:scale-y-100 motion-reduce:before:transition-none",
              ].join(" ")}
            >
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {meta.join("  ·  ")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-text md:text-2xl">
                  {job.title}
                </h3>
                {job.metaDescription ? (
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground line-clamp-2">
                    {job.metaDescription}
                  </p>
                ) : null}
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text">
                Stelle ansehen
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
