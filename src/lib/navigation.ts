// src/lib/navigation.ts
/**
 * Navigation – die eine Quelle der Wahrheit für die Besucherführung.
 *
 * Header (Desktop + Mobile-Sheet), Footer-Sitemap und Breadcrumbs lesen
 * alle aus dieser Datei. Vorher hielt der Header zwei Listen (navLinks +
 * dropdownLinks) und der Footer eine dritte, handgepflegte – mit der
 * Folge, dass "Fensterservice" im Mobile-Menü doppelt auftauchte und
 * Leistungen, Referenzen, Karriere im Footer gar nicht.
 *
 * Informationsarchitektur (5 Hauptpunkte + 1 Aktion):
 *
 *   Leistungen ▾        alle Hausmeister-/Gebäude-Leistungen (Übersicht + 5 Detailseiten)
 *   Fenster & Türen ▾   das Kernprodukt, mit klarer Absichts-Trennung:
 *                       kaufen (/fenster), Türen (/tueren), reparieren (/fensterservice)
 *   Referenzen
 *   Über uns
 *   Karriere
 *   [Anfragen]          Primär-CTA -> /kontakt
 *
 * "Startseite" ist bewusst kein Menüpunkt mehr: das Logo verlinkt auf "/",
 * im Mobile-Sheet bleibt ein expliziter Eintrag, weil dort das Logo hinter
 * dem Overlay liegt.
 *
 * Keine React-Imports, keine "use client"-Direktive: die Datei muss aus
 * Server- (Footer, Breadcrumbs) und Client-Komponenten (Header) importierbar
 * sein. Icons werden deshalb als Name gehalten und erst im Header aufgelöst.
 */
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";

export type NavIconName =
  | "building"
  | "door"
  | "wrench"
  | "paintbrush"
  | "leaf"
  | "home"
  | "shield"
  | "layout-grid";

export type NavChild = {
  href: string;
  label: string;
  /** Eine Zeile, die die Absicht klärt (kaufen vs. reparieren). */
  description: string;
  icon?: NavIconName;
  /** Vorschaubild im Desktop-Dropdown (wird beim Hover eingeblendet). */
  image: string;
};

export type NavGroup = {
  kind: "group";
  /** Übersichtsseite der Gruppe. Der Trigger selbst ist kein Link. */
  href: string;
  label: string;
  /** Kurzer Zusatz für den Dropdown-Kopf. */
  intro: string;
  /** Vorschaubild, solange kein Eintrag gehovert ist. */
  image: string;
  children: readonly NavChild[];
  /** Link am Fuß des Dropdowns, z. B. "Alle Leistungen ansehen". */
  overviewLabel: string;
  /**
   * Pfade (Präfixe), bei denen die Gruppe als "aktiv" gilt – zusätzlich zu
   * href und den Kind-Links. Nötig, weil /leistungen/innenausbau unter
   * /leistungen liegt, /fensterservice aber NICHT unter /fenster-tueren.
   */
  activePrefixes: readonly string[];
};

export type NavLink = {
  kind: "link";
  href: string;
  label: string;
  activePrefixes?: readonly string[];
};

export type NavItem = NavGroup | NavLink;

const LEISTUNG_ICONS: Record<string, NavIconName> = {
  innenausbau: "paintbrush",
  gartenpflege: "leaf",
  hausmeister: "wrench",
  reinigung: "home",
  sicherheit: "shield",
};

/** Hauptnavigation, in Anzeigereihenfolge. */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    kind: "group",
    href: "/leistungen",
    label: "Leistungen",
    intro: "Hausmeisterservice, Reinigung, Garten & mehr in Neuss",
    image: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    overviewLabel: "Alle Leistungen ansehen",
    activePrefixes: ["/leistungen"],
    children: LEISTUNGEN_DETAILS.map((item) => ({
      href: `/leistungen/${item.slug}`,
      label: item.title,
      description: item.shortDesc,
      icon: LEISTUNG_ICONS[item.slug] ?? "layout-grid",
      image: item.heroImage,
    })),
  },
  {
    kind: "group",
    href: "/fenster-tueren",
    label: "Fenster & Türen",
    intro: "HÖNING-Qualität – neu einbauen oder bestehende Fenster retten",
    image: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
    overviewLabel: "Übersicht Fenster & Türen",
    activePrefixes: ["/fenster-tueren", "/fenster", "/tueren", "/fensterservice"],
    children: [
      {
        href: "/fenster",
        label: "Neue Fenster",
        description: "Neue Fenster kaufen oder alte austauschen – inkl. Aufmaß und Montage.",
        icon: "building",
        image: "/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp",
      },
      {
        href: "/tueren",
        label: "Haustüren & Türen",
        description: "Sichere, stilvolle Eingangs- und Nebeneingangstüren.",
        icon: "door",
        image: "/bilder_ordner/hoening/tueren/tueren-hero.webp",
      },
      {
        href: "/fensterservice",
        label: "Fensterservice",
        description: "Vorhandene Fenster reparieren, einstellen und warten.",
        icon: "wrench",
        image: "/bilder_ordner/galerie/fensterwartung-dichtungstausch.webp",
      },
    ],
  },
  { kind: "link", href: "/referenzen", label: "Referenzen" },
  { kind: "link", href: "/ueber-uns", label: "Über uns" },
  { kind: "link", href: "/karriere", label: "Karriere" },
] as const;

/**
 * Sekundäre Ziele: nicht in der Desktop-Leiste (Platz), aber im
 * Mobile-Sheet und in der Footer-Sitemap.
 */
export const NAV_SECONDARY: readonly NavLink[] = [
  { kind: "link", href: "/blog", label: "Ratgeber & Blog", activePrefixes: ["/blog"] },
  { kind: "link", href: "/kontakt", label: "Kontakt" },
] as const;

/** Primär-Aktion der gesamten Website. */
export const NAV_CTA = {
  href: "/kontakt",
  label: "Jetzt anfragen",
  /** Längere Variante, wo Platz ist (Mobile-Sheet). */
  labelLong: "Unverbindlich anfragen",
} as const;

// ---------------------------------------------------------------------------
// Aktiv-Zustand
// ---------------------------------------------------------------------------

/** Trifft `pathname` exakt auf `href` oder liegt darunter (/a, /a/b)? */
export function pathMatches(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Ist ein Navigationspunkt für den aktuellen Pfad aktiv? */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (pathMatches(pathname, item.href)) return true;
  const prefixes = item.activePrefixes ?? [];
  if (prefixes.some((p) => pathMatches(pathname, p))) return true;
  if (item.kind === "group") {
    return item.children.some((c) => pathMatches(pathname, c.href));
  }
  return false;
}
