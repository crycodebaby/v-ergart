// src/components/FensterserviceBildergalerie.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Bild-Galerie Sektion für die Fensterservice Landing Page
 * 
 * Zeigt zwei hochwertige Bilder, die die Qualität und
 * Professionalität des Fensterservice demonstrieren.
 */

const bilder = [
    {
        src: "/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung7.webp",
        alt: "Moderne Fensterausstellung bei HÖNING – Premium-Qualität für Ihr Zuhause",
        caption: "Premium-Fenster in der HÖNING Ausstellung",
    },
    {
        src: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
        alt: "Professionelle Fenstermontage mit Kran – Präzision bei großen Elementen",
        caption: "Professionelle Montage großer Fensterelemente",
    },
];

export default function FensterserviceBildergalerie() {
    return (
        <>
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-text text-sm font-medium"
                    >
                        Einblicke
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-foreground"
                    >
                        Saubere Arbeit am Fenster
                    </motion.h2>
                </div>

                {/* Bilder Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {bilder.map((bild, index) => (
                        <motion.div
                            key={bild.src}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative overflow-hidden rounded-2xl"
                        >
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={bild.src}
                                    alt={bild.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium text-sm md:text-base">
                                    {bild.caption}
                                </p>
                            </div>

                            {/* Border Accent */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-blue/50 transition-colors duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
        </>
    );
}
