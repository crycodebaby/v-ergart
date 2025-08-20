// src/components/IntroSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const IntroSection = () => {
  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
          Handwerkskunst im Detail
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          Jedes Projekt ist mehr als nur eine Aufgabe – es ist unser Versprechen
          an Sie für höchste Qualität, Präzision und Langlebigkeit. Wir
          kombinieren bewährte Techniken mit modernsten Materialien, um
          Ergebnisse zu schaffen, die nicht nur heute überzeugen, sondern auch
          in Zukunft Bestand haben. Ihre Zufriedenheit ist der Maßstab unseres
          Erfolgs.
        </p>

        {/* Die Qualitäts-Siegel */}
        <div className="flex justify-center items-center gap-12 md:gap-20 opacity-80">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/bilder_ordner/coop/hoening.png"
              alt="Höning Logo"
              width={160}
              height={53}
              className="dark:brightness-0 dark:invert"
            />
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Premium Partner
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/bilder_ordner/coop/made-in-germany.png"
              alt="Made in Germany Siegel"
              width={70}
              height={70}
            />
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Deutsche Wertarbeit
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;
