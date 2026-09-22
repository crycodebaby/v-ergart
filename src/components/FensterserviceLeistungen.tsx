// src/components/FensterserviceLeistungen.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Wrench,
    Settings,
    Shield,
    Thermometer,
    ClipboardCheck,
    PanelTop,
    ArrowRight,
} from "lucide-react";

/**
 * Leistungsuebersicht der SERVICE-Seite /fensterservice.
 *
 * Batch 2: Die Liste stand vorher mit "Fenstermontage & Einbau" und
 * "Fensteraustausch" an Position 1 und 2 – also mit zwei Verkaufsleistungen
 * an der Spitze einer Reparaturseite. Genau das hat /fensterservice und
 * /fenster gegeneinander laufen lassen.
 *
 * Jetzt beschreiben alle sechs Karten Arbeiten am BESTEHENDEN Fenster. Der
 * Austausch ist nicht verschwunden, sondern steht als bewusster Abzweig
 * unter dem Raster – dort, wo er im Kundengespraech auch faellt: wenn sich
 * eine Reparatur nicht mehr rechnet.
 *
 * Inhaltliche Grenze: Es werden keine neuen Leistungen erfunden. Alle
 * Punkte waren bereits vorher als Leistung der Firma dokumentiert.
 */

const leistungen = [
    {
        icon: Settings,
        title: "Fenster einstellen & justieren",
        description:
            "Abgesackte Flügel, schwergängige Griffe, falscher Anpressdruck: Wir stellen den Beschlag präzise neu ein.",
    },
    {
        icon: Thermometer,
        title: "Dichtungen erneuern",
        description:
            "Poröse oder zusammengedrückte Dichtungen lassen Zugluft und Wärme durch. Wir tauschen sie fachgerecht aus.",
    },
    {
        icon: Wrench,
        title: "Beschläge reparieren & ersetzen",
        description:
            "Defekte Griffe, Scheren und Verriegelungen ersetzen wir – meist deutlich günstiger als ein neues Element.",
    },
    {
        icon: PanelTop,
        title: "Klemmende Fenster gangbar machen",
        description:
            "Wenn sich der Flügel nicht mehr sauber schließen lässt, finden wir die Ursache und bringen ihn wieder in Position.",
    },
    {
        icon: ClipboardCheck,
        title: "Wartung & Funktionscheck",
        description:
            "Jährlicher Check: Beschläge prüfen und fetten, Dichtungen kontrollieren, Flügel nachjustieren.",
    },
    {
        icon: Shield,
        title: "Sicherheit nachrüsten",
        description:
            "Nachrüstung von Sicherheitsbeschlägen und einbruchhemmenden Bauteilen an vorhandenen Fenstern.",
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
                        Reparatur · Wartung · Einstellung
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        Was wir an Ihrem Fenster machen
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Instandsetzung und Wartung bestehender Fenster in Neuss und
                        Umgebung – schnell, sauber und ohne dass gleich alles raus muss.
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
                    {leistungen.map((leistung) => (
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
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Text */}
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {leistung.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {leistung.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Abzweig zum Verkaufs-Intent: Wenn sich Reparieren nicht mehr
                    rechnet, gehoert der Besucher auf /fenster – nicht in ein
                    zweites Angebot auf dieser Seite. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6 md:p-8"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Wenn sich die Reparatur nicht mehr lohnt
                            </h3>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                Ist der Rahmen selbst am Ende, beschlägt die Scheibe von
                                innen oder steckt noch Einfachverglasung im Haus, beraten
                                wir Sie zum Austausch – mit Aufmaß und Angebot.
                            </p>
                        </div>
                        <Link
                            href="/fenster"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-brand-solid-hover"
                        >
                            Neue Fenster &amp; Fensteraustausch
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </div>
                </motion.div>

                {/* CTA in den Reparatur-Intent */}
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
                        Reparatur-Termin anfragen
                    </a>
                </motion.div>
        </>
    );
}
