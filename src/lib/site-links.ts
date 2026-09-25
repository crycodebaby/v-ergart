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
