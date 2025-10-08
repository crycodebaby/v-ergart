// src/components/TuerenHero.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TuerenHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/bilder_ordner/hoening/tueren/tueren-hero.png" // Stelle sicher, dass dieses Bild existiert
        alt="Moderne und sichere Haustür eines Einfamilienhauses"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Türen, die Eindruck machen
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-100 drop-shadow-md">
          Verbinden Sie erstklassige Sicherheit mit herausragendem Design für
          den perfekten Eingang.
        </p>
      </motion.div>
    </section>
  );
}
