// src/lib/leistungen-data.ts
export type LeistungDetail = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  heroImage: string; // NEU: Ein starkes Titelbild für jede Leistung
  benefits: string[];
  galleryImages?: string[]; // NEU: Eine optionale Galerie zur Veranschaulichung
  faq?: { q: string; a: string }[];
};

export const LEISTUNGEN_DETAILS: readonly LeistungDetail[] = [
  {
    slug: "innenausbau",
    title: "Innenausbau & Renovierung",
    shortDesc: "Wir schaffen Räume mit Qualität und Charakter.",
    description:
      "Von der durchdachten Planung bis zum letzten Feinschliff realisieren wir Ihren kompletten Innenausbau. Ob Bodenverlegung, Trockenbau oder Malerarbeiten – wir garantieren saubere Abläufe, verlässliche Termine und den Einsatz hochwertiger Materialien für ein Ergebnis, das begeistert.",
    heroImage: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    benefits: [
      "Staubarme Umsetzung und besenreine Übergabe der Baustelle",
      "Termintreue und klare Kommunikation durch eine feste Bauleitung",
      "Professionelle Materialberatung passend zu Ihrer Nutzung und Ihrem Budget",
      "Ein fester Ansprechpartner für alle Gewerke",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/arbeitsschutz.webp",
      "/bilder_ordner/referenzen/neubau-wohnung-bodenverlegung-laminat-aus-deutscher-manufaktur-hochwertiger-laminatboden.webp",
    ],
    faq: [
      {
        q: "Wie schnell können die Arbeiten beginnen?",
        a: "Je nach Umfang planen wir mit 1–3 Wochen Vorlauf. Kleinere Renovierungen sind oft auch kurzfristiger möglich.",
      },
      {
        q: "Führen Sie auch nur einzelne Gewerke aus?",
        a: "Selbstverständlich. Wir übernehmen auf Wunsch auch nur die Bodenverlegung, Malerarbeiten oder den Trockenbau.",
      },
    ],
  },
  {
    slug: "gartenpflege",
    title: "Garten- & Landschaftspflege",
    shortDesc: "Wir verwandeln Ihren Garten in eine grüne Oase.",
    description:
      "Wir übernehmen die professionelle Pflege, Neu- und Umgestaltung Ihrer Grünflächen. Von Rasenschnitt über Hecken- und Baumpflege bis zur Konzeption von Beeten und Bewässerungssystemen – für private Gärten und gewerbliche Außenanlagen.",
    heroImage: "/bilder_ordner/leistungen/gartenpflege.webp",
    benefits: [
      "Planbare Pflegeintervalle für ein konstant gepflegtes Erscheinungsbild",
      "Saisonale Konzepte, die Ihren Garten im Frühjahr und Herbst optimal vorbereiten",
      "Nachhaltiger Werterhalt Ihrer Immobilie durch eine attraktive Außenanlage",
      "Fachgerechter Schnitt für gesunde und formschöne Pflanzen",
    ],
  },
  {
    slug: "hausmeister",
    title: "Hausmeisterdienste",
    shortDesc: "Der Rundum-Service für Ihre Immobilie.",
    description:
      "Verlassen Sie sich auf einen Partner, der sich kümmert, als wäre es sein eigenes Objekt. Wir führen regelmäßige Kontrollen durch, erledigen Kleinreparaturen, übernehmen den Winterdienst und koordinieren bei Bedarf weitere Handwerker.",
    heroImage: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    benefits: [
      "Ein zentraler und verlässlicher Ansprechpartner statt vieler verschiedener Kontakte",
      "Proaktive Erkennung von Mängeln zur Vermeidung größerer Schäden",
      "Lückenlose Dokumentation und schnelle Reaktionszeiten im Bedarfsfall",
      "Zuverlässiger Winterdienst für sichere Wege und Zufahrten",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/winterdienst.webp",
      "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    ],
  },
  {
    slug: "reinigung",
    title: "Gebäudereinigung",
    shortDesc: "Makellose Sauberkeit, die Eindruck hinterlässt.",
    description:
      "Wir sorgen für repräsentative Sauberkeit in privaten und gewerblichen Objekten. Unser geschultes Personal führt Unterhalts-, Glas- und Grundreinigungen nach höchsten Standards und mit professionellen Reinigungsmitteln durch.",
    heroImage: "/bilder_ordner/leistungen/objektreinigung.webp",
    benefits: [
      "Gleichbleibend hohe Qualität durch standardisierte Reinigungspläne und Checklisten",
      "Flexible Reinigungsintervalle, die sich Ihrem Bedarf anpassen",
      "Transparente Leistungsnachweise und regelmäßige Qualitätskontrollen",
      "Einsatz umweltschonender und materialspezifischer Reinigungsmittel",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/fensterreinigung.webp",
      "/bilder_ordner/leistungen/treppenreinigung.webp",
    ],
  },
  {
    slug: "sicherheit",
    title: "Sicherheitstechnik",
    shortDesc: "Moderne Schließsysteme und Einbruchschutz.",
    description:
      "Schützen Sie, was Ihnen wichtig ist. Wir beraten Sie zu moderner Sicherheitstechnik, beschaffen die passenden Komponenten und übernehmen die fachgerechte Montage von Schließsystemen, Schutzbeschlägen und smarten Sicherheitslösungen.",
    heroImage: "/bilder_ordner/leistungen/arbeitsschutz.webp",
    benefits: [
      "Individuelle Sicherheitsanalyse direkt bei Ihnen vor Ort",
      "Pragmatische und effektive Maßnahmen, die sich auch nachrüsten lassen",
      "Professioneller Einbau und verständliche Einweisung aus einer Hand",
      "Zugriff auf bewährte Produkte renommierter Hersteller",
    ],
  },
];
