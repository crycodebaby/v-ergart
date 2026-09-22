// src/components/FensterserviceKontakt.tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

/**
 * Kontakt-Sektion der SERVICE-Seite /fensterservice.
 *
 * Batch 2: Ueberschrift lautete "Bereit für neue Fenster?" – das war der
 * Verkaufs-Intent auf der Reparaturseite und damit genau die Vermischung,
 * die dieser Batch aufloest. Auch die Auswahlliste im Formular fragt jetzt
 * nach dem Defekt, nicht nach dem Wunschprodukt.
 *
 * 
 * Enthält direktes Kontaktformular (statt Link zu /kontakt)
 * für maximale Conversion-Rate.
 * 
 * Bewusst minimal: Headline · Formular · WhatsApp. Telefon & Zeiten
 * stehen im Header bzw. Hero.
 */

export default function FensterserviceKontakt() {
    return (
        <div className="relative z-10 mx-auto max-w-4xl">
                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-text border border-brand-blue/20">
                            <MessageCircle size={18} />
                            <span className="text-sm font-medium">Reparatur &amp; Wartung anfragen</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Fenster klemmt, zieht oder schließt nicht?
                        </h2>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Schildern Sie kurz, was nicht stimmt – wir melden uns zeitnah
                            mit einem Termin.
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
                                "Fensterreparatur",
                                "Fenster einstellen / Wartung",
                                "Dichtungen erneuern",
                                "Beschlag defekt",
                                "Türservice",
                            ]}
                            source="Fensterservice Landingpage"
                        />
                    </motion.div>

                    {/* Alternative: Foto per WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <WhatsAppButton
                            label="Foto per WhatsApp senden"
                            iconSize={24}
                            className="px-6 py-3 border-emerald-500/40 hover:border-emerald-500/60"
                        />
                    </motion.div>
        </div>
    );
}
