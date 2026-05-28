import { ABOUT_ASSETS } from "./about-assets";
import type { AboutPageData } from "./types";
import { SITE_LINKS } from "@/lib/site-links";

export const ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    id: "hero",
    eyebrow: "Über uns",
    title: "Verlässliche Arbeit. Klare Prozesse. Langfristiger Werterhalt.",
    intro:
      "Für private und gewerbliche Immobilien bieten wir verlässliche Betreuung mit klaren Abläufen, hochwertiger Ausführung und Fokus auf Werterhalt.",
    figure: ABOUT_ASSETS.hero,
    ctas: {
      primary: {
        label: "Kontakt aufnehmen",
        href: SITE_LINKS.internal.kontakt,
        kind: "internal",
      },
      secondary: {
        label: "Termin direkt buchen",
        href: SITE_LINKS.external.googleCalendarBooking,
        kind: "external",
        trackingId: "about-hero-calendar",
      },
      note: "Schnell erreichbar und unverbindlich.",
    },
  },
  origin: {
    id: "origin",
    eyebrow: "Herkunft",
    title: "Vom Logistikalltag zur strukturierten Dienstleistung",
    intro:
      "Ordnung, Prozessdisziplin und Verlässlichkeit prägen unseren Arbeitsstil bis heute.",
    paragraphs: [
      "Alexander Ergart sammelte über Jahre Erfahrung in logistischen und handwerksnahen Abläufen - mit Fokus auf Struktur, Taktung und Verantwortung.",
      "Noch vor der Familiengründung wuchs der Anspruch, Leistungen nicht nur auszuführen, sondern sauber zu organisieren: vom ersten Kontakt bis zur Übergabe.",
      "So entstand in der Region Schritt für Schritt ein verlässlicher Servicebetrieb.",
    ],
    figure: {
      ...ABOUT_ASSETS.origin,
      caption:
        "Klare Abläufe und saubere Umsetzung sind seit Beginn ein Kernprinzip.",
    },
  },
  leadership: {
    id: "leadership",
    eyebrow: "Führung & Organisation",
    title: "Alexander und Tanja Ergart bündeln operative und kaufmännische Stärke",
    paragraphs: [
      "Alexander Ergart verantwortet Einsatzplanung, Ausführung und Servicequalität vor Ort.",
      "Tanja Ergart steuert Administration, Zahlen und belastbare interne Abläufe.",
      "Neben dem Hausmeister- und Fensterservice wurde Ergart Immobilienverwaltung als eigener Bereich aufgebaut.",
    ],
    figure: {
      ...ABOUT_ASSETS.leadership,
      caption:
        "Operative Umsetzung und kaufmännische Struktur arbeiten Hand in Hand.",
    },
  },
  milestones: {
    id: "milestones",
    eyebrow: "Meilensteine",
    title: "Professionelles Wachstum mit klarer Ausrichtung",
    items: [
      {
        id: "m-2018",
        year: "2018",
        title: "Startschuss & Handwerkskammer-Eintragung",
        body:
          "Mit mehr als 13 Jahren Erfahrung wurde der Betrieb gegründet. Die Eintragung bei der Handwerkskammer Düsseldorf legte das Fundament für Qualität und Vertrauen.",
      },
      {
        id: "m-growth",
        year: "Folgejahre",
        title: "Verlässlicher regionaler Partner",
        body:
          "Der Betrieb entwickelte sich zur verlässlichen Größe in der Region: Objektpflege, Reparaturen, Treppenhausreinigung, Winterdienst und Werterhalt.",
      },
      {
        id: "m-2023",
        year: "2023",
        title: "Ausbau zum spezialisierten Fenster- und Türenservice",
        body:
          "Mit zusätzlicher Qualifizierung (u. a. TÜV, ift Rosenheim, DIN/EN 14351) wurde der spezialisierte Fenster- und Türenservice professionell ausgebaut.",
      },
      {
        id: "m-2025-2026",
        year: "2025/2026",
        title: "Partnerschaften mit HÖNING und Kilbinger",
        body:
          "Mit starken Partnern aus Produktion und Fachhandel wurden Beratung, Lieferung und Ausführung weiter professionalisiert.",
      },
    ],
  },
  regionScope: {
    id: "regionScope",
    eyebrow: "Einsatzgebiet & Leistungsspektrum",
    title: "Regional stark für private und gewerbliche Auftraggeber",
    regions: [
      "Neuss",
      "Kaarst",
      "Korschenbroich",
      "Meerbusch",
      "Jüchen",
      "Krefeld",
      "Duisburg",
      "Düsseldorf",
      "Köln",
      "Mönchengladbach",
      "Kreis Viersen",
      "Kreis Mettmann",
      "Rhein-Erft-Kreis",
      "Düren",
      "Heinsberg",
    ],
    b2cServices: [
      "Hausmeisterservice und Objektpflege",
      "Reparaturen und laufende Instandhaltung",
      "Fenster- und Türenservice",
      "Saisonale Pflege- und Winterdienstleistungen",
    ],
    b2bServices: [
      "Objektservice für Bestandshalter und Verwaltungen",
      "Planbare Wartungs- und Serviceroutinen",
      "Dokumentierbare Maßnahmen für Werterhalt",
      "Verlässliche Abstimmung mit Eigentümern und Dienstleistern",
    ],
  },
  quality: {
    id: "quality",
    eyebrow: "Qualitätsanspruch",
    title: "Qualität mit Weitblick",
    intro:
      "Unser Anspruch ist klar: verlässliche Ausführung, hochwertige Materialien und Lösungen, die den Wert Ihrer Immobilie langfristig sichern.",
    principles: [
      {
        id: "q-reliability",
        title: "Verlässlich von Anfang bis Abschluss",
        body:
          "Klare Zusagen, transparente Kommunikation und terminsichere Abläufe sorgen für Planbarkeit und Vertrauen.",
      },
      {
        id: "q-materials",
        title: "Materialien mit Substanz",
        body:
          "Wir setzen auf bewährte Qualität und professionelles Werkzeug, damit Ergebnisse dauerhaft funktionieren.",
      },
      {
        id: "q-value",
        title: "Werterhalt statt Kurzfristdenken",
        body:
          "Maßnahmen werden so geplant, dass Zustand und Wert Ihrer Immobilie über Jahre stabil bleiben.",
      },
    ],
  },
  partnerships: {
    id: "partnerships",
    eyebrow: "Partnerschaften",
    title: "Starke Partner für belastbare Qualität",
    partners: [
      {
        id: "hoening",
        name: "HÖNING",
        body:
          "Als Partner eines deutschen Premium-Herstellers setzen wir auf langlebige Fenster- und Haustürlösungen.",
        logo: ABOUT_ASSETS.hoeningLogo,
        href: SITE_LINKS.external.hoeningCompany,
        hrefLabel: "Mehr über HÖNING",
      },
      {
        id: "kilbinger",
        name: "Kilbinger Fachhandel & Service Neuss",
        body:
          "Als offizieller Partner von Kilbinger setzen wir auf lokale Qualität, verlässliche Lieferwege und erstklassige Materialien.",
        logo: ABOUT_ASSETS.kilbingerLogo,
      },
      {
        id: "immobilienverwaltung",
        name: "Ergart Immobilienverwaltung",
        body:
          "Der eigene Verwaltungsbereich ergänzt operative Leistung um strukturierte kaufmännische Kompetenz.",
        logo: ABOUT_ASSETS.immobilienverwaltungLogo,
        href: SITE_LINKS.external.immobilienverwaltung,
        hrefLabel: "Zur Immobilienverwaltung",
      },
    ],
  },
  future: {
    id: "future",
    eyebrow: "Ausblick 2026+",
    title: "Digitale Weiterentwicklung der Ergart-Unternehmen",
    paragraphs: [
      "Hausmeisterservice, Fensterservice und Immobilienverwaltung werden digital enger verzahnt.",
      "Ein AE-System für Wartungsplanung, Erinnerungen und Dokumentation ist als nächster Entwicklungsschritt vorgesehen.",
      "Perspektivisch werden QR-bezogene Elementinformationen für Wartung und Nachverfolgung geprüft.",
    ],
    disclaimer:
      "Wichtiger Hinweis: Die genannten digitalen Funktionen sind Zukunftskonzepte bzw. in Planung und derzeit nicht vollständig als Produkt ausgerollt.",
  },
  socialEngagement: {
    id: "socialEngagement",
    eyebrow: "Regionales Engagement",
    title: "Kinder sicher im Straßenverkehr",
    body:
      "Wir unterstützen das Projekt \"Arbeitsbuch Radfahrausbildung / Kinder sicher im Straßenverkehr\" der Verkehrswacht Rhein-Kreis Neuss e. V. und stärken damit die Verkehrssicherheit von Kindern in der Region.",
    legalNote:
      "Dieses Engagement ist ein gesellschaftlicher Beitrag und kein Kundenreferenzprojekt.",
    imageTodo: ABOUT_ASSETS.socialEngagementImageTodo,
    ...(ABOUT_ASSETS.socialEngagement
      ? {
          figure: {
            ...ABOUT_ASSETS.socialEngagement,
            caption:
              "Unterstützung des Projekts \"Arbeitsbuch Radfahrausbildung / Kinder sicher im Straßenverkehr\".",
            credit: "Bildnachweis: K&L Verlag",
          },
        }
      : {}),
  },
  values: {
    id: "values",
    eyebrow: "Werte",
    title: "Worauf Sie sich verlassen können",
    principles: [
      {
        id: "v1",
        title: "Zuverlässigkeit",
        body: "Zusagen, die eingehalten werden - vom Termin bis zur Ausführung.",
      },
      {
        id: "v2",
        title: "Struktur",
        body: "Klare Prozesse sorgen für Transparenz und planbare Zusammenarbeit.",
      },
      {
        id: "v3",
        title: "Verantwortung",
        body: "Wir arbeiten so, dass Immobilien langfristig gepflegt und erhalten bleiben.",
      },
    ],
  },
  finalCta: {
    id: "finalCta",
    eyebrow: "Nächster Schritt",
    title: "Lassen Sie uns über Ihr Objekt sprechen",
    ctas: {
      text: "Wir beraten Sie persönlich und verbindlich - für private sowie gewerbliche Immobilien.",
      primary: {
        label: "Jetzt Kontakt aufnehmen",
        href: SITE_LINKS.internal.kontakt,
        kind: "internal",
      },
      secondary: {
        label: "Termin direkt buchen",
        href: SITE_LINKS.external.googleCalendarBooking,
        kind: "external",
        trackingId: "about-final-calendar",
      },
    },
  },
};
