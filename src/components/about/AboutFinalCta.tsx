// src/components/about/AboutFinalCta.tsx
/**
 * Abschluss der Seite. Kein dunkler Kampagnenblock, sondern die Person, bei
 * der der Anruf landet — dieselbe Entscheidung wie auf /karriere, und aus
 * demselben Grund: ein Gesicht senkt die Hemmschwelle vor dem ersten Kontakt
 * messbar stärker als eine farbige Fläche.
 *
 * Telefonnummer und E-Mail stehen direkt daneben, nicht erst im Formular.
 * Wer anrufen will, soll nicht klicken müssen.
 *
 * Server-Komponente. Fläche und Abstand kommen von aussen.
 */
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import CTAGroup from "@/components/about/CTAGroup";
import SectionHeader from "@/components/about/SectionHeader";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";
import { CONTACT } from "@/lib/site-links";

export default function AboutFinalCta() {
  const { eyebrow, title, lede, person, ctas } = ABOUT_PAGE_DATA.finalCta;

  return (
    <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 lg:gap-16">
      <div className="relative aspect-[3/4] w-36 shrink-0 overflow-hidden rounded-xl border border-border bg-muted md:w-44">
        <Image
          src={person.image.src}
          alt={person.image.alt}
          fill
          sizes={person.image.sizes ?? "(min-width: 768px) 176px, 144px"}
          className="object-cover object-top"
        />
      </div>

      <div className="max-w-2xl">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />

        <p className="mt-6 text-sm">
          <span className="font-semibold text-foreground">{person.name}</span>
          <span className="text-muted-foreground"> · {person.role}</span>
        </p>

        <div className="mt-5 flex flex-col gap-x-8 gap-y-2 border-t border-border pt-5 sm:flex-row sm:flex-wrap">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
          >
            <Phone size={16} aria-hidden="true" className="text-brand-text" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
          >
            <Mail size={16} aria-hidden="true" className="text-brand-text" />
            {CONTACT.email}
          </a>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground sm:self-center">
            {CONTACT.hoursShort}
          </p>
        </div>

        <div className="mt-8">
          <CTAGroup data={ctas} />
        </div>
      </div>
    </div>
  );
}
