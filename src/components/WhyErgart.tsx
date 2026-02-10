// src/components/WhyErgart.tsx
"use client";

import { motion } from 'framer-motion';
// KORREKTUR: 'CheckBadge' wurde durch den korrekten Namen 'BadgeCheck' ersetzt.
import { HeartHandshake, Diamond, BadgeCheck } from 'lucide-react';

const reasons = [
  {
    icon: HeartHandshake,
    title: "Erstklassiger Service",
    text: "Wir garantieren höchste Qualität und zuverlässigen Support – seit über 7 Jahren."
  },
  {
    icon: Diamond,
    title: "Perfektion",
    text: "Mit höchsten Ansprüchen an unsere Arbeit liefern wir beste Ergebnisse, die überzeugen."
  },
  {
    // KORREKTUR: Hier ebenfalls den korrekten Icon-Namen verwenden.
    icon: BadgeCheck,
    title: "Vertrauen",
    text: "Über 300 zufriedene Kunden in Neuss und Umgebung sind unser größtes Lob."
  }
];

const WhyErgart = () => {
  return (
    <section id="why-ergart" className="py-20 bg-slate-50 dark:bg-zinc-900">
      <div className="container max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Warum Alexander Ergart?</h2>
        <p className="text-lg text-muted-foreground mb-16">Ihre Zufriedenheit ist unser Antrieb.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                className="card bg-background p-8 rounded-xl shadow-lg border border-border/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="icon-wrapper inline-flex items-center justify-center h-16 w-16 bg-brand-blue/10 rounded-full mb-6">
                  <Icon className="text-brand-blue" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyErgart;