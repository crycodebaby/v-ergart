// src/lib/karriere-data.ts
/**
 * Statische Inhalte des Karriere-Portals. Die Stellen selbst kommen aus
 * Sanity (jobs-queries.ts); hier steht alles, was sich nicht pro Stelle
 * ändert: Arbeitgeber-Argumente, Bewerbungsablauf, Ansprechpartner.
 *
 * Keine React-Importe – Icons als lucide-Namen, aufgelöst über DynamicIcon.
 */
import { CONTACT } from "./site-links";

export const KARRIERE_HERO = {
  eyebrow: "Karriere",
  title: "Arbeiten bei Alexander Ergart",
  lede:
    "Hausmeisterservice, Gebäudereinigung und Fensterbau in Neuss. Feste Ansprechpartner, geregelte Abläufe und Arbeit, deren Ergebnis man sieht.",
  image: {
    src: "/bilder_ordner/ueberuns/teamfoto-vor-hauptzentrale-ergart.webp",
    alt: "Das Team von Alexander Ergart vor der Zentrale in Neuss",
  },
  /** Belegbare Fakten – keine Marketingzahlen. */
  facts: [
    { value: "13+", label: "Jahre Erfahrung im Handwerk" },
    { value: "2018", label: "Eintrag Handwerkskammer Düsseldorf" },
    { value: "Neuss", label: "und Rhein-Kreis, kurze Anfahrten" },
  ],
} as const;

export const KARRIERE_BENEFITS = [
  {
    icon: "FileCheck",
    title: "Unbefristete Anstellung",
    text: "Feste Verträge, geregelte Vergütung und pünktliche Zahlung. Wir planen langfristig – mit Ihnen.",
  },
  {
    icon: "Wrench",
    title: "Werkzeug, das funktioniert",
    text: "Profi-Ausstattung, gepflegte Fahrzeuge, moderne Technik. Sie arbeiten mit Material, auf das Sie sich verlassen können.",
  },
  {
    icon: "Route",
    title: "Kurze Wege",
    text: "Einsatzgebiet Neuss und Rhein-Kreis. Keine Fernmontagen, abends sind Sie zu Hause.",
  },
  {
    icon: "MessageSquare",
    title: "Direkter Draht",
    text: "Entscheidungen fallen im Betrieb, nicht in einer Zentrale. Der Inhaber ist erreichbar und kennt jedes Objekt.",
  },
  {
    icon: "GraduationCap",
    title: "Weiterbildung",
    text: "Schulungen bei Herstellern und Verbänden – etwa zu Aufzugsanlagen, Sicherheit oder Fenstertechnik.",
  },
  {
    icon: "Users",
    title: "Ein Team, das bleibt",
    text: "Geringe Fluktuation, eingespielte Kolonnen und eine Einarbeitung, die den Namen verdient.",
  },
] as const;

export const KARRIERE_STEPS = [
  {
    title: "Bewerbung senden",
    text: "Lebenslauf und, falls vorhanden, Zeugnisse per E-Mail. Ein kurzes Anschreiben genügt, ein Formular gibt es nicht.",
  },
  {
    title: "Kennenlernen in Neuss",
    text: "Wir melden uns innerhalb weniger Tage und laden Sie zu einem Gespräch in unsere Zentrale ein.",
  },
  {
    title: "Probetag und Start",
    text: "Sie begleiten das Team einen Tag lang. Passt es beiden Seiten, starten Sie mit fester Einarbeitung.",
  },
] as const;

export const KARRIERE_CONTACT = {
  name: "Alexander Ergart",
  role: "Inhaber und Geschäftsführer",
  image: {
    src: "/bilder_ordner/ceo-geschaeftsfuehrer-alexander-ergart.webp",
    alt: "Alexander Ergart, Inhaber des Hausmeister- und Fensterservice in Neuss",
  },
  statement:
    "Ich lese jede Bewerbung selbst. Mir ist wichtiger, wie jemand arbeitet, als wie das Anschreiben formuliert ist. Rufen Sie gerne vorher an, wenn Sie Fragen zur Stelle haben.",
  phoneDisplay: CONTACT.phoneDisplay,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
} as const;
