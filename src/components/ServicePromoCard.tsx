import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServicePromoCard() {
    return (
        <div className="bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 border border-brand-blue/20 p-6 rounded-xl shadow-sm relative overflow-hidden group">
            {/* Decorative Background Element */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all duration-500" />

            <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-blue mb-4 border border-brand-blue/20">
                    <Star size={12} className="fill-brand-blue" />
                    Tipp vom Experten
                </div>

                <h3 className="font-bold text-lg text-foreground mb-2">
                    Planen Sie auch neue Fenster?
                </h3>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Kombinieren Sie Ihre Renovierung mit modernen Energiespar-Fenstern von HÖNING.
                    Wir beraten Sie gerne zu Förderungen und Einsparpotenzialen.
                </p>

                <Button asChild className="w-full shadow-md hover:shadow-lg transition-all" size="sm">
                    <Link href="/fenster">
                        Zu den Fenstern
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>

                <div className="mt-3 text-center">
                    <Link href="/fensterservice" className="text-xs text-muted-foreground hover:text-brand-blue underline underline-offset-2">
                        Oder direkt zum Fensterservice
                    </Link>
                </div>
            </div>
        </div>
    );
}
