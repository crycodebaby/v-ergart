// src/components/FensterserviceVorteile.tsx
"use client";

import { motion } from "framer-motion";
import {
    Award,
    MapPin,
    Clock,
    Star,
    BadgeCheck,
    Handshake,
    ShieldCheck,
} from "lucide-react";

import { GOOGLE_RATING, GOOGLE_RATING_DISPLAY } from "@/lib/reviews";
/**
 * Trust-Sektion für die Fensterservice Landing Page
 * 
 * Zeigt Vertrauens-Signale wie Erfahrung, regionale Nähe,
 * Partner-Qualität und Kundenbewertungen.
 */

const vorteile = [
    {
        icon: Award,
        title: "13+ Jahre Erfahrung",
        description: "Langjährige Expertise im Fenster- und Hausmeisterservice.",
    },
    {
        icon: MapPin,
        title: "Regionale Nähe",
        description: "Ihr lokaler Partner in Neuss, Düsseldorf und Umgebung.",
    },
    {
        icon: BadgeCheck,
        title: "Premium-Partner",
        description: "Offizieller Partner von HÖNING – Deutsche Qualität.",
    },
    {
        icon: Star,
        title: `${GOOGLE_RATING_DISPLAY} ★ auf Google`,
        description: `${GOOGLE_RATING.count} Bewertungen – alle mit 5 Sternen.`,
    },
    {
        icon: Clock,
        title: "Schnelle Termine",
        description: "Zeitnahe Vor-Ort-Beratung, flexible Ausführung.",
    },
    {
        icon: Handshake,
        title: "Faire Preise",
        description: "Transparente Angebote ohne versteckte Kosten.",
    },
];

export default function FensterserviceVorteile() {
    return (
        <>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Icon-Visual statt CEO-Bild */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Großes visuelles Icon-Element */}
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Hintergrund-Ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 animate-pulse" />
                            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-blue/10 to-transparent" />

                            {/* Zentrales Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center shadow-2xl shadow-brand-blue/30">
                                    <ShieldCheck className="text-white w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Floating Badges um das Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-4 right-4 md:top-8 md:right-8 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2"
                            >
                                <Award className="text-brand-text" size={20} />
                                <span className="text-sm font-semibold">13+ Jahre</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2"
                            >
                                <Star className="text-yellow-500" size={20} />
                                <span className="text-sm font-semibold">{GOOGLE_RATING_DISPLAY} ★</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-16 right-0 md:bottom-20 md:right-4 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2"
                            >
                                <BadgeCheck className="text-emerald-500" size={20} />
                                <span className="text-sm font-semibold">HÖNING Partner</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text-Seite */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-text text-sm font-medium"
                        >
                            Warum Ergart?
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                        >
                            Ihr Vertrauenspartner für Fensterservice
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground mb-10"
                        >
                            Alexander Ergart steht für Qualität, Zuverlässigkeit und
                            persönlichen Service. Als Ihr lokaler Experte verbinden wir
                            handwerkliches Können mit Premium-Produkten.
                        </motion.p>

                        {/* Vorteile Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {vorteile.map((vorteil, index) => (
                                <motion.div
                                    key={vorteil.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                        <vorteil.icon className="text-brand-text" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            {vorteil.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {vorteil.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
        </>
    );
}
