// src/components/FensterserviceFAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FAQ-Sektion für die Fensterservice Landing Page
 * 
 * Häufige Fragen zu Kosten, Ablauf und Terminen.
 * Generiert automatisch FAQPage JSON-LD für Google Rich Snippets.
 */

const faqs = [
    {
        frage: "Was kostet ein neues Fenster inklusive Einbau?",
        antwort:
            "Die Kosten hängen von Größe, Material und Verglasung ab. Ein Standardfenster inkl. fachgerechter Montage beginnt bei ca. 400–600 €. Für ein genaues Angebot besichtigen wir kostenlos vor Ort.",
    },
    {
        frage: "Wie lange dauert der Einbau eines Fensters?",
        antwort:
            "Der Austausch eines einzelnen Fensters dauert in der Regel 2–4 Stunden. Bei mehreren Fenstern planen wir effizient, sodass Sie meist am selben Tag fertig montierte Fenster haben.",
    },
    {
        frage: "Bieten Sie auch Reparaturen an?",
        antwort:
            "Ja, wir reparieren klemmende Fenster, erneuern Dichtungen, tauschen Beschläge aus und stellen Fensterflügel nach. Oft ist eine Reparatur günstiger als ein Komplettaustausch.",
    },
    {
        frage: "In welchen Gebieten sind Sie tätig?",
        antwort:
            "Wir sind hauptsächlich in Neuss und im Umkreis von ca. 15–20 km tätig: Düsseldorf, Kaarst, Dormagen, Meerbusch, Korschenbroich und Grevenbroich.",
    },
    {
        frage: "Wie schnell bekomme ich einen Termin?",
        antwort:
            "In der Regel können wir innerhalb von 1–2 Wochen einen Beratungstermin anbieten. Bei dringenden Reparaturen versuchen wir, noch schneller zu reagieren.",
    },
    {
        frage: "Welche Fenstermarken verbauen Sie?",
        antwort:
            "Wir sind offizieller Partner von HÖNING – einem deutschen Premium-Hersteller. Die Fenster überzeugen durch höchste Qualität, Energieeffizienz und lange Lebensdauer.",
    },
];

// Hilfsfunktion für JSON-LD Export (wird in der Page verwendet)
export function getFAQJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.frage,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.antwort,
            },
        })),
    };
}

export default function FensterserviceFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-28 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium"
                        >
                            Häufige Fragen
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            FAQ zu Fensterservice & Fensterbau
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground"
                        >
                            Antworten auf die wichtigsten Fragen unserer Kunden.
                        </motion.p>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-border rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                                    aria-expanded={openIndex === index}
                                >
                                    <span className="font-semibold text-foreground pr-4">
                                        {faq.frage}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={cn(
                                            "shrink-0 text-muted-foreground transition-transform duration-200",
                                            openIndex === index && "rotate-180"
                                        )}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                                                {faq.antwort}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
