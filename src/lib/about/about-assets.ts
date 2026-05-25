import type { AboutImageData } from "./types";

type AboutAssetCatalog = {
  hero: AboutImageData;
  origin: AboutImageData;
  leadership: AboutImageData;
  windowService: AboutImageData;
  hoeningLogo: AboutImageData;
  kilbingerLogo: AboutImageData;
  immobilienverwaltungLogo: AboutImageData;
  socialEngagement: AboutImageData | null;
  socialEngagementImageTodo: string;
};

export const ABOUT_ASSETS: AboutAssetCatalog = {
  hero: {
    src: "/bilder_ordner/ueberuns/firmenzentrale-weitaufnahme.webp",
    alt: "Firmenzentrale von Alexander Ergart in Neuss",
    width: 1600,
    height: 1000,
    sizes: "100vw",
    priority: true,
  },
  origin: {
    src: "/bilder_ordner/ueberuns/kran.webp",
    alt: "Einsatz mit strukturierter Logistik und präziser Planung",
    width: 1200,
    height: 800,
    sizes: "(max-width: 1024px) 100vw, 50vw",
  },
  leadership: {
    src: "/bilder_ordner/kontakt/team_ergart.webp",
    alt: "Alexander und Tanja Ergart mit klarem Fokus auf Service und Struktur",
    width: 800,
    height: 1200,
    sizes: "(max-width: 1024px) 100vw, 50vw",
  },
  windowService: {
    src: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
    alt: "Professionell umgesetzter Fensterservice in Neuss",
    width: 1400,
    height: 900,
    sizes: "(max-width: 1024px) 100vw, 50vw",
  },
  hoeningLogo: {
    src: "/bilder_ordner/hoening/hoening.png",
    alt: "HÖNING Logo",
    width: 180,
    height: 40,
  },
  kilbingerLogo: {
    src: "/bilder_ordner/coop/Kilbinger-Logo.jpg",
    alt: "Kilbinger Fachhandel & Service Neuss Logo",
    width: 180,
    height: 80,
  },
  immobilienverwaltungLogo: {
    src: "/bilder_ordner/coop/Ergart-Immobilienverwaltung-Neuss-Logo.png",
    alt: "Ergart Immobilienverwaltung Neuss Logo",
    width: 260,
    height: 80,
  },
  // TODO(about-social-image): Add optimized social engagement image and replace null.
  socialEngagement: null,
  socialEngagementImageTodo:
    "/bilder_ordner/soziales-engagement/verkehrswacht-kinder-sicher-collage.webp",
};
