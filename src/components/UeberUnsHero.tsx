// src/components/UeberUnsHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const UeberUnsHero = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center">
            <Image 
                src="/bilder_ordner/fensterbauer-neuss-profi.webp"
                alt="Alexander Ergart, Gründer und Inhaber"
                fill
                className="object-cover object-top"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <motion.div 
                className="relative z-10 text-center text-white px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-4xl md:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                    Handwerk aus Leidenschaft.
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
                    Die Geschichte hinter dem Namen Ergart – eine Reise von der Vision zur Meisterschaft.
                </p>
            </motion.div>
        </section>
    );
};

export default UeberUnsHero;