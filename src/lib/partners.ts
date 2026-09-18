// src/lib/partners.ts
import { SITE_LINKS } from "@/lib/site-links";

/**
 * Zentrale Single-Source-of-Truth für ALLE Partner & Kooperationen.
 *
 * Neue Partner werden ausschließlich hier ergänzt – jede Seite, die
 * <PartnersSection /> einbindet, zeigt automatisch den identischen Stand.
 *
 * Jeder Partner hat ein einheitliches Standard-Layout:
 *   Logo · Name · kurzer Text · Link zur Website.
 */

export type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Hintergrund der Logo-Plakette:
   * - "light": weiße Plakette (für dunkle/farbige Logos & weiße-BG-Logos)
   * - "dark":  dunkle Plakette (für Logos mit weißer Schrift, z. B. Cylex)
   */
  plaque: "light" | "dark";
  /**
   * Darstellungshöhe in der Plakette (h-20):
   * - "default": max. 48px
   * - "compact": max. 36px – für sehr breite Logos bzw. Marken mit
   *   vorgeschriebener Schutzzone (Würth: mind. Höhe des unteren
   *   Schraubenkopfes ≈ 44 % der Logohöhe rundum).
   */
  size?: "default" | "compact";
  /** Logo wird direkt vom Anbieter-Server geladen (z. B. Cylex-Widget) → <img> statt next/image */
  external?: boolean;
};

export type Partner = {
  id: string;
  name: string;
  /** Kurze Einordnung der Beziehung, z. B. "Lieferant · Fenster & Türen". */
  role?: string;
  description: string;
  href: string;
  hrefLabel?: string;
  logo: PartnerLogo;
};

export const PARTNERS: Partner[] = [
  {
    id: "hoening",
    name: "HÖNING",
    role: "Lieferant · Fenster & Haustüren",
    description:
      "Deutscher Premium-Hersteller für langlebige Fenster- und Haustürlösungen „Made in Germany“.",
    href: "https://www.hoening.de/",
    hrefLabel: "hoening.de",
    logo: {
      src: "/bilder_ordner/coop/hoening.png",
      alt: "HÖNING Logo",
      width: 200,
      height: 60,
      plaque: "light",
    },
  },
  {
    id: "german-windows",
    name: "GERMAN WINDOWS",
    role: "Lieferant · Fenster & Türen",
    description:
      "Unser zweiter Lieferant für Fensterelemente und Türen: familiengeführter Hersteller mit über 40 Jahren Erfahrung – maßgefertigt aus Kunststoff, Holz und Aluminium.",
    href: "https://www.germanwindows.de/",
    hrefLabel: "germanwindows.de",
    logo: {
      src: "/bilder_ordner/coop/german_window_logo_white.svg",
      alt: "GERMAN WINDOWS Logo",
      width: 189,
      height: 60,
      plaque: "dark",
    },
  },
  {
    id: "wuerth",
    name: "WÜRTH",
    role: "Partner & Lieferant",
    description:
      "Partner und Lieferant für Montage- und Befestigungstechnik, Werkzeug und Verbrauchsmaterial in Profiqualität.",
    href: "https://www.wuerth.de/",
    hrefLabel: "wuerth.de",
    logo: {
      src: "/bilder_ordner/coop/WRT_Linie_RGB_pos.jpg",
      alt: "WÜRTH Logo",
      width: 280,
      height: 60,
      // Laut Würth-Logoanleitung: pos-Variante nur auf Weiß, unverändert, mit Schutzzone.
      plaque: "light",
      size: "compact",
    },
  },
  {
    id: "kilbinger",
    name: "Kilbinger Fachhandel & Service Neuss",
    role: "Fachhandel · Neuss",
    description:
      "Lokaler Fachhandel aus Neuss für verlässliche Lieferwege und erstklassige Materialien.",
    href: "https://www.kilbinger.de/",
    hrefLabel: "kilbinger.de",
    logo: {
      src: "/bilder_ordner/coop/Kilbinger-Logo.jpg",
      alt: "Kilbinger Fachhandel & Service Neuss Logo",
      width: 200,
      height: 90,
      plaque: "light",
    },
  },
  {
    id: "immobilienverwaltung",
    name: "Ergart Immobilienverwaltung",
    role: "Unternehmensgruppe",
    description:
      "Strukturierte kaufmännische Verwaltung als eigener Geschäftsbereich der Ergart-Unternehmen.",
    href: SITE_LINKS.external.immobilienverwaltung,
    hrefLabel: "Zur Immobilienverwaltung",
    logo: {
      src: "/bilder_ordner/coop/Ergart-Immobilienverwaltung-Neuss-Logo.png",
      alt: "Ergart Immobilienverwaltung Neuss Logo",
      width: 260,
      height: 80,
      plaque: "light",
    },
  },
  {
    id: "verkehrswacht",
    name: "Verkehrswacht Rhein-Kreis Neuss e. V.",
    role: "Engagement",
    description:
      "Gemeinsam für mehr Verkehrssicherheit – wir unterstützen das Projekt „Kinder sicher im Straßenverkehr“.",
    href: "https://vrkn.de/",
    hrefLabel: "vrkn.de",
    logo: {
      src: "/bilder_ordner/coop/verkehrswacht-neuss.png",
      alt: "Verkehrswacht Rhein-Kreis Neuss e. V. Logo",
      width: 220,
      height: 90,
      plaque: "light",
    },
  },
  {
    id: "cylex",
    name: "CYLEX Dienstleistungs GmbH",
    role: "Branchenverzeichnis",
    description:
      "Für mehr Transparenz und Auffindbarkeit sind wir im Cylex Branchenbuch gelistet.",
    href: "https://web2.cylex.de/firma-home/hausmeisterservice-alexander-ergart-17001936.html",
    hrefLabel: "Eintrag auf Cylex.de",
    logo: {
      src: "https://web2.cylex.de/admin/cylex_logo3_17001936.png",
      alt: "CYLEX Branchenbuch Logo",
      width: 120,
      height: 60,
      plaque: "light",
      external: true,
    },
  },
];

/** Optionaler Helfer, um eine Teilmenge in definierter Reihenfolge zu holen. */
export function getPartners(ids?: string[]): Partner[] {
  if (!ids || ids.length === 0) return PARTNERS;
  return ids
    .map((id) => PARTNERS.find((p) => p.id === id))
    .filter((p): p is Partner => Boolean(p));
}
