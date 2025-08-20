// src/components/DashboardHero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const DashboardHero = () => {
  return (
    <section className="h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Fenster Sektion */}
      <Link href="/fenster" className="relative group overflow-hidden">
        <Image
          src="/bilder_ordner/hoening/fenster/fenster1.webp"
          alt="Moderne Fensterfront"
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fenster
          </motion.h2>
          <motion.p
            className="mt-4 text-lg max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mehr Licht, Wärme und Sicherheit für Ihr Zuhause.
          </motion.p>
          <motion.div
            className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Lösungen entdecken <ArrowRight size={20} />
          </motion.div>
        </div>
      </Link>

      {/* Türen Sektion */}
      <Link href="/tueren" className="relative group overflow-hidden">
        <Image
          src="/bilder_ordner/hoening/tueren/aluminium-tuer1.webp"
          alt="Moderne Aluminium-Haustür"
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Türen
          </motion.h2>
          <motion.p
            className="mt-4 text-lg max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Die Visitenkarte Ihres Hauses – stilvoll und sicher.
          </motion.p>
          <motion.div
            className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Modelle ansehen <ArrowRight size={20} />
          </motion.div>
        </div>
      </Link>
    </section>
  );
};

export default DashboardHero;
