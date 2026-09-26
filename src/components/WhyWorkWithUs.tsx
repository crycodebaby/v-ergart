// src/components/WhyWorkWithUs.tsx
/**
 * Arbeitgeber-Argumente. Links die Aussage, rechts sechs Punkte als ruhige
 * Liste: kleines Icon, Titel, zwei Sätze. Keine Kacheln, keine Karten.
 * Rendert nur Inhalt – Fläche und Abstand kommen von der <Section>.
 */
import Image from "next/image";
import { KARRIERE_BENEFITS } from "@/lib/karriere-data";
import { DynamicIcon } from "./DynamicIcon";

export function WhyWorkWithUs() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Warum Ergart
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Was Sie bei uns erwarten können
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          Wir sind ein Handwerksbetrieb aus Neuss, kein Konzern. Das hat
          Vorteile, die man im Arbeitsalltag merkt.
        </p>

        {/* Detail 3: die Eintragung bei der Handwerkskammer – ein echter
            Beleg statt einer weiteren Behauptung. */}
        <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
          <Image
            src="/bilder_ordner/zertifikate/Handwerkskammer_HWK_Initialen_Transparente_buchstaben.png"
            alt="HWK – Handwerkskammer"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 object-contain"
          />
          <p className="text-sm leading-snug">
            <span className="font-semibold text-foreground">Eingetragener Handwerksbetrieb</span>
            <span className="block text-muted-foreground">
              Handwerkskammer Düsseldorf, seit März 2018
            </span>
          </p>
        </div>
      </div>

      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
        {KARRIERE_BENEFITS.map((benefit) => (
          <li key={benefit.title} className="flex gap-4">
            <DynamicIcon
              name={benefit.icon}
              size={20}
              className="mt-0.5 shrink-0 text-brand-text"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {benefit.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
