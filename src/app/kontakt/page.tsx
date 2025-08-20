// src/app/kontakt/page.tsx
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function KontaktPage() {
  return (
    <>
      {/* Stufe 1: Der visuelle Einstieg */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="/bilder_ordner/office-ergart.webp"
          alt="Büro und Zentrale von Alexander Ergart"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Nehmen Sie Kontakt auf
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
            Wir sind bereit für Ihr Anliegen.
          </p>
        </div>
      </section>

      {/* Stufe 2: Der Dialog-Bereich */}
      <div className="bg-slate-50 dark:bg-zinc-900">
        <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Linke Spalte: Formular */}
            <div>
              <ContactForm />
            </div>

            {/* Rechte Spalte: Persönliche Visitenkarte */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/bilder_ordner/kontakt/team_ergart.webp"
                  alt="Das Team von Alexander Ergart"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Ihr direktes Team
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Für persönliche Anliegen oder eine schnelle Auskunft erreichen
                  Sie uns auch direkt. Wir freuen uns auf Sie.
                </p>
              </div>
              <div className="space-y-4 text-foreground">
                <a
                  href="tel:+4917666825889"
                  className="flex items-center gap-4 group"
                >
                  <Phone className="text-brand-blue" size={20} />
                  <span className="group-hover:text-brand-blue transition-colors">
                    +49 176 668 25 889
                  </span>
                </a>
                <a
                  href="mailto:aergart@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <Mail className="text-brand-blue" size={20} />
                  <span className="group-hover:text-brand-blue transition-colors">
                    aergart@gmail.com
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <MapPin className="text-brand-blue" size={20} />
                  <span>Further Straße 89B, 41462 Neuss</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
