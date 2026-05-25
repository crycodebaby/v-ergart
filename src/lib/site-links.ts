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
    immobilienverwaltung: "https://ergart-immobilienverwaltung.de/",
    hoeningCompany: "https://www.hoening.de/unternehmen/ueber-uns/",
  },
} as const;

export type SiteLinks = typeof SITE_LINKS;
