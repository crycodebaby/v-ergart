/**
 * ChristmasProvider – Server Component für Weihnachts-Effekte
 *
 * Lädt die siteSettings und rendert basierend auf dem Modus:
 * - off: Nichts
 * - simple: Nur Weihnachtsgruß
 * - full: Gruß + Lichterkette + Schneefall + Dekorationen
 */
import {
  fetchSiteSettings,
  getEffectiveChristmasMode,
  DEFAULT_CHRISTMAS_GREETING,
} from "@/lib/site-settings-queries";
import { ChristmasGreeting } from "./ChristmasGreeting";
import { ChristmasLights } from "./ChristmasLights";
import { Snowfall } from "./Snowfall";
import { ChristmasCornerDecorations, WinterCornerFrost } from "./ChristmasDecorations";

export async function ChristmasProvider() {
  const settings = await fetchSiteSettings();
  const mode = getEffectiveChristmasMode(settings);

  // Nichts anzeigen wenn deaktiviert
  if (mode === "off") {
    return null;
  }

  const greetingText =
    settings?.christmasGreetingText || DEFAULT_CHRISTMAS_GREETING;

  return (
    <>
      {/* === Voller Modus: Alle Effekte === */}
      {mode === "full" && (
        <>
          {/* Schneefall (Desktop only, unter Inhalt, z-index 1) */}
          <Snowfall />
          
          {/* Frost-Effekt in den oberen Ecken */}
          <WinterCornerFrost />
          
          {/* Dekorative Elemente (Tanne, Geschenk, Schneeflocken) */}
          <ChristmasCornerDecorations />
        </>
      )}

      {/* === Lichterkette nur im vollen Modus === */}
      {mode === "full" && <ChristmasLights />}

      {/* === Weihnachtsgruß bei simple UND full === */}
      <ChristmasGreeting greetingText={greetingText} />
    </>
  );
}

/**
 * Lädt den effektiven Weihnachtsmodus für data-Attribut
 * Kann in layout.tsx verwendet werden
 */
export async function getChristmasMode() {
  const settings = await fetchSiteSettings();
  return getEffectiveChristmasMode(settings);
}
