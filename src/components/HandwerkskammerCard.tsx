import Image from 'next/image';
import { cn } from "@/lib/utils";

interface HandwerkskammerCardProps {
    className?: string;
}

export function HandwerkskammerCard({ className }: HandwerkskammerCardProps) {
    return (
        // Welle 2D.1 (Befund M1): `my-8` entfernt — der vertikale Abstand zum
        // Geschwister-Block gehoert dem Container, nicht der Karte.
        // `max-w-4xl mx-auto` bleibt: das ist die fachliche Breite DIESER
        // Karte (sie soll bewusst schmaler sein als die Sektion), keine
        // Seitenbreite.
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <div className="overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-white to-orange-50/30 dark:from-zinc-900 dark:to-zinc-800/50 shadow-lg">
                <div className="p-0">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Logo Section */}
                        <div className="p-6 md:p-8 flex items-center justify-center bg-muted md:min-w-[200px]">
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                {/* Light Mode Logo */}
                                <Image
                                    src="/bilder_ordner/zertifikate/Handwerkskammer_Icon.jpeg"
                                    alt="Handwerkskammer Düsseldorf Logo"
                                    fill
                                    className="object-contain dark:hidden"
                                    sizes="(max-width: 768px) 128px, 160px"
                                />
                                {/* Dark Mode Logo (using the transparent initialen/white version if available, or fallback) */}
                                <Image
                                    src="/bilder_ordner/zertifikate/Handwerkskammer_HWK_Initialen_Transparente_buchstaben.png"
                                    alt="Handwerkskammer Düsseldorf Logo"
                                    fill
                                    className="object-contain hidden dark:block"
                                    sizes="(max-width: 768px) 128px, 160px"
                                />
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="p-6 md:p-8 text-center md:text-left flex-1 space-y-4">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Offizielles Mitglied der Handwerkskammer Düsseldorf
                                </h3>
                                <p className="text-orange-700 dark:text-orange-300 font-medium">
                                    Mitglied seit März 2018
                                </p>
                            </div>

                            <div className="space-y-2 text-zinc-600 dark:text-zinc-300 text-sm md:text-base">
                                <p>
                                    Als eingetragener Handwerksbetrieb garantieren wir Ihnen fachmännische Ausführung und höchste Qualitätsstandards.
                                </p>
                                <p className="hidden md:block">
                                    Alexander Ergart ist anerkannter Handwerker für Raumausstattung, Fenster- & Türenbau sowie Gebäudereinigung.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
