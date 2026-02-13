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
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-background dark:from-emerald-950/20 dark:via-blue-950/10 dark:to-background relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            <Leaf size={18} />
                            <span className="text-sm font-medium">Nachhaltig & Wirtschaftlich</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Energieeinspar-Rechner von{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
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
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                    <TrendingDown size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Kosten senken</h3>
                                    <p className="text-sm text-muted-foreground">Heizkosten nachhaltig reduzieren</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Umwelt schonen</h3>
                                    <p className="text-sm text-muted-foreground">CO₂-Ausstoß verringern</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                    <Euro size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Wert steigern</h3>
                                    <p className="text-sm text-muted-foreground">Immobilienwert erhöhen</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
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
                                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group"
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

                            {/* HÖNING Logo Overlay */}
                            <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                                <Image
                                    src="/bilder_ordner/hoening/hoening.png"
                                    alt="HÖNING Logo - Offizieller Partner"
                                    width={100}
                                    height={40}
                                    className="h-8 w-auto"
                                />
                            </div>

                            {/* Info Badge */}
                            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-emerald-600/95 to-blue-600/95 backdrop-blur-md text-white p-4 rounded-xl shadow-lg">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Calculator size={18} />
                                    HÖNING Qualität: 10 Jahre Garantie bei regelmäßiger Wartung
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-200/30 dark:bg-emerald-800/30 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-2xl"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
