// src/components/LeistungenHero.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const LeistungenHero = () => {
    return (
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="/bilder_ordner/hoening/fenster/fenster1.webp"
                alt="Moderne Fensterfront eines Hauses"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 px-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    Unsere Leistungen
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
                    Vom hochmodernen Fenster bis zum klassischen Hausmeisterservice – Präzision und Qualität in jedem Detail.
                </p>
            </motion.div>
        </section>
    );
};

export default LeistungenHero;