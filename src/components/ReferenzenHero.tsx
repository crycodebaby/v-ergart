// src/components/ReferenzenHero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ReferenzenHero = () => {
  return (
    <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
      <Image
        src="/bilder_ordner/referenzen/der-hausmeister-profi-bauarbeiten.webp"
        alt="Professionelle Bauarbeiten in Neuss"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4"
      >
        <h1
          className="text-4xl md:text-6xl font-bold"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
        >
          Projekte, die überzeugen
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
          Ein Einblick in unsere Arbeit und die Ergebnisse, auf die wir stolz
          sind.
        </p>
      </motion.div>
    </section>
  );
};

export default ReferenzenHero;
