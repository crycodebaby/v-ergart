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
    slug: "innenausbau",
    title: "Innenausbau & Renovierung",
    shortDesc: "Professionelle Renovierung und Innenausbau in Neuss und Umgebung",
    description:
      "Von der durchdachten Planung bis zum letzten Feinschliff realisieren wir Ihren kompletten Innenausbau in Neuss und der Region. Ob Bodenverlegung, Trockenbau oder Malerarbeiten – wir garantieren saubere Abläufe, verlässliche Termine und den Einsatz hochwertiger Materialien für ein Ergebnis, das begeistert.",
    detailedDescription:
      "Unser erfahrenes Team übernimmt Ihre Renovierungs- und Innenausbauprojekte im gesamten Rhein-Kreis Neuss. Mit über 15 Jahren Erfahrung kennen wir die Anforderungen moderner Wohn- und Gewerberäume. Von Altbauten in Neuss-Innenstadt bis zu Neubauten in Kaarst – wir setzen auf Qualität, Präzision und Kundenzufriedenheit.",
    heroImage: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    seoTitle: "Innenausbau & Renovierung Neuss | Trockenbau, Böden, Malerarbeiten",
    seoDescription:
      "Professioneller Innenausbau in Neuss, Kaarst & Dormagen. ✓ Bodenverlegung ✓ Trockenbau ✓ Malerarbeiten ✓ 15+ Jahre Erfahrung. Jetzt kostenlos beraten lassen!",
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
      "Kurze Anfahrtswege – schnelle Reaktionszeiten in Neuss und Umgebung",
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
        a: "Selbstverständlich. Wir übernehmen auf Wunsch auch nur die Bodenverlegung, Malerarbeiten oder den Trockenbau – ganz nach Ihrem Bedarf.",
      },
      {
        q: "Bedienen Sie auch Düsseldorf und Meerbusch?",
        a: "Ja, unser Einzugsgebiet umfasst den gesamten Rhein-Kreis Neuss sowie angrenzende Städte wie Düsseldorf, Meerbusch und Grevenbroich.",
      },
    ],
  },
  {
    slug: "gartenpflege",
    title: "Garten- & Landschaftspflege",
    shortDesc: "Professionelle Gartenpflege in Neuss und Umgebung – Ihr grüner Partner",
    description:
      "Wir übernehmen die professionelle Pflege, Neu- und Umgestaltung Ihrer Grünflächen in Neuss und dem Rhein-Kreis. Von Rasenschnitt über Hecken- und Baumpflege bis zur Konzeption von Beeten und Bewässerungssystemen – für private Gärten und gewerbliche Außenanlagen.",
    detailedDescription:
      "Ob Privatgarten in Kaarst oder Gewerbeimmobilie in Dormagen – unser Team sorgt für gepflegte Außenanlagen das ganze Jahr über. Mit lokalem Know-how über Böden und Klima im Rhein-Kreis Neuss garantieren wir optimale Pflege für Ihren Garten.",
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
    slug: "hausmeister",
    title: "Hausmeisterdienste",
    shortDesc: "Zuverlässiger Hausmeisterservice in Neuss – Ihr Rundum-Sorglos-Paket",
    description:
      "Verlassen Sie sich auf einen Partner, der sich kümmert, als wäre es sein eigenes Objekt. Wir führen regelmäßige Kontrollen durch, erledigen Kleinreparaturen, übernehmen den Winterdienst und koordinieren bei Bedarf weitere Handwerker im Rhein-Kreis Neuss.",
    detailedDescription:
      "Ob Wohnanlage in Neuss, Gewerbeimmobilie in Kaarst oder Bürogebäude in Düsseldorf – wir bieten umfassende Hausmeisterdienste mit kurzen Reaktionszeiten. Unser Team ist vertraut mit den Anforderungen verschiedenster Objekttypen im Rhein-Kreis Neuss.",
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
      "Kurze Anfahrtswege – wir sind schnell vor Ort in Neuss und Umgebung",
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
    shortDesc: "Professionelle Gebäudereinigung in Neuss – Sauberkeit, die überzeugt",
    description:
      "Wir sorgen für repräsentative Sauberkeit in privaten und gewerblichen Objekten im Rhein-Kreis Neuss. Unser geschultes Personal führt Unterhalts-, Glas- und Grundreinigungen nach höchsten Standards und mit professionellen Reinigungsmitteln durch.",
    detailedDescription:
      "Von Bürogebäuden in Düsseldorf über Arztpraxen in Kaarst bis zu Privathaushalten in Neuss – wir bieten maßgeschneiderte Reinigungslösungen. Transparent, zuverlässig und mit nachweisbarer Qualität.",
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
        a: "Wir bieten flexible Intervalle – von täglich über wöchentlich bis monatlich. Auch Sonderreinigungen nach Bedarf sind jederzeit möglich.",
      },
    ],
  },
  {
    slug: "sicherheit",
    title: "Sicherheitstechnik",
    shortDesc: "Moderne Sicherheitstechnik in Neuss – Schutz für Ihr Zuhause",
    description:
      "Schützen Sie, was Ihnen wichtig ist. Wir beraten Sie zu moderner Sicherheitstechnik im Rhein-Kreis Neuss, beschaffen die passenden Komponenten und übernehmen die fachgerechte Montage von Schließsystemen, Schutzbeschlägen und smarten Sicherheitslösungen.",
    detailedDescription:
      "Ob Einfamilienhaus in Kaarst, Gewerbeobjekt in Dormagen oder Mehrfamilienhaus in Neuss – wir entwickeln individuelle Sicherheitskonzepte. Mit hochwertigen Produkten und fachgerechter Installation sorgen wir für Ihren Schutz.",
    heroImage: "/bilder_ordner/leistungen/arbeitsschutz.webp",
    seoTitle: "Sicherheitstechnik Neuss | Einbruchschutz, Schließsysteme Rhein-Kreis",
    seoDescription:
      "Professionelle Sicherheitstechnik in Neuss, Kaarst & Dormagen. ✓ Einbruchschutz ✓ Moderne Schließsysteme ✓ Smart Locks ✓ Beratung vor Ort. Jetzt anfragen!",
    keywords: [
      "Sicherheitstechnik Neuss",
      "Einbruchschutz Rhein-Kreis Neuss",
      "Schließsysteme Kaarst",
      "Einbruchschutz Dormagen",
      "Smart Lock Düsseldorf",
      "Sicherheitstechnik Meerbusch",
      "Alarmanlagen Grevenbroich",
    ],
    serviceArea: SERVICE_AREAS,
    benefits: [
      "Individuelle Sicherheitsanalyse direkt bei Ihnen vor Ort",
      "Pragmatische und effektive Maßnahmen, die sich auch nachrüsten lassen",
      "Professioneller Einbau und verständliche Einweisung aus einer Hand",
      "Zugriff auf bewährte Produkte renommierter Hersteller",
      "Persönliche Beratung mit Erfahrung aus über 15 Jahren im Rhein-Kreis Neuss",
    ],
    faq: [
      {
        q: "Welche Sicherheitslösungen empfehlen Sie für Einfamilienhäuser in Neuss?",
        a: "Wir empfehlen eine Kombination aus mechanischem Einbruchschutz (Sicherheitsbeschläge, abschließbare Fenstergriffe) und smarten Lösungen (Alarmsystem, Videoüberwachung). Bei einer kostenlosen Vor-Ort-Beratung zeigen wir Ihnen die optimalen Maßnahmen.",
      },
      {
        q: "Bedienen Sie auch Gewerbeobjekte in Düsseldorf?",
        a: "Ja, wir bieten Sicherheitslösungen für Privat- und Gewerbeimmobilien in Neuss, Düsseldorf und dem gesamten Rhein-Kreis Neuss.",
      },
    ],
  },
];
