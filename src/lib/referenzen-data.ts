// src/lib/referenzen-data.ts

// Wir definieren jetzt den Typ für ein einzelnes Bild
export type ReferenzBild = {
  src: string;
  title: string;
  category: "Bau & Montage" | "Reinigung" | "Garten" | "Innenausbau";
};

// Eine einzige, flache Liste mit allen Bildern
export const alleReferenzen: ReferenzBild[] = [
  {
    src: "/bilder_ordner/referenzen/titelbild.webp",
    title: "Fenstermontage an moderner Fassade",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/der-hausmeister-profi-bauarbeiten.webp",
    title: "Anspruchsvolle Bauarbeiten",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/spezielle-kranarbeiten-in-urbaner-umgebung.webp",
    title: "Spezielle Kranarbeiten",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/neubau-wohnung-bodenverlegung-laminat-aus-deutscher-manufaktur-hochwertiger-laminatboden.webp",
    title: "Hochwertige Bodenverlegung",
    category: "Innenausbau",
  },
  {
    src: "/bilder_ordner/referenzen/neu-verlegter-estrich-boden-in-wohnanlage.webp",
    title: "Fachgerechte Estricharbeiten",
    category: "Innenausbau",
  },
  {
    src: "/bilder_ordner/referenzen/fensterelement-montage-hochheben-präziser-einbau.webp",
    title: "Präziser Einbau von Fensterelementen",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/stuetz-balken-installiert-tragfaehigkeit-verbessern-fensterbalkon-terrassenelement.webp",
    title: "Installation von Stützbalken",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/silikon-blech-verklebung-neben-fensterelement.webp",
    title: "Detailverklebung an Fassade",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/gartenpflege-neuss-renovierung.webp",
    title: "Gartenpflege und Renovierung",
    category: "Garten",
  },
  {
    src: "/bilder_ordner/referenzen/gebaeudereinigung-privathaushalt-neuss-fenster.webp",
    title: "Gebäudereinigung bei Privathaushalt",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/custom-maße-maßanfertigung-fensterelement-auf-anhaenger-transport.webp",
    title: "Transport von Maßanfertigungen",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/einbaue-tuerelement-nebeneingangstuer-hoening-qualitaetstuer.webp",
    title: "Einbau einer Höning Qualitätstür",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/mehrere-fensterelemente-auf-anhaenger-festgeschnallt-sicherer-transport.webp",
    title: "Sicherer Transport von Fensterelementen",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/reinigungsservice-neuss-fensterbau.webp",
    title: "Reinigung nach Fensterbau",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/riesiges-fensterelement-auf-anhaenger.webp",
    title: "Logistik für riesiges Fensterelement",
    category: "Bau & Montage",
  },
];
