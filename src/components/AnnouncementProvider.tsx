/**
 * AnnouncementProvider – Server Component für Mitteilungen
 *
 * Lädt die aktive Mitteilung für die aktuelle Seite und
 * rendert basierend auf dem Placement die richtige Komponente:
 * - topbar: AnnouncementTopBar (vor Header)
 * - banner: AnnouncementBannerDisplay (unter Header)
 * - inline: AnnouncementInlineCard (im Content)
 *
 * Hinweis: Für 'banner' und 'inline' müssen separate Provider
 * an der entsprechenden Stelle im Layout eingebunden werden.
 */
import {
  fetchActiveAnnouncements,
  findRelevantAnnouncement,
  type AnnouncementTargetPage,
  type AnnouncementPlacement,
} from "@/lib/announcements-queries";
import { AnnouncementTopBar } from "./AnnouncementTopBar";
import { AnnouncementBannerDisplay } from "./AnnouncementBannerDisplay";
import { AnnouncementInlineCard } from "./AnnouncementInlineCard";

type Props = {
  /** Aktuelle Seite für Targeting */
  currentPage?: AnnouncementTargetPage;
  /** Nur Mitteilungen mit diesem Placement anzeigen (für Layout-Integration) */
  placement?: AnnouncementPlacement;
};

export async function AnnouncementProvider({ currentPage = "home", placement }: Props) {
  try {
    const announcements = await fetchActiveAnnouncements();

    if (!announcements || announcements.length === 0) {
      return null;
    }

    // Finde die relevante Mitteilung für diese Seite
    let relevantAnnouncement = findRelevantAnnouncement(announcements, currentPage);

    // Wenn ein spezifisches Placement angefordert wurde, nur diese anzeigen
    if (placement && relevantAnnouncement) {
      if (relevantAnnouncement.placement !== placement) {
        // Suche nach einer anderen Mitteilung mit dem gewünschten Placement
        relevantAnnouncement = announcements.find(
          (a) =>
            a.placement === placement &&
            (a.targetPages === "all" || a.targetPages === currentPage)
        );
      }
    }

    if (!relevantAnnouncement) {
      return null;
    }

    // Rendere basierend auf dem Placement
    const placementToUse = relevantAnnouncement.placement || "topbar";

    switch (placementToUse) {
      case "topbar":
        return <AnnouncementTopBar announcement={relevantAnnouncement} />;
      case "banner":
        return <AnnouncementBannerDisplay announcement={relevantAnnouncement} />;
      case "inline":
        return <AnnouncementInlineCard announcement={relevantAnnouncement} />;
      default:
        return <AnnouncementTopBar announcement={relevantAnnouncement} />;
    }
  } catch (error) {
    // Fail silently - Mitteilungen sind nicht kritisch
    console.error("Failed to load announcements:", error);
    return null;
  }
}

/**
 * Spezialisierte Provider für Layout-Integration
 */

/** Provider nur für TopBar (vor Header) */
export async function AnnouncementTopBarProvider({
  currentPage = "home",
}: {
  currentPage?: AnnouncementTargetPage;
}) {
  return <AnnouncementProvider currentPage={currentPage} placement="topbar" />;
}

/** Provider nur für Banner (nach Header) */
export async function AnnouncementBannerProvider({
  currentPage = "home",
}: {
  currentPage?: AnnouncementTargetPage;
}) {
  return <AnnouncementProvider currentPage={currentPage} placement="banner" />;
}

/** Provider nur für Inline-Cards (im Content) */
export async function AnnouncementInlineProvider({
  currentPage = "home",
}: {
  currentPage?: AnnouncementTargetPage;
}) {
  return <AnnouncementProvider currentPage={currentPage} placement="inline" />;
}
