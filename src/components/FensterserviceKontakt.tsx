// src/components/FensterserviceKontakt.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

/**
 * Kontakt-Sektion für die Fensterservice Landing Page
 * 
 * Enthält direktes Kontaktformular (statt Link zu /kontakt)
 * für maximale Conversion-Rate.
 * 
 * Tracking-Attribute:
 * - data-track="call-fensterservice-bottom" auf Telefon-Button
 * - Form-Submit erfolgt über ContactForm (Formcarry)
 */

export default function FensterserviceKontakt() {
    return (
        <section
            id="kontakt-formular"
            className="py-20 md:py-28 bg-background relative overflow-hidden"
        >
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                            <MessageCircle size={18} />
                            <span className="text-sm font-medium">Kostenlose Beratung</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Bereit für neue Fenster?
                        </h2>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Senden Sie uns eine unverbindliche Anfrage. Wir melden uns zeitnah
                            bei Ihnen und besprechen Ihr Projekt.
                        </p>
                    </motion.div>

                    {/* Contact Form eingebettet */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <ContactForm
                            customServices={[
                                "Fensterelemente (HÖNING Qualität)",
                                "Fensterreparatur & Wartung",
                                "Haustür / Nebeneingangstür (HÖNING)"
                            ]}
                            source="Fensterservice Landingpage"
                        />

                        {/* HÖNING Qualitätshinweis */}
                        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                            <p className="text-sm text-muted-foreground text-center">
                                <strong className="text-foreground">HÖNING Leipzig:</strong> Deutsche Wertarbeit
                                mit 10 Jahren Garantie bei regelmäßiger Inspektion durch Ergart&apos;s Fensterservice oder HÖNING
                            </p>
                        </div>
                    </motion.div>

                    {/* Alternative: Direkt anrufen */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <p className="text-sm text-muted-foreground mb-4">
                            Oder rufen Sie uns direkt an:
                        </p>
                        <a
                            href="tel:+4917666825889"
                            id="fensterservice-phone-cta-bottom"
                            data-track="call-fensterservice-bottom"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        >
                            <Phone size={20} />
                            0176 668 25 889
                        </a>
                    </motion.div>

                    {/* Verfügbarkeit */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center text-muted-foreground text-sm"
                    >
                        Mo–Fr 08:00–12:00 & 13:00–16:00 Uhr erreichbar
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
