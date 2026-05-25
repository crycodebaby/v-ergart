import { ABOUT_ASSETS } from "./about-assets";
import type { AboutPageData } from "./types";
import { SITE_LINKS } from "@/lib/site-links";

export const ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    id: "hero",
    eyebrow: "Über uns",
    title: "Verlässliche Arbeit. Klare Prozesse. Langfristiger Werterhalt.",
    intro:
      "Wir betreuen Immobilien in Neuss und der Region für private Kunden, Eigentümergemeinschaften und gewerbliche Auftraggeber - strukturiert, verbindlich und mit handwerklichem Anspruch.",
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
      "Ordnung, Sortierung, Prozessdisziplin und Verlässlichkeit prägen unsere Arbeit bis heute.",
    paragraphs: [
      "Alexander Ergart arbeitete viele Jahre in logistikorientierten Abläufen und lernte dort, wie wichtig Struktur, Taktung und klare Verantwortlichkeiten sind.",
      "Noch vor der Familiengründung wuchs der Anspruch, nicht nur Aufgaben zu erledigen, sondern Qualität zuverlässig zu organisieren - vom ersten Kontakt bis zur sauberen Übergabe.",
      "So entstand in der Region Schritt für Schritt der Ruf als verlässlicher Hausmeister, Handwerker und Servicepartner.",
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
      "Alexander Ergart verantwortet Einsatzplanung, Ausführung und Servicequalität in der Praxis.",
      "Tanja Ergart stärkt Administration, Zahlen, Struktur und verlässliche interne Abläufe.",
      "Parallel zum Hausmeisterservice wurde mit Ergart Immobilienverwaltung ein weiterer professioneller Unternehmensbereich aufgebaut.",
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
          "Mit mehr als 13 Jahren Erfahrung in Hausmeisterservice, Logistik und handwerksnahen Dienstleistungen wurde das Unternehmen gegründet. Die Eintragung bei der Handwerkskammer Düsseldorf schuf ein belastbares Fundament für Qualität und Vertrauen.",
      },
      {
        id: "m-growth",
        year: "Folgejahre",
        title: "Verlässlicher regionaler Partner",
        body:
          "Der Betrieb entwickelte sich zur festen Größe in der Region - mit Objektpflege, Reparaturen, Gartenpflege, Tonnenservice, Treppenhausreinigung, Winterdienst und Fokus auf Werterhalt.",
      },
      {
        id: "m-2023",
        year: "2023",
        title: "Ausbau zum spezialisierten Fenster- und Türenservice",
        body:
          "Als Vater von drei Kindern entschied Alexander Ergart, den Betrieb weiter zu professionalisieren. Weiterbildungen und Zertifizierungen (u. a. TÜV, ift Rosenheim, DIN/EN 14351) stärkten die Grundlage für den spezialisierten Fensterservice.",
      },
      {
        id: "m-2025-2026",
        year: "2025/2026",
        title: "Partnerschaften mit HÖNING und Kilbinger",
        body:
          "Mit starken Partnern aus Produktion und Fachhandel wurde die Qualität in Beratung, Lieferung und Umsetzung weiter ausgebaut.",
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
    title: "Nicht der billigste Anbieter - bewusst",
    intro:
      "Unser Fokus liegt auf verlässlicher Ausführung, hochwertigen Materialien und langfristigem Werterhalt statt kurzfristiger Billiglösung.",
    principles: [
      {
        id: "q-reliability",
        title: "Verbindliche Umsetzung",
        body:
          "Feste Zusagen, klare Kommunikation und termingerechte Arbeit sind Teil unseres Qualitätsstandards.",
      },
      {
        id: "q-materials",
        title: "Sorgfältige Material- und Werkzeugwahl",
        body:
          "Wir arbeiten mit professionellen Standards und ausgewählten Herstellern, um dauerhafte Ergebnisse zu sichern.",
      },
      {
        id: "q-value",
        title: "Wertorientiertes Arbeiten",
        body:
          "Ziel ist nicht die schnelle Lösung, sondern ein Ergebnis, das Immobilien langfristig schützt und aufwertet.",
      },
    ],
    toolsNote:
      "Markennennungen wie Würth, Bosch, Hilti oder Makita erfolgen ausschließlich als sachliche Beispiele professioneller Werkzeugstandards.",
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
          "Als Partner eines deutschen Premium-Herstellers für Fenster und Haustüren bauen wir auf Qualität, Langlebigkeit und präzise Systemlösungen.",
        logo: ABOUT_ASSETS.hoeningLogo,
        href: SITE_LINKS.external.hoeningCompany,
        hrefLabel: "Mehr über HÖNING",
      },
      {
        id: "kilbinger",
        name: "Kilbinger Fachhandel & Service Neuss",
        body:
          "Als offizieller Partner von Kilbinger setzen wir auf lokale Qualität, verlässliche Lieferwege und erstklassige Materialien - direkt aus Neuss für unsere Kunden.",
        logo: ABOUT_ASSETS.kilbingerLogo,
      },
      {
        id: "immobilienverwaltung",
        name: "Ergart Immobilienverwaltung",
        body:
          "Mit einem eigenen Verwaltungsbereich ergänzen wir operative Leistung um strukturierte kaufmännische und organisatorische Kompetenz.",
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
      "Ein AE-System für Wartungsplanung, Erinnerungen und strukturierte Dokumentation ist als nächster Entwicklungsschritt vorgesehen.",
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
      "Wir unterstützen das Projekt \"Arbeitsbuch Radfahrausbildung / Kinder sicher im Straßenverkehr\" für die Verkehrswacht Rhein-Kreis Neuss e. V. und leisten damit einen regionalen Beitrag zur Verkehrssicherheit von Kindern.",
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
        body: "Klare Prozesse sorgen für Transparenz, Nachvollziehbarkeit und Ruhe in der Zusammenarbeit.",
      },
      {
        id: "v3",
        title: "Verantwortung",
        body: "Wir arbeiten so, dass Immobilien langfristig gepflegt, erhalten und sinnvoll weiterentwickelt werden.",
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
