// src/components/FensterserviceKontakt.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

/**
 * CTA-Sektion für die Fensterservice Landing Page
 * 
 * Ersetzt das Kontaktformular durch einen klaren CTA
 * zur /kontakt Seite für höhere Conversion.
 * 
 * Tracking-Attribute:
 * - data-track="cta-fensterservice-contact" auf dem Button
 */

export default function FensterserviceKontakt() {
    return (
        <section
            id="kontakt-formular"
            className="py-20 md:py-28 bg-gradient-to-br from-brand-blue to-blue-700 relative overflow-hidden"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white"
                    >
                        <MessageCircle size={18} />
                        <span className="text-sm font-medium">Kostenlose Beratung</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        Bereit für neue Fenster?
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
                    >
                        Kontaktieren Sie uns für eine unverbindliche Beratung. Wir melden
                        uns zeitnah bei Ihnen und besprechen Ihr Projekt.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Primärer CTA: Zur Kontaktseite */}
                        <Link
                            href="/kontakt"
                            id="fensterservice-contact-cta"
                            data-track="cta-fensterservice-contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-blue font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        >
                            Jetzt Kontakt aufnehmen
                            <ArrowRight size={20} />
                        </Link>

                        {/* Sekundärer CTA: Direkt anrufen */}
                        <a
                            href="tel:+4917666825889"
                            id="fensterservice-phone-cta-bottom"
                            data-track="call-fensterservice-bottom"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
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
                        className="mt-8 text-white/70 text-sm"
                    >
                        Mo–Fr 08:00–12:00 & 13:00–16:00 Uhr erreichbar
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
