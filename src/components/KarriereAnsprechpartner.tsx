// src/components/KarriereAnsprechpartner.tsx
/**
 * Abschluss der Karriere-Seiten: der Mensch, bei dem die Bewerbung landet.
 * Ersetzt den dunklen CTA-Block. Ein Porträt, ein Satz vom Inhaber, die
 * Kontaktwege – so, wie es auf Karriereseiten mittelständischer Betriebe
 * üblich und glaubwürdig ist. Rendert nur Inhalt.
 */
import Image from "next/image";
import { Phone } from "lucide-react";
import { KARRIERE_CONTACT } from "@/lib/karriere-data";
import { JobApplyButton } from "./JobApplyButton";

type Props = {
  /** Mit Titel: Bewerbung auf diese Stelle. Ohne: Initiativbewerbung. */
  jobTitle?: string;
};

export function KarriereAnsprechpartner({ jobTitle }: Props) {
  const c = KARRIERE_CONTACT;

  return (
    <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 lg:gap-16">
      <div className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-muted md:w-52">
        <Image
          src={c.image.src}
          alt={c.image.alt}
          fill
          sizes="(min-width: 768px) 208px, 160px"
          className="object-cover object-top"
        />
      </div>

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Ihr Ansprechpartner
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {c.name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{c.role}</p>

        {/* Detail 5: ein großes, sehr helles Anführungszeichen hinter dem
            Zitat – gibt der Aussage Gewicht, ohne laut zu werden. */}
        <blockquote className="relative mt-8 border-l-2 border-brand pl-5 text-lg leading-relaxed text-foreground">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-9 select-none font-serif text-8xl leading-none text-brand/15"
          >
            „
          </span>
          {c.statement}
        </blockquote>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <JobApplyButton
            jobTitle={jobTitle ?? "Initiativbewerbung"}
            subject={jobTitle ? undefined : "Initiativbewerbung"}
            label={jobTitle ? `Als ${jobTitle} bewerben` : "Initiativ bewerben"}
          />
          <a
            href={c.phoneHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Phone size={18} aria-hidden="true" />
            {c.phoneDisplay}
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Bewerbungen an{" "}
          <a href={`mailto:${c.email}`} className="font-medium text-foreground hover:underline">
            {c.email}
          </a>
          . Lebenslauf genügt, Zeugnisse falls vorhanden.
        </p>
      </div>
    </div>
  );
}
