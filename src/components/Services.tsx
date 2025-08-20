// src/components/Services.tsx
"use client";

import { motion } from 'framer-motion';
// KORRIGIERTER IMPORT: 'Window' wurde durch 'Frame' ersetzt.
import { Frame, Leaf, Hammer, Sparkles, Construction, Paintbrush } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services: { title: string; description: string; icon: LucideIcon }[] = [
  // KORRIGIERTER EINTRAG: 'Window' wurde durch 'Frame' ersetzt.
  { title: "Fenstermontage & Service", description: "Komplettservice für Fenster: Von der Beratung bis zum fachgerechten Einbau.", icon: Frame },
  { title: "Gartenpflege & Außenanlagen", description: "Pflege von Gärten, Heckenschnitt und Winterdienst für Gewerbe- und Privatanlagen.", icon: Leaf },
  { title: "Handwerkerarbeiten", description: "Kleinreparaturen im Haushalt, Montagearbeiten und schnelle Lösungen für jedes Problem.", icon: Hammer },
  { title: "Gebäudereinigung", description: "Professionelle Reinigung für Privatwohnungen, Büros und Treppenhäuser.", icon: Sparkles },
  { title: "Maßgefertigte Möbel", description: "Individuelle Möbel nach Maß, von Regalen und Schranksystemen bis zu Gartenmöbeln.", icon: Construction },
  { title: "Raumausstattung", description: "Wir gestalten Räume neu – von Tapezierarbeiten bis zur Verlegung von Böden.", icon: Paintbrush },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="leistungen" className="py-20 px-5 bg-background">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Unsere Kernkompetenzen
        </h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="service-item bg-slate-50 dark:bg-zinc-900/80 p-8 rounded-xl shadow-lg border border-border/20 text-center flex flex-col items-center"
                variants={itemVariants}
              >
                <div className="icon-container bg-brand-blue/10 p-4 rounded-full mb-6 border border-brand-blue/20">
                  <Icon className="text-brand-blue" size={36} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground flex-grow">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default Services;