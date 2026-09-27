// src/lib/about/about-assets.ts
/**
 * Bildkatalog der Über-uns-Seite. Eine Quelle für Pfad, Alt-Text und
 * Intrinsic-Größe — damit `next/image` nirgends geraten werden muss und
 * Layout-Shift ausbleibt. Die Werte entsprechen den Dateien in
 * /public/bilder_ordner.
 */
import type { AboutImageData } from "./types";

type AboutAssetCatalog = {
  hero: AboutImageData;
  leadership: AboutImageData;
  owner: AboutImageData;
  handwerkskammer: AboutImageData;
  smairys: AboutImageData;
  socialEngagement: AboutImageData | null;
};

export const ABOUT_ASSETS: AboutAssetCatalog = {
  hero: {
    src: "/bilder_ordner/ueberuns/firmenzentrale-weitaufnahme.webp",
    alt: "Firmenzentrale von Alexander Ergart an der Further Straße in Neuss",
    width: 2048,
    height: 1264,
    sizes: "(min-width: 1024px) 45vw, 100vw",
    priority: true,
  },
  /**
   * ACHTUNG, Alt-Text bewusst geaendert: die Datei zeigt drei Mitarbeiter in
   * Ergart-Arbeitskleidung, nicht die beiden Namensgeber. Der bisherige
   * Alt-Text ("Alexander und Tatjana Ergart ...") hat also etwas behauptet,
   * was auf dem Bild nicht zu sehen ist — im Abschnitt ueber die
   * Geschaeftsleitung faellt das unmittelbar auf und kostet genau das
   * Vertrauen, das der Abschnitt aufbauen soll. Sobald ein echtes Foto der
   * Geschaeftsleitung vorliegt, gehoert es hierher.
   */
  leadership: {
    src: "/bilder_ordner/kontakt/team_ergart.webp",
    alt: "Drei Mitarbeiter von Alexander Ergart in Arbeitskleidung in der Zentrale in Neuss",
    width: 832,
    height: 1248,
    sizes: "(min-width: 768px) 320px, 60vw",
  },
  owner: {
    src: "/bilder_ordner/ceo-geschaeftsfuehrer-alexander-ergart.webp",
    alt: "Alexander Ergart, Inhaber des Hausmeister- und Fensterservice in Neuss",
    width: 326,
    height: 710,
    sizes: "(min-width: 768px) 176px, 140px",
  },
  handwerkskammer: {
    src: "/bilder_ordner/zertifikate/Handwerkskammer_HWK_Initialen_Transparente_buchstaben.png",
    alt: "HWK, Handwerkskammer",
    width: 48,
    height: 48,
  },
  /**
   * Schwarzes Logo auf Transparenz. Im Dark Mode unsichtbar, deshalb trägt
   * jede Verwendung `dark:invert` — genauso wie im Footer.
   */
  smairys: {
    src: "/bilder_ordner/logo/smairys-logo.png",
    alt: "Smairys Netz-Manufaktur",
    width: 500,
    height: 500,
  },
  socialEngagement: {
    src: "/bilder_ordner/soziales-engagement/verkehrswacht-kinder-sicher-collage.webp",
    alt: "Arbeitsbuch der Verkehrswacht Rhein-Kreis Neuss zur Radfahrausbildung",
    width: 1181,
    height: 1181,
    sizes: "(min-width: 768px) 320px, 100vw",
  },
};
