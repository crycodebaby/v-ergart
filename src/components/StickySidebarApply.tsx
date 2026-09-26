// src/components/StickySidebarApply.tsx
/**
 * Bewerbungs-Karte der Stellenanzeige. Bleibt auf dem Desktop beim Scrollen
 * stehen. Eine ruhige Karte: Kurzfakten, ein Primär-Button, Telefon, und
 * darunter die Person, die die Bewerbung liest.
 */
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { KARRIERE_CONTACT } from "@/lib/karriere-data";
import { JobApplyButton } from "./JobApplyButton";

type Props = {
  title: string;
  /** Kurzfakten aus Sanity – bereits bereinigt (keine leeren Einträge). */
  quickFacts: string[];
};

// Fallback, wenn im CMS keine Kurzfakten gepflegt sind
const DEFAULT_QUICK_FACTS = [
  "Unbefristeter Vertrag",
  "Faire, pünktliche Bezahlung",
  "Einsatzgebiet Neuss und Rhein-Kreis",
];

export const StickySidebarApply = ({ title, quickFacts }: Props) => {
  const facts = quickFacts.length > 0 ? quickFacts : DEFAULT_QUICK_FACTS;
  const c = KARRIERE_CONTACT;

  return (
    <div className="lg:sticky lg:top-40">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Auf einen Blick
        </p>
        <ul className="mt-4 space-y-2.5">
          {facts.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check size={16} className="mt-0.5 shrink-0 text-brand-text" aria-hidden="true" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2.5">
          <JobApplyButton jobTitle={title} label="Jetzt bewerben" className="w-full" />
          <a
            href={c.phoneHref}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-input text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone size={16} aria-hidden="true" />
            {c.phoneDisplay}
          </a>
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image
              src={c.image.src}
              alt=""
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-foreground">{c.name}</p>
            <p className="text-muted-foreground">{c.role}</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Lebenslauf per E-Mail genügt. Sie erhalten innerhalb weniger Tage eine
          Antwort.
        </p>
      </div>
    </div>
  );
};
