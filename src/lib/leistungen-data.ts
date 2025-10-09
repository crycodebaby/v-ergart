// src/lib/leistungen-data.ts
export type LeistungDetail = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  faq?: { q: string; a: string }[];
};

export const LEISTUNGEN_DETAILS: readonly LeistungDetail[] = [
  {
    slug: "innenausbau",
    title: "Innenausbau & Renovierung",
    shortDesc: "Boden, Trockenbau, Maler – neue Räume mit Qualität.",
    description:
      "Wir planen und realisieren Ihren Innenausbau aus einer Hand: Bodenverlegung, Trockenbau, Malerarbeiten und Feinschliff. Saubere Abläufe, verlässliche Termine und hochwertige Materialien.",
    benefits: [
      "Staubarme Umsetzung & saubere Übergaben",
      "Terminsicher – mit klarer Bauleitung",
      "Materialberatung passend zu Nutzung & Budget",
    ],
    faq: [
      {
        q: "Wie schnell können wir starten?",
        a: "Je nach Umfang 1–3 Wochen Vorlauf. Kleinere Renovierungen oft früher.",
      },
      {
        q: "Bieten Sie auch Teilgewerke an?",
        a: "Ja. Wir übernehmen auf Wunsch nur Boden, Maler oder Trockenbau.",
      },
    ],
  },
  {
    slug: "gartenpflege",
    title: "Garten- & Landschaftspflege",
    shortDesc: "Von Neuanlage bis Pflege – grüne Oasen.",
    description:
      "Pflege, Neu- und Umgestaltung von Grünflächen: Rasenschnitt, Hecken- und Baumpflege, Beete, Bewässerung und saisonale Dienste. Privat & gewerblich.",
    benefits: [
      "Planbare Pflegeintervalle",
      "Saisonale Konzepte (Frühjahr/Herbst)",
      "Werterhalt für Immobilien & Außenflächen",
    ],
  },
  {
    slug: "hausmeister",
    title: "Hausmeisterdienste",
    shortDesc: "Rundum-Service für Ihre Immobilie.",
    description:
      "Regelmäßige Objektkontrollen, Kleinreparaturen, Winterdienst und Koordination von Handwerkern – wir kümmern uns, als wäre es unser eigenes Objekt.",
    benefits: [
      "Ein Ansprechpartner statt vieler",
      "Proaktive Mängelerkennung",
      "Dokumentation & kurze Reaktionszeiten",
    ],
  },
  {
    slug: "reinigung",
    title: "Gebäudereinigung",
    shortDesc: "Makellose Sauberkeit – privat & gewerblich.",
    description:
      "Unterhalts-, Glas- und Grundreinigung mit geschultem Personal, passenden Reinigungsmitteln und QS-Checklisten.",
    benefits: [
      "Konstante Qualität mit Checklisten",
      "Flexible Intervalle",
      "Transparente Protokolle",
    ],
  },
  {
    slug: "sicherheit",
    title: "Sicherheitstechnik",
    shortDesc: "Schließsysteme & Einbruchschutz.",
    description:
      "Beratung, Beschaffung und Montage moderner Sicherheitstechnik: Schließsysteme, Schutzbeschläge, Zusatzsicherungen und smarte Lösungen.",
    benefits: [
      "Analyse vor Ort",
      "Pragmatische, nachrüstbare Maßnahmen",
      "Einbau & Einweisung aus einer Hand",
    ],
  },
];
