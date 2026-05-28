/**
 * Site Settings Queries
 *
 * GROQ-Abfragen für die globalen Website-Einstellungen.
 * Verwendet für Weihnachts-Theme und zukünftige saisonale Features.
 */

import { client, isSanityConfigured } from "./sanity-client";
import groq from "groq";

/** Mögliche Weihnachtsmodus-Werte */
export type ChristmasMode = "off" | "simple" | "full";

/** Struktur der siteSettings aus Sanity */
export type SiteSettings = {
  christmasThemeMode: ChristmasMode;
  christmasGreetingText?: string;
  christmasStartDate?: string;
  christmasEndDate?: string;
};

/** GROQ Query für siteSettings */
const SITE_SETTINGS_QUERY = groq`
*[_type == "siteSettings" && _id == "siteSettings"][0] {
  christmasThemeMode,
  christmasGreetingText,
  christmasStartDate,
  christmasEndDate
}
`;

/** Tag für ISR Revalidation */
export const SITE_SETTINGS_TAG = "siteSettings";

/**
 * Lädt die Website-Einstellungen aus Sanity
 * Mit ISR-Caching (60 Sekunden)
 */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch(
      SITE_SETTINGS_QUERY,
      {},
      {
        next: {
          revalidate: 60,
          tags: [SITE_SETTINGS_TAG],
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

/**
 * Berechnet den effektiven Weihnachtsmodus basierend auf Settings und Datum
 *
 * Logik:
 * - Wenn Modus "off" → immer off
 * - Wenn Modus "simple" oder "full" und KEIN Datumsbereich → immer aktiv
 * - Wenn Datumsbereich gesetzt → nur aktiv wenn im Bereich
 */
export function getEffectiveChristmasMode(settings: SiteSettings | null): ChristmasMode {
  if (!settings || settings.christmasThemeMode === "off") {
    return "off";
  }

  const mode = settings.christmasThemeMode;
  const now = new Date();

  // Wenn beide Datumsgrenzen gesetzt sind, prüfe ob wir im Bereich liegen
  if (settings.christmasStartDate || settings.christmasEndDate) {
    const start = settings.christmasStartDate ? new Date(settings.christmasStartDate) : null;
    const end = settings.christmasEndDate ? new Date(settings.christmasEndDate) : null;

    // Wenn Start definiert und wir sind davor → off
    if (start && now < start) {
      return "off";
    }

    // Wenn End definiert und wir sind danach → off
    if (end && now > end) {
      return "off";
    }
  }

  return mode;
}

/** Standard-Weihnachtsgruß wenn kein Text hinterlegt */
export const DEFAULT_CHRISTMAS_GREETING =
  "Wir wünschen Ihnen frohe Weihnachten und einen guten Rutsch ins neue Jahr. Ihr Ergart-Team.";
