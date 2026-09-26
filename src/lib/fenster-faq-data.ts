// src/lib/fenster-faq-data.ts
/**
 * FAQ-Daten der beiden Fenster-Seiten – eine Quelle fuer sichtbaren Text UND
 * strukturierte Daten.
 *
 * Hintergrund: Bis Batch 2 lag EIN gemischter FAQ-Block auf /fensterservice,
 * der Kauf- und Reparaturfragen vermischt hat ("Was kostet ein neues Fenster?"
 * neben "Bieten Sie auch Reparaturen an?"). Damit war weder fuer Nutzer noch
 * fuer Google erkennbar, wofuer die Seite steht.
 *
 * Jetzt strikt getrennt:
 *   FENSTER_KAUF_FAQS    -> /fenster        (neue Fenster, Austausch, Montage)
 *   FENSTER_SERVICE_FAQS -> /fensterservice (Reparatur, Wartung, Einstellung)
 *
 * WICHTIG: Jede Antwort muss einer real erbrachten Leistung entsprechen. Es
 * werden hier keine Preise, Fristen oder Zertifikate erfunden. Preisangaben
 * zum Fensterelement dürfen nie als Inklusivpreis mit Montage gelesen
 * werden können – Element und Einbau stehen getrennt. Wo keine
 * belastbare Zahl existiert (z. B. Reparaturpreise), sagt die Antwort das
 * ehrlich statt eine Zahl zu behaupten.
 */

export type FaqItem = {
  frage: string;
  antwort: string;
};

/** Kaufseite /fenster – Intent: neue Fenster, Austausch, Montage, Angebot. */
export const FENSTER_KAUF_FAQS: FaqItem[] = [
  {
    frage: "Was kostet ein neues Fenster?",
    antwort:
      "Ein durchschnittliches PVC-Fensterelement liegt je nach Größe, Ausführung und Verglasung ungefähr bei 400–600 €. Das ist der reine Elementpreis. Montage, Ausbau der alten Fenster, Anschlussarbeiten und Zusatzleistungen kommen hinzu und werden nach dem Aufmaß individuell kalkuliert. Beratung und Aufmaß sind für Sie kostenlos.",
  },
  {
    frage: "Wann lohnt sich ein Fensteraustausch statt einer Reparatur?",
    antwort:
      "Als Faustregel: Solange nur Dichtung, Beschlag oder Einstellung betroffen sind, ist die Reparatur der preiswertere Weg. Sind dagegen Rahmen oder Verglasung selbst am Ende – etwa bei Einfachverglasung, beschlagenen Scheiben im Glaszwischenraum oder dauerhaft undichten Rahmen – rechnet sich der Austausch schneller. Wir sagen Ihnen bei der Besichtigung offen, welcher Weg in Ihrem Fall sinnvoll ist.",
  },
  {
    frage: "Wie lange dauert der Einbau eines Fensters?",
    antwort:
      "Der Austausch eines einzelnen Fensters dauert in der Regel 2–4 Stunden. Bei mehreren Fenstern planen wir effizient, sodass Sie meist am selben Tag fertig montierte Fenster haben.",
  },
  {
    frage: "Welche Fenstermarken verbauen Sie?",
    antwort:
      "Wir sind offizieller Partner von HÖNING, einem deutschen Hersteller. Die Elemente werden für Ihre Öffnungsmaße gefertigt und überzeugen durch Verarbeitung, Energieeffizienz und lange Lebensdauer.",
  },
  {
    frage: "Wie läuft die Beratung ab?",
    antwort:
      "Sie schildern uns Ihr Vorhaben telefonisch oder über das Formular. Danach kommen wir zum Aufmaß vor Ort, besprechen Verglasung, Sicherheit und Optik und Sie erhalten ein transparentes, unverbindliches Angebot.",
  },
  {
    frage: "In welchen Gebieten bauen Sie Fenster ein?",
    antwort:
      "Wir sind hauptsächlich in Neuss und im Umkreis von ca. 15–20 km tätig: Düsseldorf, Kaarst, Dormagen, Meerbusch, Korschenbroich und Grevenbroich.",
  },
];

/** Serviceseite /fensterservice – Intent: bestehendes Fenster instand setzen. */
export const FENSTER_SERVICE_FAQS: FaqItem[] = [
  {
    frage: "Mein Fenster klemmt und schließt schwer – lässt sich das reparieren?",
    antwort:
      "In den meisten Fällen ja. Fensterflügel senken sich mit den Jahren ab oder der Beschlag verstellt sich. Wir justieren den Flügel nach, stellen den Anpressdruck neu ein und tauschen defekte Beschlagteile aus.",
  },
  {
    frage: "Es zieht am Fenster. Was können Sie tun?",
    antwort:
      "Zugluft kommt meist von porösen oder zusammengedrückten Dichtungen oder von einem zu geringen Anpressdruck. Wir erneuern die Dichtungen und stellen den Beschlag neu ein – das ist deutlich preiswerter als ein neues Element.",
  },
  {
    frage: "Was kostet eine Fensterreparatur?",
    antwort:
      "Das hängt vom Defekt ab – eine Neueinstellung ist etwas völlig anderes als ein kompletter Beschlagwechsel. Wir nennen Ihnen den Preis, nachdem wir uns das Fenster angesehen haben, und zwar vor der Ausführung. Wir arbeiten ohne versteckte Kosten.",
  },
  {
    frage: "Wie oft sollten Fenster gewartet werden?",
    antwort:
      "Einmal jährlich reicht in der Regel. Beim Wartungs-Check werden Beschläge geprüft und gefettet, Dichtungen kontrolliert und der Flügel nachjustiert. Das erhält die Leichtgängigkeit und beugt Zugluft vor.",
  },
  {
    frage: "Wann lohnt sich eine Reparatur nicht mehr?",
    antwort:
      "Wenn der Rahmen selbst beschädigt ist, die Scheibe im Zwischenraum beschlägt oder noch Einfachverglasung verbaut ist, ist der Austausch meist der wirtschaftlichere Weg. Wir sagen Ihnen das offen – und beraten Sie dann zu neuen Fenstern und zum Fensteraustausch.",
  },
  {
    frage: "Wie schnell bekomme ich einen Termin?",
    antwort:
      "In der Regel können wir innerhalb von 1–2 Wochen einen Termin anbieten. Bei dringenden Reparaturen versuchen wir, noch schneller zu reagieren.",
  },
  {
    frage: "In welchen Gebieten sind Sie tätig?",
    antwort:
      "Wir sind hauptsächlich in Neuss und im Umkreis von ca. 15–20 km tätig: Düsseldorf, Kaarst, Dormagen, Meerbusch, Korschenbroich und Grevenbroich.",
  },
];

/**
 * Baut das FAQPage-JSON-LD aus genau der Liste, die die Seite auch sichtbar
 * rendert. Dadurch kann das Schema nicht mehr vom Seiteninhalt abweichen.
 */
export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.antwort,
      },
    })),
  };
}
