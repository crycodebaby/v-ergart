// src/lib/about/about-page-data.ts
/**
 * Inhalt der Über-uns-Seite.
 *
 * Erzählauftrag: acht Jahre Betrieb in Neuss, so kurz wie möglich. Jede
 * Station der Zeitachse ist ein Satz Aussage plus ein Satz Beleg; alles, was
 * die Seite nur wiederholt hätte, ist gestrichen. Die Reihenfolge folgt dem
 * Lesebedürfnis: Wer ist das → wie lange schon → wer entscheidet → wonach
 * gearbeitet wird → wo → mit wem → nächster Schritt.
 */
import { ABOUT_ASSETS } from "./about-assets";
import type { AboutPageData, AboutStation } from "./types";
import { CONTACT, SITE_LINKS } from "@/lib/site-links";

/** Eintragung bei der Handwerkskammer Düsseldorf, März 2018. */
export const FOUNDING_YEAR = 2018;

/**
 * Betriebsjahre, aus dem Gründungsjahr abgeleitet statt als Zahl gepflegt.
 * Die Seite ist statisch, der Wert wird also zum Build-Zeitpunkt festgelegt —
 * das ist gewollt: jeder Deploy bringt ihn mit, niemand muss ihn nachziehen.
 */
export function getYearsActive(now: Date = new Date()): number {
  return Math.max(1, now.getFullYear() - FOUNDING_YEAR);
}

const YEARS_ACTIVE = getYearsActive();

/** Grundzahlwörter für die Schrittzahl der Zeitachse. */
const COUNT_WORDS = [
  "null",
  "einem",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
] as const;

function countWord(count: number): string {
  return COUNT_WORDS[count] ?? String(count);
}

const TIMELINE_STATIONS: AboutStation[] = [
  {
    id: "s-2018",
    period: "2018",
    title: "Gründung in Neuss",
    text:
      "Alexander Ergart macht nach über 13 Jahren in logistik- und handwerksnahen Abläufen den eigenen Betrieb auf.",
    badge: "HWK Düsseldorf",
  },
  {
    id: "s-2019",
    period: "2019 – 2022",
    title: "Fester Teil der Region",
    text:
      "Objektpflege, Reparaturen, Treppenhausreinigung und Winterdienst — für private Eigentümer wie für Verwaltungen.",
  },
  {
    id: "s-2023",
    period: "2023",
    title: "Eigener Fenster- und Türenservice",
    text:
      "Zusätzliche Qualifizierung macht Fenster und Türen zum zweiten Standbein: Beratung, Montage, Wartung.",
    badge: "TÜV · ift Rosenheim · DIN EN 14351",
  },
  {
    id: "s-2024",
    period: "2024",
    title: "Abläufe digitalisiert",
    text:
      "Mit der Smairys Netz-Manufaktur als IT- und Digitalisierungspartner modernisieren wir die internen Prozesse — für klare Kommunikation im Team und mit Kunden. Ein langer Weg, der bis heute weitergeht.",
    partner: {
      image: ABOUT_ASSETS.smairys,
      label: "Smairys Netz-Manufaktur",
    },
  },
  {
    id: "s-2025",
    period: "2025 / 2026",
    title: "Starke Partner im Rücken",
    text:
      "Mit HÖNING und Kilbinger stehen Produktion und Fachhandel hinter Beratung, Lieferung und Ausführung.",
  },
  {
    id: "s-next",
    period: "Ausblick",
    title: "Wartung digital planbar",
    text:
      "Wartungspläne, Erinnerungen und Dokumentation sollen künftig an einer Stelle zusammenlaufen.",
    outlook: true,
  },
];

export const ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    id: "hero",
    eyebrow: "Über uns",
    title: "Seit 2018 in Neuss. Für Immobilien, die in Ordnung bleiben.",
    lede:
      "Hausmeisterservice und Fenster- und Türenservice aus einem Betrieb — mit festen Ansprechpartnern und Abläufen, die man nachvollziehen kann.",
    figure: {
      ...ABOUT_ASSETS.hero,
      caption: "Zentrale · Further Str. 89B, Neuss",
    },
    ctas: {
      primary: {
        label: "Kontakt aufnehmen",
        href: SITE_LINKS.internal.kontakt,
        kind: "internal",
        trackingId: "about-hero-kontakt",
      },
      secondary: {
        label: "Termin direkt buchen",
        href: SITE_LINKS.external.googleCalendarBooking,
        kind: "external",
        trackingId: "about-hero-calendar",
      },
      note: `Rückmeldung in der Regel am selben Werktag · ${CONTACT.hoursShort}`,
    },
    facts: [
      { value: `${YEARS_ACTIVE} Jahre`, label: `im Einsatz, seit ${FOUNDING_YEAR}` },
      { value: "2 Bereiche", label: "Hausmeisterservice, Fenster- und Türenservice" },
      { value: "15", label: "Städte und Kreise im Einsatzgebiet" },
    ],
    credential: {
      image: ABOUT_ASSETS.handwerkskammer,
      title: "Eingetragener Handwerksbetrieb",
      detail: "Handwerkskammer Düsseldorf, seit März 2018",
    },
  },

  timeline: {
    id: "timeline",
    eyebrow: "Werdegang",
    // Die Schrittzahl wird gezaehlt, nicht gepflegt: beim Nachtragen einer
    // Station stand sonst "in fünf Schritten" ueber sechs Punkten.
    title: `${YEARS_ACTIVE} Jahre Neuss, in ${countWord(TIMELINE_STATIONS.length)} Schritten`,
    lede:
      "Gewachsen ist der Betrieb nicht in Sprüngen, sondern entlang dessen, was Kunden gebraucht haben.",
    span: `${FOUNDING_YEAR} — ${FOUNDING_YEAR + YEARS_ACTIVE}`,
    stations: TIMELINE_STATIONS,
    note:
      "Der Ausblick beschreibt ein Vorhaben in Planung, kein fertiges Produkt.",
  },

  leadership: {
    id: "leadership",
    eyebrow: "Verantwortung",
    title: "Zwei Ansprechpartner, klar getrennte Zuständigkeiten",
    lede:
      "Wer anruft, landet nicht in einer Warteschleife, sondern bei der Person, die entscheidet.",
    people: [
      {
        name: "Alexander Ergart",
        role: "Inhaber, operative Leitung",
        focus: "Einsatzplanung, Ausführung und Servicequalität vor Ort.",
      },
      {
        name: "Tatjana Ergart",
        role: "Kaufmännische Leitung",
        focus: "Administration, Zahlen und interne Abläufe.",
      },
    ],
    figure: {
      ...ABOUT_ASSETS.leadership,
      caption: "Das Team, das die Aufträge vor Ort ausführt.",
    },
  },

  principles: {
    id: "principles",
    eyebrow: "Arbeitsweise",
    title: "Worauf Sie sich verlassen können",
    items: [
      {
        id: "p-reliability",
        icon: "CalendarCheck",
        title: "Termine halten",
        text:
          "Zugesagte Termine stehen. Verschiebt sich etwas, erfahren Sie es vorher und nicht danach.",
      },
      {
        id: "p-transparency",
        icon: "FileText",
        title: "Nachvollziehbar dokumentiert",
        text:
          "Was gemacht wurde, ist belegt — für Eigentümer, Verwaltungen und die eigene Wartungsplanung.",
      },
      {
        id: "p-materials",
        icon: "Wrench",
        title: "Material mit Substanz",
        text:
          "Bewährte Qualität und Profi-Werkzeug, damit eine Reparatur nicht nach einem Jahr wiederkommt.",
      },
      {
        id: "p-value",
        icon: "TrendingUp",
        title: "Werterhalt vor Schnelllösung",
        text:
          "Maßnahmen werden so geplant, dass Zustand und Wert der Immobilie über Jahre stabil bleiben.",
      },
    ],
  },

  region: {
    id: "region",
    eyebrow: "Einsatzgebiet",
    title: "Von Neuss aus, mit kurzen Wegen",
    lede:
      "Je näher am Kern, desto kurzfristiger sind wir da. Außerhalb arbeiten wir mit fest geplanten Terminen.",
    center: "Neuss",
    zones: [
      {
        id: "z-core",
        label: "Kernzone",
        places: ["Neuss", "Kaarst", "Korschenbroich", "Meerbusch", "Düsseldorf"],
      },
      {
        id: "z-near",
        label: "Rhein-Kreis und Nachbarstädte",
        places: [
          "Jüchen",
          "Mönchengladbach",
          "Krefeld",
          "Duisburg",
          "Köln",
          "Kreis Mettmann",
        ],
      },
      {
        id: "z-wide",
        label: "Nach Absprache",
        places: ["Kreis Viersen", "Rhein-Erft-Kreis", "Düren", "Heinsberg"],
      },
    ],
    scopes: [
      {
        id: "sc-private",
        label: "Für private Eigentümer",
        items: [
          "Hausmeisterservice und Objektpflege",
          "Reparaturen und laufende Instandhaltung",
          "Fenster- und Türenservice",
          "Saisonale Pflege und Winterdienst",
        ],
      },
      {
        id: "sc-business",
        label: "Für Gewerbe und Verwaltung",
        items: [
          "Objektservice für Bestandshalter",
          "Planbare Wartungs- und Serviceroutinen",
          "Dokumentierte Maßnahmen für den Werterhalt",
          "Abstimmung mit Eigentümern und Dienstleistern",
        ],
      },
    ],
  },

  partners: {
    id: "partners",
    eyebrow: "Partner",
    title: "Wer hinter der Ausführung steht",
    lede:
      "Produktion, Fachhandel und Prüfstellen, mit denen wir dauerhaft zusammenarbeiten.",
  },

  engagement: {
    id: "engagement",
    eyebrow: "Regional",
    title: "Kinder sicher im Straßenverkehr",
    body:
      "Wir unterstützen das Arbeitsbuch zur Radfahrausbildung der Verkehrswacht Rhein-Kreis Neuss e. V.",
    note: "Ein gesellschaftlicher Beitrag, kein Kundenprojekt. Bildnachweis: K&L Verlag.",
    ...(ABOUT_ASSETS.socialEngagement
      ? { figure: { ...ABOUT_ASSETS.socialEngagement } }
      : {}),
  },

  finalCta: {
    id: "finalCta",
    eyebrow: "Nächster Schritt",
    title: "Sprechen wir über Ihr Objekt",
    lede:
      "Ein Anruf reicht, um zu klären, ob wir passen. Beratung für private und gewerbliche Immobilien.",
    person: {
      name: "Alexander Ergart",
      role: "Inhaber und Geschäftsführer",
      image: ABOUT_ASSETS.owner,
    },
    ctas: {
      primary: {
        label: "Jetzt Kontakt aufnehmen",
        href: SITE_LINKS.internal.kontakt,
        kind: "internal",
        trackingId: "about-final-kontakt",
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
