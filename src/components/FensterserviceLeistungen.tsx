// src/components/FensterserviceLeistungen.tsx
"use client";

import { motion } from "framer-motion";
import {
    Wrench,
    RefreshCw,
    Settings,
    Shield,
    Thermometer,
    Ruler,
} from "lucide-react";

/**
 * Leistungsübersicht für die Fensterservice Landing Page
 * 
 * Zeigt die Kernleistungen im Bereich Fensterservice/Fensterbau
 * mit Icons und kurzen Beschreibungen.
 */

const leistungen = [
    {
        icon: Ruler,
        title: "Fenstermontage & Einbau",
        description:
            "Professioneller Einbau neuer Fenster mit präziser Ausrichtung und fachgerechter Abdichtung.",
        link: "/fenster", // Internal Link
    },
    {
        icon: RefreshCw,
        title: "Fensteraustausch",
        description:
            "Austausch alter Fenster gegen moderne, energieeffiziente Modelle für bessere Wärmedämmung.",
    },
    {
        icon: Wrench,
        title: "Reparatur & Instandhaltung",
        description:
            "Schnelle Reparatur bei Beschädigungen, klemmenden Rahmen oder defekten Beschlägen.",
    },
    {
        icon: Settings,
        title: "Fenstereinstellen & Wartung",
        description:
            "Regelmäßige Wartung und präzises Einstellen für dauerhaft leichtgängige Bedienung.",
    },
    {
        icon: Thermometer,
        title: "Dichtungen & Isolierung",
        description:
            "Erneuerung von Dichtungen zur Vermeidung von Zugluft und Energieverlusten.",
    },
    {
        icon: Shield,
        title: "Sicherheit & Einbruchschutz",
        description:
            "Nachrüstung von Sicherheitsbeschlägen und einbruchhemmenden Elementen.",
        link: "/tueren", // Internal Link to Doors/Security
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function FensterserviceLeistungen() {
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
                        Unser Leistungsspektrum
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        Fensterservice aus einer Hand
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Von der Montage bis zur Wartung – wir kümmern uns um alle Aspekte
                        rund um Ihre Fenster in Neuss und Umgebung.
                    </motion.p>
                </div>

                {/* Leistungs-Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {leistungen.map((leistung) => {
                        const CardContent = (
                            <motion.div
                                key={leistung.title}
                                variants={itemVariants}
                                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-brand-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/5 h-full"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 mb-5 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <leistung.icon
                                        size={28}
                                        className="text-brand-text group-hover:text-white transition-colors"
                                    />
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                                    {leistung.title}
                                    {/* Optional Arrow for links */}
                                    {(leistung as any).link && (
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-text text-sm">
                                            ↗
                                        </span>
                                    )}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {leistung.description}
                                </p>
                            </motion.div>
                        );

                        return (leistung as any).link ? (
                            <a href={(leistung as any).link} key={leistung.title} className="block h-full">
                                {CardContent}
                            </a>
                        ) : (
                            CardContent
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="#kontakt-formular"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-brand-solid-hover transition-all duration-300 hover:scale-[1.02]"
                    >
                        Kostenlose Beratung anfragen
                    </a>
                </motion.div>
        </>
    );
}
