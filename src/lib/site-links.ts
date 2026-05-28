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
