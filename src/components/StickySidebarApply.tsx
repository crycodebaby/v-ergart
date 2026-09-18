// src/components/StickySidebarApply.tsx
import { CheckCircle2, Phone } from "lucide-react";
import { JobApplyButton } from "@/components/JobApplyButton";

type Props = {
  title: string;
  /** Kurzfakten aus Sanity – bereits bereinigt (keine leeren Einträge). */
  quickFacts: string[];
};

// Fallback, wenn im CMS keine Kurzfakten gepflegt sind
const DEFAULT_QUICK_FACTS = [
  "Unbefristeter Vertrag",
  "Faire Bezahlung",
  "Modernes Equipment",
  "Teamgeist & Support",
];

/**
 * Bewerbungs-Karte der Stellenanzeige. Bleibt auf dem Desktop beim Scrollen
 * stehen; die Eckdaten (Anstellung, Ort, Start) stehen bewusst NICHT mehr
 * hier, sondern einmalig in der Faktenleiste des Heroes.
 */
export const StickySidebarApply = ({ title, quickFacts }: Props) => {
  const facts = quickFacts.length > 0 ? quickFacts : DEFAULT_QUICK_FACTS;

  return (
    <div className="lg:sticky lg:top-40">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div className="bg-brand-blue/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
            Ihre Bewerbung
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold text-foreground">Auf einen Blick</h3>
          <ul className="mt-3 space-y-2.5">
            {facts.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-text"
                  aria-hidden="true"
                />
                <span className="text-foreground">{fact}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            <JobApplyButton
              jobTitle={title}
              label="Per E-Mail bewerben"
              className="w-full"
            />
            <a
              href="tel:+4917666825889"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-foreground transition-colors hover:border-brand-blue hover:bg-brand-blue/5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Fragen? 0176 668 25 889
            </a>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            Lebenslauf, Zeugnisse und ein kurzes Anschreiben genügen.
          </p>
        </div>
      </div>
    </div>
  );
};
