"use client";

import { motion } from "framer-motion";
import { Euro, Info, Star, ExternalLink } from "lucide-react";

export default function FensterservicePreisBewertungen() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
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
              Ein normales Kunststofffenster in Standardgroesse inkl. fachgerechtem
              Einbau beginnt meist bei ca. 400-600 EUR.
            </motion.p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-white dark:bg-zinc-800 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-brand-blue mb-3">
                <Euro size={18} />
                <span className="text-sm font-semibold">Preisvorschau (Richtwert)</span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">ca. 400-600 EUR</p>
              <p className="text-sm text-muted-foreground">
                Standard-Kunststofffenster (PVC/uPVC) exklusive, nicht mit eingerechnet professioneller Montage.
              </p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              viewport={{ once: true }}
              href="https://share.google/v5vIP9CD3DLynEpP1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border bg-white dark:bg-zinc-800 p-5 shadow-sm hover:border-brand-blue/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-sm font-semibold text-brand-blue">Google Bewertungen</span>
                <ExternalLink size={16} className="text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-2" aria-label="5 von 5 Sternen">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-base font-semibold text-foreground mb-1">
                5,0 Sterne aus 6 Google-Bewertungen
              </p>
              <p className="text-sm text-muted-foreground">
                Hausmeisterservice Alexander Ergart
              </p>
            </motion.a>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-sm text-muted-foreground flex items-start gap-2"
          >
            <Info size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
            <span>
              Der genaue Preis haengt von Mass, Ausfuehrung und Einbausituation ab und
              ist als unverbindliche Orientierung zu verstehen.
              <br />
              Aktuell gibt es fuer Fensterelemente bis zu 9 Wochen Lieferzeit. Danke fuer Ihr Verstaendnis.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="#kontakt-formular"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02]"
            >
              Unverbindliche Anfrage starten
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
