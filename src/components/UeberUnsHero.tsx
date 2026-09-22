// src/components/UeberUnsHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ueberUnsHeroImage, ueberUnsAmbientImages } from "@/lib/ueber-uns-data";

const UeberUnsHero = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Hintergrundbild */}
      <Image
        src={ueberUnsHeroImage}
        alt="Ergart Firmenzentrale"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Vignette + leichte Tönung */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />

      {/* Ambient-Bilder für mehr Tiefe (leicht animiert) */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute bottom-6 left-6 flex gap-3">
          {ueberUnsAmbientImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="relative h-16 w-24 md:h-20 md:w-32 rounded-lg overflow-hidden border border-white/10 shadow-lg"
            >
              <Image
                src={src}
                alt="Einblick in unsere Arbeit"
                fill
                className="object-cover"
                sizes="(max-width:768px) 33vw, 200px"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Headline + Subline */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-3xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Handwerk aus Leidenschaft.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-100">
            Die Geschichte hinter dem Namen Ergart – eine Reise von der Vision
            zum eigenen Handwerksbetrieb.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default UeberUnsHero;
