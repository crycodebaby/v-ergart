// src/lib/ueber-uns-data.ts
export const ueberUnsHeroImage =
  "/bilder_ordner/ueberuns/firmenzentrale-weitaufnahme.webp";

export const ueberUnsMilestones = [
  {
    year: "2018",
    title: "Die Gründung: Eine Vision wird geboren",
    text: "Mit einer Leidenschaft für präzises Handwerk und dem Wunsch, einen wirklich zuverlässigen Service in Neuss zu etablieren, gründete Alexander Ergart das Unternehmen. Die Mission: Werte wie Vertrauen und Qualität neu zu definieren.",
    image: "/bilder_ordner/ueberuns/kran.webp",
    align: "left" as const,
  },
  {
    year: "2021",
    title: "Wachstum und Vertrauen in der Region",
    text: "Dank unzähliger erfolgreicher Projekte und dem wachsenden Vertrauen der Gemeinschaft konnte das Team erweitert werden. Wir wurden zu einer festen Größe für private und gewerbliche Kunden in der Region.",
    image: "/bilder_ordner/referenzen/der-hausmeister-profi-bauarbeiten.webp", // Ein besseres Bild für Wachstum
    align: "right" as const,
  },
  {
    year: "2023", // Konkretes Jahr statt "Heute"
    title: "Vertiefung der Expertise",
    text: "Wir haben unser Know-how gezielt ausgebaut und uns auf komplexe Sanierungen sowie hochwertige Fenster- und Türenlösungen spezialisiert, um den steigenden Ansprüchen an Energieeffizienz und Design gerecht zu werden.",
    image: "/bilder_ordner/ueberuns/fensterbau-werkstatt.webp",
    align: "left" as const,
  },
  // ==================================================================
  // NEUER MEILENSTEIN: Die Höning-Partnerschaft
  // ==================================================================
  {
    year: "2025",
    title: "Partnerschaft für die Zukunft: Offizieller HÖNING Partnerbetrieb",
    text: "Ein entscheidender Schritt nach vorn: Als zertifizierter Partner der Premium-Manufaktur HÖNING können wir unseren Kunden nun Fenster- und Türenlösungen auf höchstem Niveau anbieten. Ein Gewinn für uns und vor allem für die Wohnqualität der Menschen in Neuss.",
    image:
      "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung2.webp", // Ein Bild aus der Ausstellung
    align: "right" as const,
  },
] as const;

// 3) Werte – auch hier später leicht ergänzbar
export const ueberUnsValues = [
  {
    icon: "ShieldCheck",
    title: "Zuverlässigkeit",
    text: "Termine, die wir einhalten. Ergebnisse, die überzeugen.",
  },
  {
    icon: "Recycle",
    title: "Nachhaltigkeit",
    text: "Ressourcenschonend arbeiten – für Sie und für die Umwelt.",
  },
  {
    icon: "Scale",
    title: "Individuelle Lösungen",
    text: "Wir hören zu und setzen Ihre Wünsche präzise um.",
  },
] as const;

// 4) Optionales Stimmungs-Triptychon (wird im Hero benutzt)
export const ueberUnsAmbientImages = [
  "/bilder_ordner/ueberuns/kundengespraech-stock-photo.webp",
  "/bilder_ordner/ueberuns/team-stockphoto-toller-arbeitsplatz.webp",
  "/bilder_ordner/ueberuns/fensterbau-werkstatt.webp",
];
