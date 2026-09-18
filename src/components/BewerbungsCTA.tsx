// src/components/BewerbungsCTA.tsx
import { Phone } from "lucide-react";
import { JobApplyButton } from "@/components/JobApplyButton";

type Props = {
  /** Mit Titel: Bewerbung auf diese Stelle. Ohne: Initiativbewerbung. */
  jobTitle?: string;
};

/**
 * Abschlussblock für Bewerber – ersetzt auf den Karriere-Seiten den
 * Kunden-CTA ("Projekt anfragen"), der dort die falsche Zielgruppe anspricht.
 * Dauerhaft dunkle Bühne, unabhängig vom Theme.
 */
export function BewerbungsCTA({ jobTitle }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--brand)/0.35),transparent_70%)]"
      />
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {jobTitle ? "Haben wir Ihr Interesse geweckt?" : "Nichts Passendes dabei?"}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
          {jobTitle
            ? `Bewerben Sie sich als ${jobTitle} – Lebenslauf, Zeugnisse und ein kurzes Anschreiben per E-Mail genügen.`
            : "Gute Leute suchen wir immer. Schicken Sie uns eine Initiativbewerbung – wir melden uns zeitnah."}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <JobApplyButton
            jobTitle={jobTitle ?? "Initiativbewerbung"}
            subject={jobTitle ? undefined : "Initiativbewerbung"}
            label={jobTitle ? "Jetzt per E-Mail bewerben" : "Initiativ bewerben"}
            tone="inverse"
          />
          <a
            href="tel:+4917666825889"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            <Phone size={18} aria-hidden="true" />
            Fragen? 0176 668 25 889
          </a>
        </div>
      </div>
    </section>
  );
}
