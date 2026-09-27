export const SITE_LINKS = {
  internal: {
    home: "/",
    ueberUns: "/ueber-uns",
    kontakt: "/kontakt",
    leistungen: "/leistungen",
    referenzen: "/referenzen",
    blog: "/blog",
  },
  external: {
    googleCalendarBooking: "https://calendar.app.google/ZYpM2cqo9omejSDR7",
    whatsappChat:
      "https://wa.me/4917666825889?text=Hallo%20Alexander%20Ergart%2C%20ich%20habe%20eine%20Anfrage%20%C3%BCber%20Ihre%20Website.",
    whatsappShareBase: "https://wa.me/",
    immobilienverwaltung: "https://ergart-immobilienverwaltung.de/",
    hoeningCompany: "https://www.hoening.de/unternehmen/ueber-uns/",
    /**
     * Hauptdomain. smairys-netz-manufaktur.de ist eine gueltige Zweitdomain,
     * verlinkt wird aber ueberall die primaere — eine Adresse, ein Eintrag.
     */
    smairys: "https://smairys.de/",
  },
} as const;

export type SiteLinks = typeof SITE_LINKS;

/**
 * Kontaktdaten des Betriebs – eine Quelle für Header, Mobile-Menü und Footer.
 * (Weitere Seiten tragen die Werte noch selbst; sie können nach und nach
 * hierauf umgestellt werden.)
 */
export const CONTACT = {
  phoneDisplay: "+49 176 668 25 889",
  phoneHref: "tel:+4917666825889",
  email: "info@ergart.de",
  emailHref: "mailto:info@ergart.de",
  /** Kurzform für Leisten und Menüs. */
  hoursShort: "Mo–Fr 8–12 & 13–16 Uhr",
  address: {
    street: "Further Str. 89B",
    city: "41462 Neuss",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Further+Str.+89B+41462+Neuss",
  },
} as const;

/* ------------------------------------------------------------------------
   Kampagnen-Parameter fuer Partner-Verlinkungen
   ------------------------------------------------------------------------ */

/**
 * Platzierung, von der aus ein Partner-Link geklickt wurde. Landet als
 * `utm_content` beim Partner und macht dort unterscheidbar, welche Stelle
 * unserer Seite den Klick gebracht hat.
 */
export type PartnerLinkPlacement =
  | "footer-partner"
  | "footer-credit"
  | "partnerkarte"
  | "partner-spotlight"
  | "partner-benefits"
  | "hoening-rechner";

/**
 * `rel` fuer Links auf Partner-, Sponsoren- und Kooperationsseiten.
 *
 * Bewusst OHNE `noreferrer`: der Partner soll sehen koennen, dass Besucher
 * von uns kommen. `noopener` bleibt und traegt den sicherheitsrelevanten
 * Teil — es verhindert, dass die Zielseite ueber `window.opener` auf unseren
 * Tab zugreift. `noreferrer` kommt sicherheitstechnisch nichts hinzu, es
 * loescht nur den Referrer-Header, und damit genau die Zuordnung, die wir
 * hier wollen.
 *
 * Preisgegeben wird dabei wenig: mit der Browser-Standard-Policy
 * `strict-origin-when-cross-origin` geht nur die Herkunfts-Domain mit
 * (https://alexander-ergart.de/), nicht die konkrete Unterseite.
 *
 * Diese Konstante ist die einzige Stelle, an der die Entscheidung steht.
 * Alle uebrigen externen Links der Seite — Social, Karten, Terminbuchung,
 * WhatsApp, Google-Richtlinien, Bewertungen — behalten bewusst das
 * strengere `noopener noreferrer`.
 */
export const PARTNER_LINK_REL = "noopener";

/**
 * Haengt Kampagnen-Parameter an eine Partner-URL.
 *
 * Warum ueberhaupt: alle externen Links tragen `rel="noopener noreferrer"`.
 * Das `noreferrer` loescht den Referrer-Header, der Partner sieht Besucher
 * von uns also als "Direkt" und kann den Zulauf nicht belegen. Wo wir das
 * `noreferrer` stehen lassen, sind diese Parameter der einzige Weg; wo wir
 * es entfernen, sind sie die genauere Variante, weil der Referrer nur die
 * Herkunfts-Domain nennt, nicht die Platzierung.
 *
 * Bewusst nur statische Werte: keine Klick-IDs, keine Hashes, keine
 * Nutzerkennung. Damit bleiben die Parameter frei von personenbezogenen
 * Daten und brauchen keine Einwilligung (vgl. ANALYTICS_DSGVO.md).
 *
 * Nebeneffekt auf unserer Seite: der PlausibleProvider laeuft mit
 * `trackOutboundLinks`. Die Ziel-URL steht damit inklusive Parameter im
 * Outbound-Event — wir koennen die Platzierungen also im eigenen Plausible
 * auseinanderhalten, ohne in fremde Zahlen sehen zu muessen.
 */
export function withPartnerUtm(
  url: string,
  placement: PartnerLinkPlacement
): string {
  try {
    const target = new URL(url);
    target.searchParams.set("utm_source", "alexander-ergart.de");
    target.searchParams.set("utm_medium", "referral");
    target.searchParams.set("utm_campaign", "partnerlink");
    target.searchParams.set("utm_content", placement);
    return target.toString();
  } catch {
    // Relative oder kaputte URL: unveraendert durchreichen. Ein fehlender
    // Kampagnen-Parameter ist ein Messverlust, ein geworfener Fehler waere
    // ein kaputter Build — die Funktion laeuft in Server-Komponenten.
    return url;
  }
}
