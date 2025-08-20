// src/components/Stats.tsx
"use client";

import { motion } from 'framer-motion';
import { Smile, CheckCircle, Star, Award } from 'lucide-react';

const stats = [
  { icon: Smile, number: "300+", text: "Zufriedene Kunden" },
  { icon: CheckCircle, number: "1.5k+", text: "Abgeschlossene Projekte" },
  { icon: Star, number: "4.9", text: "Google-Bewertung" },
  { icon: Award, number: "7+", text: "Jahre Erfahrung" },
];

// Animationsvarianten für Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Lässt die Kind-Elemente nacheinander erscheinen
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Stats = () => {
  return (
    <section id="stats" className="py-20 px-5 bg-slate-50 dark:bg-zinc-900/80">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Unsere Erfolge in Neuss: Zufriedene Kunden & Mehr
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-item bg-background p-6 rounded-xl shadow-lg border border-border/20 flex flex-col items-center justify-center"
                variants={itemVariants}
              >
                <Icon className="text-brand-blue mb-4" size={48} />
                <div className="stat-number text-5xl font-bold text-foreground my-2">{stat.number}</div>
                <p className="text-lg text-muted-foreground">{stat.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="stats-hint mt-16 text-lg text-muted-foreground">
          <p>
            Helfen Sie uns zu wachsen und{" "}
            <a href="https://g.page/r/CVLFZ9DYBlwIEBM/review" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-blue hover:underline">
              teilen Sie Ihre ehrliche Meinung
            </a>
            {" "}zu unserer Arbeit auf Google.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Stats;