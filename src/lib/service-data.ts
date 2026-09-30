// src/lib/service-data.ts
/**
 * Leistungsarchitektur für Übersichten (/leistungen, Startseite).
 *
 * Zwei Ebenen statt einer flachen Liste:
 *   CORE_SERVICES           die vier Hauptbereiche des Betriebs
 *   SUPPLEMENTARY_SERVICES  echte Zusatzleistungen, bewusst eine Stufe leiser
 *
 * Die Detailtexte (SEO, FAQ, Vorteile) liegen weiter in leistungen-data.ts.
 * Hier steht nur, was eine Übersicht braucht, um die Bereiche voneinander
 * abzugrenzen.
 */
import { DoorOpen, Leaf, Paintbrush, SprayCan, Wrench, type LucideIcon } from "lucide-react";

export type ServiceSubLink = {
  href: string;
  label: string;
  /** Eine Zeile, die die Absicht klärt (kaufen vs. reparieren). */
  note: string;
};

export type ServiceArea = {
  id: string;
  title: string;
  description: string;
  /** Konkrete Aufgaben — kurz, damit sie als Liste lesbar bleiben. */
  points: readonly string[];
  icon: LucideIcon;
  link: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  /**
   * Nur für Bereiche, die mehrere Seiten bündeln. Fenster & Türen trennt so
   * den Neukauf (/fenster, /tueren) sichtbar von Reparatur und Wartung
   * (/fensterservice).
   */
  subLinks?: readonly ServiceSubLink[];
};

export const CORE_SERVICES: readonly ServiceArea[] = [
  {
    id: "hausmeister",
    title: "Hausmeister & Objektservice",
    description:
      "Laufende Betreuung Ihrer Immobilie mit festem Ansprechpartner. Wir sehen regelmäßig nach dem Rechten und kümmern uns, bevor aus Kleinigkeiten Schäden werden.",
    points: [
      "Objektkontrollen",
      "Kleinere Reparaturen",
      "Mülltonnenservice",
      "Winterdienst",
      "Laufende Objektbetreuung",
    ],
    icon: Wrench,
    link: "/leistungen/hausmeister",
    linkLabel: "Zum Hausmeisterservice",
    image: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    imageAlt: "Ergart-Mitarbeiter bei einer Reparatur in der Werkstatt",
  },
  {
    id: "reinigung",
    title: "Gebäudereinigung",
    description:
      "Saubere Treppenhäuser, Büros und Glasflächen in festen Intervallen oder als Sonderreinigung, mit geschultem Team und klaren Standards.",
    points: [
      "Büroreinigung",
      "Treppenhausreinigung",
      "Glas- & Fensterreinigung",
      "Innen- & Außenreinigung",
    ],
    icon: SprayCan,
    link: "/leistungen/reinigung",
    linkLabel: "Zur Gebäudereinigung",
    image: "/bilder_ordner/leistungen/objektreinigung.webp",
    imageAlt: "Zwei Ergart-Mitarbeiter auf dem Weg durch einen Gebäudeflur",
  },
  {
    id: "garten",
    title: "Garten & Außenanlagen",
    description:
      "Gepflegte Grünflächen rund ums Jahr, für Privatgärten ebenso wie für die Außenanlagen von Wohn- und Gewerbeobjekten.",
    points: [
      "Rasenpflege",
      "Heckenschnitt",
      "Grünpflege",
      "Laubbeseitigung",
      "Saisonale Außenpflege",
    ],
    icon: Leaf,
    link: "/leistungen/gartenpflege",
    linkLabel: "Zur Gartenpflege",
    image: "/bilder_ordner/leistungen/gartenpflege.webp",
    imageAlt: "Ergart-Mitarbeiter mit Heckenschere in einem gepflegten Garten",
  },
  {
    id: "fenster-tueren",
    title: "Fenster & Türen",
    description:
      "Neue HÖNING Fenster und Haustüren mit Aufmaß, Lieferung und Montage aus einer Hand. Für vorhandene Fenster gibt es unseren Fensterservice.",
    points: ["Neue Fenster", "Fensteraustausch", "Haustüren & Türen", "Aufmaß, Lieferung, Montage"],
    icon: DoorOpen,
    link: "/fenster-tueren",
    linkLabel: "Übersicht Fenster & Türen",
    image: "/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp",
    imageAlt: "Neu eingebaute HÖNING Fensterwand in einer Backsteinfassade",
    subLinks: [
      {
        href: "/fenster",
        label: "Neue Fenster",
        note: "Kaufen oder austauschen",
      },
      {
        href: "/tueren",
        label: "Haustüren & Türen",
        note: "Neu einbauen lassen",
      },
      {
        href: "/fensterservice",
        label: "Fensterservice",
        note: "Reparatur & Wartung",
      },
    ],
  },
];

export const SUPPLEMENTARY_SERVICES: readonly ServiceArea[] = [
  {
    id: "innenausbau",
    title: "Innenausbau & Renovierung",
    description:
      "Böden, Trockenbau und Malerarbeiten, einzeln oder als komplette Renovierung. Sauber ausgeführt, mit fester Bauleitung.",
    points: ["Bodenverlegung", "Trockenbau", "Malerarbeiten"],
    icon: Paintbrush,
    link: "/leistungen/innenausbau",
    linkLabel: "Zu Innenausbau & Renovierung",
    image: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    imageAlt: "Ergart-Mitarbeiter bei Montagearbeiten an einer Wand",
  },
];
