// src/lib/ueber-uns-data.ts
// 1) Hero-Bild: hier tauschen = überall aktualisiert
export const ueberUnsHeroImage =
  "/bilder_ordner/ueberuns/firmenzentrale-weitaufnahme.webp";

// 2) Timeline-Milestones – reihenfolge, texts & bilder zentral
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
    image: "/bilder_ordner/ueberuns/teamfoto-vor-hauptzentrale-ergart.webp",
    align: "right" as const,
  },
  {
    year: "Heute",
    title: "Spezialisierung & Premium-Partnerschaft",
    text: "Wir haben unsere Expertise vertieft und uns auf hochwertige Fenster- und Türenlösungen spezialisiert. Die Partnerschaft mit der Manufaktur Höning steht für unser Versprechen: Deutsche Wertarbeit und modernste Technik.",
    image: "/bilder_ordner/ueberuns/fensterbau-werkstatt.webp",
    align: "left" as const,
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
