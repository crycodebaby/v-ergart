// src/components/HoeningGarantieCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, QrCode, Smartphone, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * HoeningGarantieCard Component
 * 
 * Stellt die 10-Jahres-Garantie von HÖNING und den digitalen Service (QR-Code) vor.
 * Hebt die jährliche Wartung durch Ergart hervor.
 */
export default function HoeningGarantieCard() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-background -z-20"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="bg-white dark:bg-slate-900 border border-border/50 dark:border-slate-700/50 rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid lg:grid-cols-2">

                        {/* Left Column: Visuals */}
                        <div className="relative min-h-[400px] lg:min-h-full bg-slate-100 dark:bg-slate-800">
                            <Image
                                src="/bilder_ordner/hoening/fenster/fenster1.webp"
                                alt="HÖNING Fenster Detailansicht - Hochwertige Verarbeitung"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Badges on Image */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent dark:border-white/10">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Garantie</span>
                                        <span className="block text-lg font-bold text-slate-900 dark:text-white">10 Jahre</span>
                                    </div>
                                </div>

                                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent dark:border-white/10">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <QrCode size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Digital</span>
                                        <span className="block text-lg font-bold text-slate-900 dark:text-white">HÖNING-ID</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium mb-4">
                                    <Sparkles size={16} />
                                    <span>Premium Service inklusive</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                    Sicherheit, die bleibt. <br />
                                    <span className="text-brand-blue">Automatisch & Digital.</span>
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Wir setzen auf Qualität „Made in Germany“. Mit HÖNING Fenstern & Türen erhalten Sie nicht nur langlebige Produkte, sondern ein umfassendes Sicherheitsversprechen.
                                </p>
                            </div>

                            <div className="space-y-6 mb-8">
                                {/* Feature 1: Warranty */}
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                                            10
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Jahre Herstellergarantie</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Auf Fenster, Türen und Verglasung. (3 Jahre auf bewegliche/elektrische Teile wie Rollläden). Deckt Material- & Konstruktionsfehler ab.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2: Digital ID */}
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                            <Smartphone size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Smarte HÖNING-ID</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Jedes Element hat einen QR-Code. Scannen Sie diesen, um sofort alle technischen Daten, Ersatzteile oder den Garantiestatus abzurufen.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3: Maintenance */}
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                                            <CheckCircle2 size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Inklusive Wartungs-Check</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Als Ihr Service-Partner bieten wir jährliche Inspektionen an. Damit bleibt Ihre Garantie sicher erhalten und die Funktion dauerhaft perfekt.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/kontakt">
                                    <Button className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md">
                                        Beratung & Garantie sichern
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-border/50">
                                    <Image
                                        src="/bilder_ordner/coop/hoening.png"
                                        alt="HÖNING Logo"
                                        width={80}
                                        height={24}
                                        className="h-6 w-auto opacity-80 dark:invert dark:opacity-100"
                                    />
                                    <span className="text-xs text-muted-foreground dark:text-slate-400 border-l pl-3 border-border">Offizieller Partner</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
