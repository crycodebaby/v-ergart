// src/lib/reviews.ts
/**
 * Zentrale Single-Source-of-Truth für die Google-Bewertung.
 *
 * Bei neuen Bewertungen NUR hier anpassen – sichtbare Texte (Fensterservice,
 * Stats, Vorteile) und die strukturierten Daten (JSON-LD) ziehen sich den
 * Stand von hier. Die Werte müssen dem echten Google-Profil entsprechen.
 */
export const GOOGLE_RATING = {
  /** Durchschnitt, 1–5 */
  value: 5.0,
  /** Anzahl der Google-Bewertungen */
  count: 12,
  /** Stand der Zahlen (für den sichtbaren Hinweis) */
  asOf: "September 2026",
  profileName: "Hausmeisterservice Alexander Ergart",
  url: "https://share.google/v5vIP9CD3DLynEpP1",
} as const;

/** "5,0" – deutsche Schreibweise für sichtbare Texte */
export const GOOGLE_RATING_DISPLAY = GOOGLE_RATING.value
  .toFixed(1)
  .replace(".", ",");

/** AggregateRating-Block für JSON-LD */
export const GOOGLE_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: GOOGLE_RATING.value.toFixed(1),
  reviewCount: String(GOOGLE_RATING.count),
  bestRating: "5",
  worstRating: "1",
} as const;

export type GoogleReview = {
  /** Anzeigename wie auf Google, z. B. "Claudia H." */
  author: string;
  /** Originaltext der Bewertung – unverändert von Google übernehmen */
  text: string;
  /** z. B. "August 2026" */
  date?: string;
  /** Worum ging es? z. B. "Fensteraustausch" */
  service?: string;
};

/**
 * Ausgewählte ORIGINAL-Bewertungen von Google (alle 5 Sterne).
 * Nur echte, wörtlich übernommene Texte eintragen – keine erfundenen Zitate.
 * Solange die Liste leer ist, zeigt die Sektion nur die Gesamtbewertung.
 */
export const GOOGLE_REVIEWS: GoogleReview[] = [];
