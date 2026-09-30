// src/lib/leistungen-data.ts
export type LeistungDetail = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  heroImage: string;
  benefits: string[];
  galleryImages?: string[];
  faq?: { q: string; a: string }[];
  // SEO & Local Optimization
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  serviceArea: string[];
  detailedDescription: string;
};

const SERVICE_AREAS = [
  "Neuss",
  "Rhein-Kreis Neuss",
  "Kaarst",
  "Dormagen",
  "Düsseldorf",
  "Meerbusch",
  "Grevenbroich",
];

export const LEISTUNGEN_DETAILS: readonly LeistungDetail[] = [
  {
    slug: "hausmeister",
    title: "Hausmeisterdienste",
    shortDesc: "Zuverlässiger Hausmeisterservice in Neuss, alles aus einer Hand",
    description:
      "Verlassen Sie sich auf einen Partner, der sich kümmert, als wäre es sein eigenes Objekt. Wir führen regelmäßige Kontrollen durch, erledigen Kleinreparaturen, übernehmen den Winterdienst und koordinieren bei Bedarf weitere Handwerker im Rhein-Kreis Neuss.",
    detailedDescription:
      "Ob Wohnanlage in Neuss, Gewerbeobjekt in Kaarst oder Bürogebäude in Düsseldorf: Wir kümmern uns um Ihr Objekt und sind schnell vor Ort. Unser Team kennt die Anforderungen der unterschiedlichsten Gebäude im Rhein-Kreis Neuss.",
    heroImage: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    seoTitle: "Hausmeisterservice Neuss | Winterdienst, Kontrollen, Reparaturen",
    seoDescription:
      "Professioneller Hausmeisterdienst in Neuss, Kaarst & Düsseldorf. ✓ Objektbetreuung ✓ Winterdienst ✓ Kleinreparaturen ✓ Schnelle Reaktion. Jetzt anfragen!",
    keywords: [
      "Hausmeisterservice Neuss",
      "Hausmeister Rhein-Kreis Neuss",
      "Winterdienst Kaarst",
      "Objektbetreuung Dormagen",
      "Hausmeisterdienst Düsseldorf",
      "Immobilienservice Meerbusch",
      "Hausmeister Grevenbroich",
    ],
    serviceArea: SERVICE_AREAS,
    benefits: [
      "Ein zentraler und verlässlicher Ansprechpartner statt vieler verschiedener Kontakte",
      "Proaktive Erkennung von Mängeln zur Vermeidung größerer Schäden",
      "Lückenlose Dokumentation und schnelle Reaktionszeiten im Bedarfsfall",
      "Zuverlässiger Winterdienst für sichere Wege und Zufahrten",
      "Kurze Anfahrt, wir sind schnell vor Ort in Neuss und Umgebung",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/winterdienst.webp",
      "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    ],
    faq: [
      {
        q: "Wie schnell können Sie bei einem Notfall in Neuss vor Ort sein?",
        a: "Bei Notfällen streben wir innerhalb von 2 Stunden vor Ort zu sein. Reguläre Termine vereinbaren wir flexibel nach Ihrem Bedarf.",
      },
      {
        q: "Übernehmen Sie auch den Winterdienst in Kaarst und Dormagen?",
        a: "Ja, unser Winterdienst ist im gesamten Rhein-Kreis Neuss sowie in Düsseldorf, Meerbusch und Grevenbroich verfügbar.",
      },
    ],
  },
  {
    slug: "reinigung",
    title: "Gebäudereinigung",
    shortDesc: "Gebäudereinigung in Neuss, auf die Sie sich verlassen können",
    description:
      "Wir sorgen für repräsentative Sauberkeit in privaten und gewerblichen Objekten im Rhein-Kreis Neuss. Unser geschultes Personal führt Unterhalts-, Glas- und Grundreinigungen nach höchsten Standards und mit professionellen Reinigungsmitteln durch.",
    detailedDescription:
      "Bürogebäude in Düsseldorf, Arztpraxen in Kaarst, Privathaushalte in Neuss: Wir reinigen so, wie es Ihr Objekt braucht. Nachvollziehbar, zuverlässig und in geprüfter Qualität.",
    heroImage: "/bilder_ordner/leistungen/objektreinigung.webp",
    seoTitle: "Gebäudereinigung Neuss | Büroreinigung, Glasreinigung Rhein-Kreis",
    seoDescription:
      "Professionelle Gebäudereinigung in Neuss, Kaarst & Düsseldorf. ✓ Büroreinigung ✓ Glasreinigung ✓ Grundreinigung ✓ Flexibel. Kostenlos beraten lassen!",
    keywords: [
      "Gebäudereinigung Neuss",
      "Büroreinigung Rhein-Kreis Neuss",
      "Glasreinigung Kaarst",
      "Unterhaltsreinigung Dormagen",
      "Objektreinigung Düsseldorf",
      "Praxisreinigung Meerbusch",
      "Treppenhausreinigung Grevenbroich",
    ],
    serviceArea: SERVICE_AREAS,
    benefits: [
      "Gleichbleibend hohe Qualität durch standardisierte Reinigungspläne und Checklisten",
      "Flexible Reinigungsintervalle, die sich Ihrem Bedarf anpassen",
      "Transparente Leistungsnachweise und regelmäßige Qualitätskontrollen",
      "Einsatz umweltschonender und materialspezifischer Reinigungsmittel",
      "Geschultes Personal mit Erfahrung in verschiedensten Objekttypen",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/fensterreinigung.webp",
      "/bilder_ordner/leistungen/treppenreinigung.webp",
    ],
    faq: [
      {
        q: "Bieten Sie auch Glasreinigung in Düsseldorf an?",
        a: "Ja, unser Service umfasst auch professionelle Glasreinigung für Büros, Praxen und Privathaushalte in Düsseldorf, Neuss und dem gesamten Rhein-Kreis.",
      },
      {
        q: "Welche Reinigungsintervalle sind möglich?",
        a: "Sie bestimmen den Rhythmus: täglich, wöchentlich oder monatlich. Auch Sonderreinigungen nach Bedarf sind jederzeit möglich.",
      },
    ],
  },
  {
    slug: "gartenpflege",
    title: "Garten- & Landschaftspflege",
    shortDesc: "Gartenpflege in Neuss und Umgebung, das ganze Jahr",
    description:
      "Wir übernehmen die professionelle Pflege, Neu- und Umgestaltung Ihrer Grünflächen in Neuss und dem Rhein-Kreis. Von Rasenschnitt über Hecken- und Baumpflege bis zur Planung von Beeten und Bewässerung. Für private Gärten und gewerbliche Außenanlagen.",
    detailedDescription:
      "Ob Privatgarten in Kaarst oder Firmengelände in Dormagen: Unser Team hält Ihre Außenanlagen das ganze Jahr in Schuss. Wir kennen Böden und Wetter im Rhein-Kreis Neuss und pflegen Ihren Garten so, wie er es braucht.",
    heroImage: "/bilder_ordner/leistungen/gartenpflege.webp",
    seoTitle: "Gartenpflege Neuss | Rasen, Hecken, Landschaftspflege Rhein-Kreis",
    seoDescription:
      "Professionelle Gartenpflege in Neuss, Kaarst & Dormagen. ✓ Rasenpflege ✓ Heckenschnitt ✓ Baumpflege ✓ Ganzjährig. Kostenlose Beratung vor Ort!",
    keywords: [
      "Gartenpflege Neuss",
      "Landschaftspflege Rhein-Kreis Neuss",
      "Rasenpflege Kaarst",
      "Heckenschnitt Dormagen",
      "Baumpflege Düsseldorf",
      "Gartenpflege Meerbusch",
      "Grünpflege Grevenbroich",
    ],
    serviceArea: SERVICE_AREAS,
    benefits: [
      "Planbare Pflegeintervalle für ein konstant gepflegtes Erscheinungsbild",
      "Saisonale Konzepte, die Ihren Garten im Frühjahr und Herbst optimal vorbereiten",
      "Nachhaltiger Werterhalt Ihrer Immobilie durch eine attraktive Außenanlage",
      "Fachgerechter Schnitt für gesunde und formschöne Pflanzen",
      "Lokale Expertise über Böden und Klima im Rhein-Kreis Neuss",
    ],
    faq: [
      {
        q: "Bieten Sie Gartenpflege auch in Dormagen und Grevenbroich an?",
        a: "Ja, wir sind im gesamten Rhein-Kreis Neuss sowie in den angrenzenden Städten Dormagen, Grevenbroich, Düsseldorf und Meerbusch tätig.",
      },
      {
        q: "Welche Leistungen umfasst die Gartenpflege?",
        a: "Unser Service umfasst Rasenmähen, Heckenschnitt, Baumpflege, Unkrautentfernung, Laubbeseitigung, Beetpflege und auf Wunsch auch die Planung von Bewässerungssystemen.",
      },
    ],
  },
  {
    slug: "innenausbau",
    title: "Innenausbau & Renovierung",
    shortDesc: "Professionelle Renovierung und Innenausbau in Neuss und Umgebung",
    description:
      "Von der durchdachten Planung bis zum letzten Feinschliff realisieren wir Ihren kompletten Innenausbau in Neuss und der Region. Ob Boden, Trockenbau oder Malerarbeiten: Wir arbeiten sauber, halten Termine ein und verwenden gutes Material. Das sieht man am Ergebnis.",
    detailedDescription:
      "Unser erfahrenes Team übernimmt Ihre Renovierungs- und Innenausbauprojekte im gesamten Rhein-Kreis Neuss. Mit über 13 Jahren Erfahrung kennen wir die Anforderungen moderner Wohn- und Gewerberäume. Vom Altbau in der Neusser Innenstadt bis zum Neubau in Kaarst: Wir arbeiten genau, sauber und so, dass Sie zufrieden sind.",
    heroImage: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    seoTitle: "Innenausbau & Renovierung Neuss | Trockenbau, Böden, Malerarbeiten",
    seoDescription:
      "Professioneller Innenausbau in Neuss, Kaarst & Dormagen. ✓ Bodenverlegung ✓ Trockenbau ✓ Malerarbeiten ✓ 13+ Jahre Erfahrung. Jetzt kostenlos beraten lassen!",
    keywords: [
      "Innenausbau Neuss",
      "Renovierung Rhein-Kreis Neuss",
      "Trockenbau Kaarst",
      "Bodenverlegung Dormagen",
      "Malerarbeiten Düsseldorf",
      "Renovierung Meerbusch",
      "Innenausbau Grevenbroich",
    ],
    serviceArea: SERVICE_AREAS,
    benefits: [
      "Staubarme Umsetzung und besenreine Übergabe der Baustelle",
      "Termintreue und klare Kommunikation durch eine feste Bauleitung",
      "Professionelle Materialberatung passend zu Ihrer Nutzung und Ihrem Budget",
      "Ein fester Ansprechpartner für alle Gewerke im Rhein-Kreis Neuss",
      "Kurze Anfahrt, schnelle Reaktion in Neuss und Umgebung",
    ],
    galleryImages: [
      "/bilder_ordner/leistungen/arbeitsschutz.webp",
      "/bilder_ordner/referenzen/neubau-wohnung-bodenverlegung-laminat-aus-deutscher-manufaktur-hochwertiger-laminatboden.webp",
    ],
    faq: [
      {
        q: "Wie schnell können die Arbeiten in Neuss beginnen?",
        a: "Je nach Umfang planen wir mit 1–3 Wochen Vorlauf. Kleinere Renovierungen in Neuss und Kaarst sind oft auch kurzfristiger möglich. Kontaktieren Sie uns für eine individuelle Terminabsprache.",
      },
      {
        q: "Führen Sie auch nur einzelne Gewerke aus?",
        a: "Selbstverständlich. Wir übernehmen auf Wunsch auch nur die Bodenverlegung, Malerarbeiten oder den Trockenbau, ganz nach Ihrem Bedarf.",
      },
      {
        q: "Bedienen Sie auch Düsseldorf und Meerbusch?",
        a: "Ja, unser Einzugsgebiet umfasst den gesamten Rhein-Kreis Neuss sowie angrenzende Städte wie Düsseldorf, Meerbusch und Grevenbroich.",
      },
    ],
  },
];
