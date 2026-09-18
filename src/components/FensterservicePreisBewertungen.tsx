"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Euro, Info, Quote, Star } from "lucide-react";
import {
  GOOGLE_RATING,
  GOOGLE_RATING_DISPLAY,
  GOOGLE_REVIEWS,
} from "@/lib/reviews";

function Stars({ size = 18 }: { size?: number }) {
  return (
    <div
      className="flex items-center gap-0.5 text-amber-400"
      role="img"
      aria-label={`${GOOGLE_RATING_DISPLAY} von 5 Sternen`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

/** Google-„G“ als Quellenangabe der Bewertungen */
function GoogleMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function FensterservicePreisBewertungen() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
        >
          Preisorientierung & Bewertungen
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground"
        >
          Transparente Richtwerte – und {GOOGLE_RATING.count} Kunden, die uns
          auf Google mit {GOOGLE_RATING_DISPLAY} Sternen bewerten.
        </motion.p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {/* Preis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2 text-brand-text">
            <Euro size={18} />
            <span className="text-sm font-semibold">Preisvorschau (Richtwert)</span>
          </div>
          <p className="text-3xl font-bold text-foreground">ca. 400–600 €</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Standard-Kunststofffenster (PVC/uPVC) in Standardgröße – zzgl.
            professioneller Montage.
          </p>
        </motion.div>

        {/* Google-Gesamtbewertung */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          viewport={{ once: true }}
          href={GOOGLE_RATING.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${GOOGLE_RATING_DISPLAY} von 5 Sternen aus ${GOOGLE_RATING.count} Google-Bewertungen – auf Google ansehen (neuer Tab)`}
          className="group flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg md:col-span-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GoogleMark />
              <span className="text-sm font-semibold text-foreground">
                Google Bewertungen
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Stand: {GOOGLE_RATING.asOf}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-6xl font-bold leading-none tracking-tight text-foreground">
              {GOOGLE_RATING_DISPLAY}
            </p>
            <div>
              <Stars size={24} />
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  {GOOGLE_RATING.count} von {GOOGLE_RATING.count}
                </strong>{" "}
                Bewertungen mit 5 Sternen
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
            <span className="text-sm text-muted-foreground">
              {GOOGLE_RATING.profileName}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-text">
              Alle lesen
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </motion.a>
      </div>

      {/* Ausgewählte Original-Bewertungen (aus src/lib/reviews.ts) */}
      {GOOGLE_REVIEWS.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOOGLE_REVIEWS.map((review, i) => (
            <motion.li
              key={`${review.author}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              viewport={{ once: true }}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Stars size={14} />
                <Quote size={18} className="text-brand-blue/30" aria-hidden="true" />
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                {review.text}
              </blockquote>
              <footer className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-semibold text-brand-text"
                >
                  {review.author.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-foreground">
                    {review.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {[review.service, review.date].filter(Boolean).join(" · ") ||
                      "Google-Bewertung"}
                  </p>
                </div>
              </footer>
            </motion.li>
          ))}
        </ul>
      ) : null}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-5 flex items-start gap-2 text-sm text-muted-foreground"
      >
        <Info size={16} className="mt-0.5 shrink-0" />
        <span>
          Der genaue Preis hängt von Maß, Ausführung und Einbausituation ab –
          unverbindliche Orientierung. Lieferzeit für Fensterelemente aktuell
          bis zu 9 Wochen.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a
          href="#kontakt-formular"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-brand-solid-hover"
        >
          Unverbindliche Anfrage starten
        </a>
      </motion.div>
    </div>
  );
}
