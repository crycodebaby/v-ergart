// src/lib/jobs-fixture.ts
/**
 * Beispiel-Stellenanzeigen für die lokale Entwicklung OHNE Sanity-Zugang.
 *
 * Aktiv nur mit `JOBS_FIXTURE=1` in der Umgebung (siehe jobs-queries.ts).
 * In Production ist die Variable nie gesetzt; dort kommen die Daten aus dem
 * CMS. Die Struktur entspricht 1:1 dem Sanity-Schema `jobPosting`, damit
 * das Layout mit realistischen Textlängen geprüft werden kann.
 */
import type { JobPosting } from "./jobs-queries";

function block(text: string, key: string, style: "normal" | "h3" = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

export const FIXTURE_JOBS: JobPosting[] = [
  {
    _id: "fixture-hausmeister",
    _createdAt: "2026-08-12T08:00:00Z",
    title: "Hausmeister (m/w/d)",
    location: "Neuss & Rhein-Kreis",
    employmentType: "VOLLZEIT",
    slug: { current: "hausmeister" },
    metaTitle: "Hausmeister (m/w/d) in Neuss | Alexander Ergart",
    metaDescription:
      "Sie betreuen Wohn- und Gewerbeobjekte in Neuss und Umgebung eigenverantwortlich – von der Objektkontrolle über Kleinreparaturen bis zur Koordination von Handwerkern.",
    excerpt: [
      block(
        "Als Hausmeister sind Sie das Gesicht unseres Betriebs vor Ort. Sie kennen Ihre Objekte, Ihre Mieter und Ihre Auftraggeber und sorgen dafür, dass alles läuft.",
        "e1"
      ),
    ],
    description: [
      block(
        "Wir betreuen Wohnanlagen, Bürogebäude und Gewerbeflächen in Neuss, Kaarst, Dormagen und Meerbusch. Für unser wachsendes Objektportfolio suchen wir einen Hausmeister, der selbstständig arbeitet und Verantwortung übernimmt.",
        "d1"
      ),
      block(
        "Sie starten morgens in unserer Zentrale an der Further Straße, übernehmen Ihr Fahrzeug und fahren Ihre Objekte an. Feste Touren, klare Absprachen und ein Team, das erreichbar ist, wenn Sie Unterstützung brauchen.",
        "d2"
      ),
      block("Arbeitszeiten", "d3", "h3"),
      block(
        "Montag bis Freitag, 7:00 bis 16:00 Uhr. Winterdienst in der Saison nach Einsatzplan mit Zeitausgleich.",
        "d4"
      ),
    ],
    responsibilities: [
      "Regelmäßige Objektkontrollen und Dokumentation",
      "Kleinreparaturen an Türen, Fenstern, Sanitär und Elektrik (Kleinspannung)",
      "Koordination und Einweisung externer Handwerker",
      "Winterdienst und Grünflächenpflege nach Einsatzplan",
      "Ansprechpartner für Mieter und Hausverwaltungen vor Ort",
      "Materialbeschaffung und Werkzeugpflege",
    ],
    requirements: [
      "Abgeschlossene handwerkliche Ausbildung oder mehrjährige Erfahrung als Hausmeister",
      "Führerschein Klasse B",
      "Selbstständige, zuverlässige Arbeitsweise",
      "Gute Deutschkenntnisse in Wort und Schrift",
    ],
    niceToHave: [
      "Erfahrung mit Hausverwaltungen oder WEG-Objekten",
      "Kenntnisse in Heizungs- oder Lüftungstechnik",
      "Staplerschein",
    ],
    benefits: [
      { icon: "FileCheck", title: "Unbefristeter Vertrag", description: "Vollzeit mit fester Stundenzahl und geregelter Vergütung." },
      { icon: "Car", title: "Eigenes Servicefahrzeug", description: "Für Ihre Touren – gepflegt und vollständig ausgestattet." },
      { icon: "Wrench", title: "Hochwertiges Werkzeug", description: "Profi-Ausstattung von Würth und Hilti, keine Improvisation." },
      { icon: "CalendarClock", title: "Geregelte Arbeitszeiten", description: "Feste Touren, Zeitausgleich für Winterdienst-Einsätze." },
      { icon: "GraduationCap", title: "Weiterbildung", description: "Schulungen zu Aufzugsanlagen, Sicherheit und neuen Systemen." },
      { icon: "Users", title: "Kurze Wege", description: "Direkter Draht zur Geschäftsführung, keine Konzernstrukturen." },
    ],
    quickFacts: ["Vollzeit, unbefristet", "Start nächstmöglich", "Eigenes Fahrzeug", "Mo–Fr 7–16 Uhr"],
  },
  {
    _id: "fixture-reinigungskraft",
    _createdAt: "2026-08-20T08:00:00Z",
    title: "Reinigungskraft (m/w/d)",
    location: "Neuss",
    employmentType: "TEILZEIT",
    slug: { current: "reinigungskraft" },
    metaDescription:
      "Treppenhaus- und Büroreinigung in festen Objekten in Neuss. Teilzeit mit planbaren Zeiten, fairer Bezahlung und einem Team, das Sie einarbeitet.",
    excerpt: [
      block(
        "Sie reinigen Treppenhäuser, Büros und Gemeinschaftsflächen in festen Objekten – zuverlässig, gründlich und mit Blick fürs Detail.",
        "e1"
      ),
    ],
    responsibilities: [
      "Unterhaltsreinigung von Treppenhäusern und Fluren",
      "Büro- und Sanitärreinigung in Gewerbeobjekten",
      "Glas- und Rahmenreinigung nach Plan",
      "Dokumentation der erledigten Arbeiten",
    ],
    requirements: [
      "Erfahrung in der Gebäudereinigung von Vorteil, Quereinstieg möglich",
      "Zuverlässigkeit und Sorgfalt",
      "Grundkenntnisse Deutsch",
    ],
    niceToHave: ["Führerschein Klasse B"],
    benefits: [
      { icon: "Clock", title: "Planbare Zeiten", description: "Feste Objekte, feste Tage – Sie wissen, wann Sie arbeiten." },
      { icon: "Euro", title: "Faire Bezahlung", description: "Übertariflich, pünktlich, mit Zuschlägen." },
      { icon: "Users", title: "Einarbeitung", description: "Wir zeigen Ihnen jedes Objekt persönlich." },
    ],
    quickFacts: ["Teilzeit, 20–25 Std./Woche", "Feste Objekte in Neuss", "Start nächstmöglich"],
  },
  {
    _id: "fixture-fenstermonteur",
    _createdAt: "2026-09-01T08:00:00Z",
    title: "Fenstermonteur (m/w/d)",
    location: "Neuss",
    employmentType: "VOLLZEIT",
    slug: { current: "fenstermonteur" },
    metaDescription:
      "Montage von HÖNING-Fenstern und -Türen in Neubau und Sanierung. Sie arbeiten im Zweierteam mit Kran, Sauglift und hochwertigem Werkzeug.",
    responsibilities: [
      "Aus- und Einbau von Fenster- und Türelementen",
      "Abdichtung nach RAL-Montagerichtlinie",
      "Einstellen und Justieren von Beschlägen",
      "Aufmaß beim Kunden zusammen mit der Bauleitung",
    ],
    requirements: [
      "Ausbildung als Tischler, Glaser, Metallbauer oder vergleichbar",
      "Erfahrung in der Fenstermontage",
      "Führerschein Klasse B, idealerweise BE",
    ],
    benefits: [
      { icon: "FileCheck", title: "Unbefristeter Vertrag" },
      { icon: "Wrench", title: "Profi-Werkzeug", description: "Sauglift, Kran und Werkzeug auf aktuellem Stand." },
      { icon: "GraduationCap", title: "Herstellerschulungen", description: "Regelmäßig direkt bei HÖNING." },
      { icon: "Car", title: "Firmenfahrzeug" },
    ],
    quickFacts: ["Vollzeit, unbefristet", "Zweierteam", "Start nächstmöglich"],
  },
];
