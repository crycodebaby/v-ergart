// src/components/HoeningEnergierechner.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calculator, Leaf, Euro, Zap, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Höning Energieeinspar-Rechner Component
 * 
 * SEO-optimierte Komponente, die zum offiziellen Höning-Energierechner verlinkt.
 * Zeigt Nutzen von neuen Fenstern (Energieeinsparung, Kostenreduktion, Umweltschutz).
 * 
 * Verwendung auf: /leistungen, /fensterservice, /fenster
 */

export default function HoeningEnergierechner() {
    return (
        <div className="relative">

            <div className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-text border border-brand-blue/20">
                            <Leaf size={18} />
                            <span className="text-sm font-medium">Nachhaltig & Wirtschaftlich</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Energieeinspar-Rechner von{" "}
                            <span className="text-brand-text">
                                HÖNING
                            </span>
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Mit dem Höning-Energieeinsparrechner ermitteln Sie, wie viel Energie mit neuen
                            Fenstern im Vergleich zu alten Fenstern eingespart werden kann. Die Investition
                            in neue Fenster spart bares Geld und schont die Umwelt.
                        </p>

                        {/* Benefits Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-text">
                                    <TrendingDown size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Kosten senken</h3>
                                    <p className="text-sm text-muted-foreground">Heizkosten nachhaltig reduzieren</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-text">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Umwelt schonen</h3>
                                    <p className="text-sm text-muted-foreground">CO₂-Ausstoß verringern</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-text">
                                    <Euro size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Wert steigern</h3>
                                    <p className="text-sm text-muted-foreground">Immobilienwert erhöhen</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-text">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Effizienz</h3>
                                    <p className="text-sm text-muted-foreground">Moderne Wärmedämmung</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://www.hoening.de/service/konfiguratoren/energieeinsparrechner/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex"
                            >
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:bg-brand-solid-hover shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group"
                                >
                                    <Calculator className="mr-2" size={20} />
                                    Jetzt Einsparung berechnen
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                                </Button>
                            </a>

                            <p className="text-xs text-muted-foreground self-center">
                                Kostenlos & unverbindlich bei unserem Partner <strong>HÖNING</strong>
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Höning Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                            <Image
                                src="/bilder_ordner/hoening/fenster/hoening-zentrale-besuch/fenster-ausstellung3.webp"
                                alt="HÖNING Fenster Ausstellung - Hochwertige Fensterelemente für maximale Energieeffizienz"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* HÖNING Logo Overlay – bewusst festes Weiß statt Theme-Token:
                                das Logo ist dunkel auf transparent und braucht in Light UND
                                Dark Mode einen hellen Grund (wie die Partner-Plaketten). */}
                            <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-xl shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
                                <Image
                                    src="/bilder_ordner/coop/hoening.png"
                                    alt="HÖNING Logo - Offizieller Partner"
                                    width={100}
                                    height={40}
                                    className="h-8 w-auto"
                                />
                            </div>

                            {/* Info Badge */}
                            <div className="absolute bottom-4 left-4 right-4 bg-primary/95 backdrop-blur-md text-white p-4 rounded-xl shadow-lg">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Calculator size={18} />
                                    HÖNING Qualität: 10 Jahre Garantie bei regelmäßiger Wartung
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
