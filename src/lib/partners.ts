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
  /** Logo wird direkt vom Anbieter-Server geladen (z. B. Cylex-Widget) → <img> statt next/image */
  external?: boolean;
};

export type Partner = {
  id: string;
  name: string;
  description: string;
  href: string;
  hrefLabel?: string;
  logo: PartnerLogo;
};

export const PARTNERS: Partner[] = [
  {
    id: "hoening",
    name: "HÖNING",
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
    id: "kilbinger",
    name: "Kilbinger Fachhandel & Service Neuss",
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
