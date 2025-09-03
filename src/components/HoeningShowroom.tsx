// src/components/HoeningShowroom.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Gem, Verified } from "lucide-react";
import { ProjectCarousel } from "./ProjectCarousel"; // Wir verwenden die Carousel wieder!

const showroomImages = [
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung1.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung2.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung3.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung4.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung5.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung6.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp",
  "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung8.webp",
];

export const HoeningShowroom = () => {
  return (
    <section className="py-24 bg-gradient-to-t from-slate-50 to-background dark:from-zinc-900 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Qualität, die man sehen kann
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Als stolzer Partner von Höning bieten wir Ihnen ausschließlich
            Produkte, die höchste Standards in Design, Energieeffizienz und
            Sicherheit erfüllen. Besuchen Sie uns und überzeugen Sie sich
            selbst.
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
            <ProjectCarousel images={showroomImages} />{" "}
            {/* Deine Bilder in einer Carousel */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ihre Vorteile durch Höning-Partnerschaft:
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Lightbulb className="text-brand-blue" size={20} />
                </div>
                <span>
                  <span className="font-semibold text-foreground">
                    Innovatives Design:
                  </span>{" "}
                  Zeitlose Ästhetik und moderne Formsprache für jedes Objekt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Gem className="text-brand-blue" size={20} />
                </div>
                <span>
                  <span className="font-semibold text-foreground">
                    Premium Materialien:
                  </span>{" "}
                  Hochwertige Aluminium- und Kunststoffprofile für maximale
                  Langlebigkeit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Verified className="text-brand-blue" size={20} />
                </div>
                <span>
                  <span className="font-semibold text-foreground">
                    Deutsche Qualitätsfertigung:
                  </span>{" "}
                  Produkte, die den höchsten Standards in Energieeffizienz und
                  Sicherheit genügen.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
