// src/components/FensterHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hier ist die Korrektur: Das Wort "default" muss hier stehen.
export default function FensterHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      {/* Hintergrundbild */}
      <Image
        src="/bilder_ordner/hoening/fenster/fenster-titelbild.webp"
        alt="Moderne Fensterfront eines Hauses"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay für besseren Kontrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Textinhalt */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Fenster, die Maßstäbe setzen
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-100 drop-shadow-md">
          Entdecken Sie Perfektion in Design, Sicherheit und Energieeffizienz
          mit unseren hochwertigen Fensterlösungen.
        </p>
      </motion.div>
    </section>
  );
}
