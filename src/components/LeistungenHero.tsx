// src/components/LeistungenHero.tsx
'use client';

import { motion } from 'framer-motion';

export function LeistungenHero() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Unsere Leistungen
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Entdecken Sie die Vielfalt unserer Dienstleistungen – von der Beratung bis zur perfekten Umsetzung. 
            Maßgeschneidert für Ihre Anforderungen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}