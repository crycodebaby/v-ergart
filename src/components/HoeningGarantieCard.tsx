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
/**
 * Welle 2D.1 (Befund M3): vollstaendig auf semantische Rollen migriert.
 * Bewusst NICHT ersetzt bleiben emerald (Garantie = Erfolg) und amber
 * (Wartung = Hinweis) — das sind echte semantische Rollen, keine
 * Ersatzfarben fuer fehlende Tokens. Ihre Abstufung ist Absicht:
 * 600/400 fuer Icons (dekorativ, Kontrastausnahme), 700/300 fuer die
 * Ziffer "10", die echter Text ist.
 */
export default function HoeningGarantieCard() {
    return (
        <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
                    <div className="grid lg:grid-cols-2">

                        {/* Left Column: Visuals */}
                        <div className="relative min-h-[400px] lg:min-h-full bg-muted">
                            <Image
                                src="/bilder_ordner/hoening/fenster/fenster1.webp"
                                alt="HÖNING Fenster Detailansicht - Hochwertige Verarbeitung"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Badges on Image */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                                <div className="bg-card/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent dark:border-white/10">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-muted-foreground uppercase tracking-wider font-semibold">Garantie</span>
                                        <span className="block text-lg font-bold text-foreground">10 Jahre</span>
                                    </div>
                                </div>

                                <div className="bg-card/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent dark:border-white/10">
                                    <div className="p-2 bg-brand/10 text-brand-text rounded-lg">
                                        <QrCode size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-muted-foreground uppercase tracking-wider font-semibold">Digital</span>
                                        <span className="block text-lg font-bold text-foreground">HÖNING-ID</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-text text-sm font-medium mb-4">
                                    <Sparkles size={16} />
                                    <span>Premium Service inklusive</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                                    Sicherheit, die bleibt. <br />
                                    <span className="text-brand-text">Automatisch & Digital.</span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Wir setzen auf Qualität „Made in Germany“. Mit HÖNING Fenstern & Türen erhalten Sie nicht nur langlebige Produkte, sondern ein umfassendes Sicherheitsversprechen.
                                </p>
                            </div>

                            <div className="space-y-6 mb-8">
                                {/* Feature 1: Warranty */}
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                                            10
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">Jahre Herstellergarantie</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Auf Fenster, Türen und Verglasung. (3 Jahre auf bewegliche/elektrische Teile wie Rollläden). Deckt Material- & Konstruktionsfehler ab.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2: Digital ID */}
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand-text shrink-0">
                                            <Smartphone size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">Smarte HÖNING-ID</h3>
                                        <p className="text-sm text-muted-foreground">
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
                                        <h3 className="font-semibold text-foreground text-lg">Inklusive Wartungs-Check</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Als Ihr Service-Partner bieten wir jährliche Inspektionen an. Damit bleibt Ihre Garantie sicher erhalten und die Funktion dauerhaft perfekt.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/kontakt">
                                    <Button className="w-full sm:w-auto bg-primary hover:bg-brand-solid-hover text-primary-foreground shadow-md">
                                        Beratung & Garantie sichern
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                {/* Feste weiße Plakette in Light UND Dark Mode – kein dark:invert,
                                    das würde den roten Akzent im Logo türkis färben. */}
                                <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg ring-1 ring-black/5">
                                    <Image
                                        src="/bilder_ordner/coop/hoening.png"
                                        alt="HÖNING Logo"
                                        width={80}
                                        height={24}
                                        className="h-6 w-auto"
                                    />
                                    <span className="text-xs text-zinc-600 border-l pl-3 border-zinc-200">Offizieller Partner</span>
                                </div>
                            </div>

                        </div>
                    </div>
        </div>
    );
}
