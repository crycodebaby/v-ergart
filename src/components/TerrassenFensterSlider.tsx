// src/components/TerrassenFensterSlider.tsx
"use client";

import Image from "next/image";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { motion } from "framer-motion";

const BEFORE_IMAGE = {
  imageUrl:
    "/bilder_ordner/hoening/fenster/fenstersanierung/vorher-terassen-fensterwand.webp",
};
const AFTER_IMAGE = {
  imageUrl:
    "/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp",
};

export const TerrassenFensterSlider = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Transformation, die begeistert
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sehen Sie den beeindruckenden Wandel: Aus einer veralteten
            Terrassenwand wird ein modernes, energieeffizientes und sicheres
            Glanzstück.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-blue/50">
              <ReactBeforeSliderComponent
                firstImage={BEFORE_IMAGE}
                secondImage={AFTER_IMAGE}
                // Optional: Labels für Vorher/Nachher
                // secondImageLabel="Neu"
                // firstImageLabel="Alt"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Anthrazit-Ästhetik trifft auf höchste Funktion
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">
                  Elegantes Design:
                </span>{" "}
                Edle, anthrazit gebürstete Aluminium-Fensterelemente für eine
                moderne Optik.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Energieeffizienz:
                </span>{" "}
                Deutliche Heizkostenersparnis dank verbesserter Wärmedämmung
                nach Höning-Qualitätsstandard.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Mehr Ruhe:
                </span>{" "}
                Effektive Schalldämmung von außen schafft eine ruhige und
                entspannte Wohnatmosphäre.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Sicherheit & Langlebigkeit:
                </span>{" "}
                Robuste Bauweise in deutscher Qualität für ein dauerhaftes
                Gefühl der Geborgenheit.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Wohlfühlfaktor:
                </span>{" "}
                Mehr Licht und verbesserter Komfort für Ihr Wohnzimmer oder Ihre
                Terrasse.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
