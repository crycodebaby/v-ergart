// src/components/FensterserviceAblauf.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardCheck, FileText, Hammer } from "lucide-react";

/**
 * Prozess-Darstellung für die Fensterservice Landing Page
 * 
 * Zeigt den Ablauf in 4 einfachen Schritten:
 * 1. Anfrage → 2. Beratung → 3. Angebot → 4. Ausführung
 */

const schritte = [
    {
        icon: Phone,
        nummer: "01",
        title: "Anfrage",
        description:
            "Kontaktieren Sie uns per Telefon oder Formular. Schildern Sie kurz, was am Fenster nicht stimmt.",
    },
    {
        icon: ClipboardCheck,
        nummer: "02",
        title: "Vor-Ort-Termin",
        description:
            "Wir sehen uns das Fenster an und stellen fest, woran es tatsächlich liegt.",
    },
    {
        icon: FileText,
        nummer: "03",
        title: "Angebot",
        description:
            "Sie erhalten ein transparentes, unverbindliches Angebot ohne versteckte Kosten.",
    },
    {
        icon: Hammer,
        nummer: "04",
        title: "Instandsetzung",
        description:
            "Reparatur oder Wartung zum vereinbarten Termin – sauber und termingerecht.",
    },
];

export default function FensterserviceAblauf() {
    return (
        <>
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-text text-sm font-medium"
                    >
                        Einfacher Ablauf
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        So einfach geht&apos;s
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Von der ersten Anfrage bis zum wieder funktionierenden Fenster –
                        wir begleiten Sie durch jeden Schritt.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Verbindungslinie (Desktop) */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {schritte.map((schritt, index) => (
                            <motion.div
                                key={schritt.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative text-center"
                            >
                                {/* Step Circle */}
                                <div className="relative inline-flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-card border-2 border-brand-blue shadow-lg flex items-center justify-center mb-6 relative z-10">
                                        <schritt.icon className="text-brand-text" size={32} />
                                    </div>

                                    {/* Step Number */}
                                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                                        {schritt.nummer}
                                    </span>
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {schritt.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {schritt.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
        </>
    );
}
