/**
 * Announcements Queries
 *
 * GROQ-Queries und Typen für das Mitteilungssystem.
 *
 * Prioritäts-Logik:
 * - Nur eine Mitteilung pro Seite (höchste Priorität gewinnt)
 * - Sortiert nach priority DESC
 * - Filter: isActive, targetPages, startDate/endDate
 *
 * Placement bestimmt die Darstellungsart:
 * - 'topbar': Schmale Leiste ganz oben
 * - 'banner': Großes Banner unter dem Header
 * - 'inline': Card im Content-Bereich
 */

import { client, isSanityConfigured } from "./sanity-client";
import groq from "groq";

/** Verfügbare Mitteilungs-Typen (bestimmt Farbe/Icon) */
export type AnnouncementType = "info" | "warning" | "success" | "promo";

/** Verfügbare Platzierungen */
export type AnnouncementPlacement = "topbar" | "banner" | "inline";

/** Zielseiten für Mitteilungen */
export type AnnouncementTargetPage = "all" | "home" | "blog" | "karriere";

/** Vollständige Mitteilung aus Sanity */
export type Announcement = {
  _id: string;
  title?: string;
  message: string;
  cta?: {
    text: string;
    url: string;
  };
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  type: AnnouncementType;
  placement: AnnouncementPlacement;
  priority: number;
  targetPages: AnnouncementTargetPage;
};

/**
 * GROQ Query für aktive Mitteilungen
 * - Filtert nach isActive, startDate und endDate
 * - Sortiert nach Priorität (höchste zuerst)
 */
const ACTIVE_ANNOUNCEMENTS_QUERY = groq`
*[
  _type == "announcement" 
  && isActive == true
  && (
    !defined(startDate) || startDate <= now()
  )
  && (
    !defined(endDate) || endDate >= now()
  )
] | order(priority desc) {
  _id,
  title,
  message,
  cta,
  type,
  placement,
  priority,
  targetPages
}
`;

/** Tag für ISR Revalidation */
export const ANNOUNCEMENTS_TAG = "announcements";

/**
 * Lädt alle aktiven Mitteilungen aus Sanity
 * Mit ISR-Caching (60 Sekunden)
 */
export async function fetchActiveAnnouncements(): Promise<Announcement[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    return await client.fetch(
      ACTIVE_ANNOUNCEMENTS_QUERY,
      {},
      {
        next: {
          revalidate: 60, // Cache für 60 Sekunden
          tags: [ANNOUNCEMENTS_TAG],
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    return []; // Fail gracefully - Seite funktioniert trotzdem
  }
}

/**
 * Findet die relevanteste Mitteilung für eine bestimmte Seite
 *
 * @param announcements - Alle aktiven Mitteilungen
 * @param currentPage - Aktuelle Seite ('home', 'blog', 'karriere')
 * @returns Die Mitteilung mit höchster Priorität für diese Seite oder undefined
 */
export function findRelevantAnnouncement(
  announcements: Announcement[],
  currentPage: AnnouncementTargetPage = "home"
): Announcement | undefined {
  return announcements.find(
    (a) => a.targetPages === "all" || a.targetPages === currentPage
  );
}
