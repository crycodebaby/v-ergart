// src/components/TrustAndPartnerSection.tsx
/**
 * TrustAndPartnerSection
 *
 * Bündelt Trust-Signale auf einer Seite: Handwerkskammer-Zertifikat +
 * Kilbinger Fachhandel & Service als offizieller Kooperationspartner.
 *
 * Darkmode-Strategie für das Kilbinger-JPG-Logo (weißer Hintergrund):
 * Das Logo wird absichtlich in einen weißen Container (bg-white) eingebettet.
 * Im Dark Mode erscheint dieser Container dann wie eine offizielle, physische
 * Plakette/Badge – der weiße JPG-Hintergrund verschmilzt nahtlos.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TrustAndPartnerSectionProps {
  className?: string;
}

export function TrustAndPartnerSection({
  className,
}: TrustAndPartnerSectionProps) {
  return (
    <section
      aria-label="Zertifizierungen & Kooperationspartner"
      className={cn("w-full max-w-6xl mx-auto px-4 my-10", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ─── Card 1: Handwerkskammer ─────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-white to-orange-50/30 dark:from-zinc-900 dark:to-zinc-800/50 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Logo */}
            <div className="shrink-0 p-6 flex items-center justify-center bg-white dark:bg-zinc-950/50 sm:min-w-[160px]">
              <div className="relative w-28 h-28">
                {/* Light Mode */}
                <Image
                  src="/bilder_ordner/zertifikate/Handwerkskammer_Icon.jpeg"
                  alt="Handwerkskammer Düsseldorf Logo"
                  fill
                  className="object-contain dark:hidden"
                  sizes="112px"
                />
                {/* Dark Mode */}
                <Image
                  src="/bilder_ordner/zertifikate/Handwerkskammer_HWK_Initialen_Transparente_buchstaben.png"
                  alt="Handwerkskammer Düsseldorf Logo"
                  fill
                  className="object-contain hidden dark:block"
                  sizes="112px"
                />
              </div>
            </div>

            {/* Text */}
            <div className="p-6 flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Offizielles Mitglied der Handwerkskammer Düsseldorf
              </h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                Mitglied seit März 2018
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Als eingetragener Handwerksbetrieb garantieren wir fachmännische
                Ausführung und höchste Qualitätsstandards – anerkannt für
                Raumausstattung, Fenster- &amp; Türenbau sowie Gebäudereinigung.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Card 2: Kilbinger Fachhandel ────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-white to-blue-50/20 dark:from-zinc-900 dark:to-zinc-800/50 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Logo-Badge: wb-white Container als "Plakette" – funktioniert
                in Light & Dark Mode, da der weiße JPG-BG mit dem weißen
                Container nahtlos verschmilzt. Das wirkt wie ein offizielles
                Etikett / Qualitätssiegel. */}
            <div className="shrink-0 p-5 flex items-center justify-center sm:min-w-[160px]">
              <div className="bg-white rounded-xl p-3 shadow-md ring-1 ring-gray-200/80">
                <div className="relative w-28 h-20">
                  <Image
                    src="/bilder_ordner/coop/Kilbinger-Logo.jpg"
                    alt="Kilbinger Fachhandel & Service Neuss – Kooperationspartner"
                    fill
                    className="object-contain"
                    sizes="112px"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="p-6 flex-1 space-y-2 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Kooperationspartner
              </p>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Kilbinger Fachhandel &amp; Service Neuss
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Als offizieller Partner von Kilbinger setzen wir auf lokale
                Qualität, verlässliche Lieferwege und erstklassige Materialien –
                direkt aus Neuss für unsere Kunden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustAndPartnerSection;
