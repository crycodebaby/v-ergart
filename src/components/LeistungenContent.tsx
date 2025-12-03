// src/components/LeistungenContent.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DoorOpen, Paintbrush, Leaf, Wrench, Home, Shield, ArrowRight } from "lucide-react";

const coreServices = [
  {
    title: "Fenster- & Türmontage",
    description:
      "Hochwertige HÖNING Fenster und Türen. Effizient, sauber und fachgerecht für ein spürbar besseres Zuhause.",
    icon: DoorOpen,
    link: "/fenster",
    image: "/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Innenausbau & Renovierung",
    description:
      "Böden, Wände, Decken – wir realisieren Trockenbau und frische Anstriche. Von der Idee bis zum bezugsfertigen Raum.",
    icon: Paintbrush,
    link: "/leistungen/innenausbau",
    image: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Garten- & Landschaftspflege",
    description:
      "Wir gestalten neue Grünflächen und pflegen bestehende Anlagen mit verlässlichen Intervallen.",
    icon: Leaf,
    link: "/leistungen/gartenpflege",
    image: "/bilder_ordner/leistungen/gartenpflege.webp",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Hausmeisterdienste",
    description:
      "Zuverlässige Betreuung Ihrer Immobilie. Kontrollen, Reparaturen, Winterdienst und Handwerker-Koordination.",
    icon: Wrench,
    link: "/leistungen/hausmeister",
    image: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "Gebäudereinigung",
    description:
      "Makellose Sauberkeit für Privat und Gewerbe mit geschultem Team und klaren Qualitätsstandards.",
    icon: Home,
    link: "/leistungen/reinigung",
    image: "/bilder_ordner/leistungen/objektreinigung.webp",
    gradient: "from-sky-500/20 to-blue-500/20",
  },
  {
    title: "Sicherheitstechnik",
    description:
      "Moderne Schließsysteme und wirksamer Einbruchschutz. Beratung, fachgerechter Einbau und Einweisung inklusive.",
    icon: Shield,
    link: "/leistungen/sicherheit",
    image: "/bilder_ordner/leistungen/arbeitsschutz.webp",
    gradient: "from-red-500/20 to-rose-500/20",
  },
] as const;

export function LeistungenContent() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Unsere Kernkompetenzen
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ein breites Spektrum an Dienstleistungen, zugeschnitten auf höchste Qualität, 
            Zuverlässigkeit und Ihre individuellen Bedürfnisse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.link} className="group block h-full">
                  <div className="relative h-full bg-card border border-border/40 rounded-xl overflow-hidden hover:border-brand-blue/50 hover:shadow-2xl transition-all duration-300">
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-brand-blue" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-brand-blue font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-blue-500 to-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
