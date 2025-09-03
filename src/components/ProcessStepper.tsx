// src/components/ProcessStepper.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    title: "Bestandsaufnahme",
    description:
      "Jedes Projekt beginnt mit der Analyse. Wir begutachten die alten Fenster und die Bausubstanz.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster.webp",
  },
  {
    title: "Vorbereitung",
    description:
      "Nach dem Ausbau der alten Elemente wird der Arbeitsplatz sauber vorbereitet und geschützt.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster-ausgebaut-vorbereiteter-arbeitsplatz.webp",
  },
  {
    title: "Anlieferung",
    description:
      "Die neuen, maßgefertigten Fensterelemente werden sicher auf Gestellen angeliefert.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheiben-auf-gestell-für-fensterelemente.webp",
  },
  {
    title: "Logistik",
    description:
      "Mit schwerem Gerät wie Kränen und Saughebern positionieren wir auch große Elemente millimetergenau.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
  },
  {
    title: "Präzisionsarbeit",
    description:
      "Der spezielle Saugkraft-Hebelift ermöglicht eine sichere und beschädigungsfreie Handhabung der Scheiben.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterscheibe-hochgehoben-durch-saugkraft-lift.webp",
  },
  {
    title: "Montage",
    description:
      "Das neue Fensterelement wird passgenau in die Öffnung eingesetzt und professionell verankert.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/montageprozess-der-neuen-scheibe-via-sauglift.webp",
  },
  {
    title: "Finale Justierung",
    description:
      "Nach dem Einbau wird alles perfekt justiert, um optimale Dichtigkeit und Funktionalität zu gewährleisten.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/finale-fensterelement-abdichtung.webp",
  },
  {
    title: "Abschluss",
    description:
      "Das Endergebnis: Eine neue, saubere und energieeffiziente Fensterfront, die Ihr Zuhause aufwertet.",
    image:
      "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
  },
];

export const ProcessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-slate-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Transparenz von Anfang bis Ende
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Verfolgen Sie unseren bewährten Montageprozess, der höchste Qualität
            und Sorgfalt in jedem Schritt sicherstellt.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Linke Spalte: Die Schritte */}
          <div className="flex flex-col gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all duration-300",
                  activeStep === index
                    ? "border-brand-blue bg-brand-blue/10"
                    : "border-transparent hover:bg-muted"
                )}
                onClick={() => setActiveStep(index)}
              >
                <h3 className="font-bold text-lg text-foreground">
                  Schritt {index + 1}: {step.title}
                </h3>
                {activeStep === index && (
                  <p className="text-muted-foreground mt-2">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Rechte Spalte: Das Bild */}
          <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
