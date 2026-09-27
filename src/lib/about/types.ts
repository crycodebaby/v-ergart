// src/lib/about/types.ts
/**
 * Datentypen der Über-uns-Seite.
 *
 * Bewusst React-frei (Icons als lucide-Namen, aufgelöst über DynamicIcon) —
 * dieselbe Trennung wie in karriere-data.ts: Inhalt hier, Darstellung in den
 * Komponenten. Die Seite erzählt acht Jahre Betrieb in Neuss, deshalb sind die
 * Textfelder eng geschnitten: ein Satz Aussage, höchstens zwei Sätze Beleg.
 */

export type AboutSectionId =
  | "hero"
  | "timeline"
  | "leadership"
  | "principles"
  | "region"
  | "partners"
  | "engagement"
  | "finalCta";

export type AboutLinkKind = "internal" | "external";

export interface AboutImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export interface AboutFigureData extends AboutImageData {
  caption?: string;
  credit?: string;
}

export interface AboutCtaLink {
  label: string;
  href: string;
  kind: AboutLinkKind;
  trackingId?: string;
  ariaLabel?: string;
}

export interface AboutCtaGroupData {
  title?: string;
  text?: string;
  primary: AboutCtaLink;
  secondary?: AboutCtaLink;
  note?: string;
}

/** Kopf einer Sektion. `lede` ist optional — nicht jede Sektion braucht einen. */
export interface AboutSectionMeta {
  id: AboutSectionId;
  eyebrow: string;
  title: string;
  lede?: string;
}

/** Ein Beleg im Faktenband unter dem Hero. Keine Marketingzahlen. */
export interface AboutFact {
  value: string;
  label: string;
}

/**
 * Eine Station der Zeitachse. `period` steht in Mono links an der Achse,
 * `badge` nimmt einen zusätzlichen Beleg auf (Kammer, Norm, Partner).
 */
export interface AboutStation {
  id: string;
  period: string;
  title: string;
  text: string;
  badge?: string;
  /**
   * Partner, der an dieser Station dazugekommen ist. Wird als Logo plus Name
   * unter dem Text gezeigt — ein Beleg, den man wiedererkennt, statt einer
   * weiteren Zeile Text.
   */
  partner?: {
    image: AboutImageData;
    label: string;
  };
  /**
   * Markiert eine Station, die noch nicht eingetreten ist. Die Zeitachse
   * zeichnet sie offen (hohler Punkt, gestrichelte Achse) statt ausgefüllt —
   * ein Vorhaben darf optisch nicht wie ein Beleg aussehen.
   */
  outlook?: boolean;
}

export interface AboutPerson {
  name: string;
  role: string;
  focus: string;
}

/**
 * Eine Zone des Einsatzgebiets. Die Reihenfolge im Array ist die Reihenfolge
 * der Ringe im Visual: Index 0 liegt innen.
 */
export interface AboutRegionZone {
  id: string;
  label: string;
  places: string[];
}

/** Leistungsbündel für eine Zielgruppe. */
export interface AboutServiceScope {
  id: string;
  label: string;
  items: string[];
}

export interface AboutPrinciple {
  id: string;
  /** lucide-react Icon-Name, aufgelöst über DynamicIcon. */
  icon: string;
  title: string;
  text: string;
}

export interface AboutPageData {
  hero: AboutSectionMeta & {
    figure: AboutFigureData;
    ctas: AboutCtaGroupData;
    facts: AboutFact[];
    /** Nachweis-Zeile im Faktenband (Handwerkskammer). */
    credential: {
      image: AboutImageData;
      title: string;
      detail: string;
    };
  };
  timeline: AboutSectionMeta & {
    /** Beschriftung der Achse, z. B. "2018 — 2026". */
    span: string;
    stations: AboutStation[];
    note: string;
  };
  leadership: AboutSectionMeta & {
    people: AboutPerson[];
    figure: AboutFigureData;
  };
  principles: AboutSectionMeta & {
    items: AboutPrinciple[];
  };
  region: AboutSectionMeta & {
    /** Mittelpunkt des Visuals. */
    center: string;
    zones: AboutRegionZone[];
    scopes: AboutServiceScope[];
  };
  partners: AboutSectionMeta;
  engagement: AboutSectionMeta & {
    body: string;
    figure?: AboutFigureData;
    note: string;
  };
  finalCta: AboutSectionMeta & {
    person: {
      name: string;
      role: string;
      image: AboutImageData;
    };
    ctas: AboutCtaGroupData;
  };
}
