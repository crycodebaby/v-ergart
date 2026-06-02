// src/components/TrustAndPartnerSection.tsx
/**
 * TrustAndPartnerSection
 *
 * Bündelt Trust-Signale auf einer Seite:
 *   1. Handwerkskammer Düsseldorf (Mitgliedschaft / Zertifizierung)
 *   2. Kilbinger Fachhandel & Service Neuss (Kooperationspartner)
 *   3. Cylex Branchenbuch (verifizierter Brancheneintrag)
 *
 * Layout-Strategie:
 * Horizontale Karten (Logo links, Text rechts) im 2-Spalten-Grid. Die beiden
 * Partner-/Zertifikat-Karten stehen oben nebeneinander; die Cylex-Karte läuft
 * auf md+ über die volle Breite (md:col-span-2), damit kein halbbreites
 * "Waisen-Kärtchen" entsteht und das Raster ausbalanciert bleibt.
 *
 * Darkmode-Strategie für Raster-Logos:
 * - Kilbinger-JPG (weißer BG) sitzt in einem weißen Container → wirkt wie ein
 *   physisches Qualitätssiegel, verschmilzt in Light & Dark Mode nahtlos.
 * - Das Cylex-PNG (weißer Schriftzug, für schwarzen Hintergrund konzipiert –
 *   siehe Widget style="background:black") sitzt auf einem dunklen Gradient,
 *   damit der weiße CYLEX-Schriftzug in Light UND Dark Mode mit gleich starkem
 *   Kontrast lesbar bleibt.
 *
 * Hinweis zum Cylex-Logo:
 * Wir laden das Logo direkt vom Cylex-Server (offizielles Widget-Snippet),
 * damit Cylex die Sichtbarkeit korrekt zählen kann. Deshalb bewusst <img>
 * statt next/image (keine Domain-Konfig nötig, kein Caching durch Next).
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
            {/* Logo-Badge: weißer Container als "Plakette" – funktioniert
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

        {/* ─── Card 3: Cylex Branchenbuch (volle Breite ab md) ─────────── */}
        <div className="md:col-span-2 overflow-hidden rounded-xl border border-zinc-300/40 dark:border-zinc-700/40 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/60 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Logo-Badge: dunkler Gradient als "Plakette" – sorgt für
                gleichbleibend hohen Kontrast des weißen CYLEX-Schriftzugs in
                Light & Dark Mode. Die gesamte Badge ist klickbar. */}
            <div className="shrink-0 p-5 flex items-center justify-center sm:min-w-[160px]">
              <a
                href="https://web2.cylex.de/firma-home/hausmeisterservice-alexander-ergart-17001936.html"
                target="_blank"
                rel="noopener noreferrer"
                title="Hausmeisterservice Alexander Ergart auf Cylex"
                aria-label="Eintrag von Hausmeisterservice Alexander Ergart im Cylex Branchenbuch ansehen (öffnet in neuem Tab)"
                className="group relative block overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black p-4 shadow-md ring-1 ring-black/10 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),transparent_65%)]"
                />
                {/*
                  Bewusst <img> statt next/image:
                  - Offizielles Cylex-Widget-Snippet (direkter Hit auf Cylex-CDN)
                  - Vermeidet Anpassung von next.config remotePatterns
                  - Korrekte Sichtbarkeitszählung bei Cylex
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://web2.cylex.de/admin/cylex_logo2_17001936.png"
                  alt="CYLEX Branchenbuch Logo"
                  width={120}
                  height={60}
                  loading="lazy"
                  decoding="async"
                  className="relative block h-[60px] w-[120px]"
                />
              </a>
            </div>

            {/* Text */}
            <div className="p-6 flex-1 space-y-2 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Branchenbuch-Eintrag
              </p>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Wir sind auf Cylex.de!
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Für mehr Transparenz und Auffindbarkeit haben wir uns mit der{" "}
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                  CYLEX Dienstleistungs GmbH
                </strong>{" "}
                aus Oberhaus zusammengetan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustAndPartnerSection;
