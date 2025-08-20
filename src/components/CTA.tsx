"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const CTA = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={targetRef} className="relative h-[60vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/bilder_ordner/startbilder/hausmeister-neuss-handwerksloesungen.webp"
          alt="Professionelles Handwerk in Neuss"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Verwirklichen Sie Ihre Pläne
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-8 text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Präzision und Zuverlässigkeit für Ihr Zuhause oder Ihre Immobilie.
          Lassen Sie uns gemeinsam Ihr nächstes Projekt besprechen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/kontakt"
            className="inline-block bg-brand-blue text-white font-bold py-4 px-10 rounded-md text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Unverbindlich anfragen
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
