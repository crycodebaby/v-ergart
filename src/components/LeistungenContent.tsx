// src/components/LeistungenContent.tsx
"use client"; // Diese Komponente ist für den Browser bestimmt

import Link from "next/link";
import { motion } from "framer-motion"; // Der Import ist HIER sicher
import { TerrassenFensterSlider } from "@/components/TerrassenFensterSlider";
import { HoeningShowroom } from "@/components/HoeningShowroom";
import { DoorOpen, Paintbrush, Leaf, Wrench, Home, Shield } from "lucide-react";

const coreServices = [
  {
    title: "Fenster- & Türmontage",
    description:
      "Von der Beratung bis zum fachgerechten Einbau – wir liefern und montieren energieeffiziente Fenster und Türen in Höning-Qualität.",
    icon: DoorOpen,
    link: "/fenster",
  },
  {
    title: "Innenausbau & Renovierung",
    description:
      "Bodenverlegung, Trockenbau, Malerarbeiten – wir verwandeln Ihre Räume und schaffen ein neues Wohngefühl.",
    icon: Paintbrush,
    link: "/leistungen#innenausbau",
  },
  {
    title: "Garten- & Landschaftspflege",
    description:
      "Von der Neuanlage bis zur regelmäßigen Pflege – Ihr Garten ist bei uns in besten Händen. Wir schaffen grüne Oasen.",
    icon: Leaf,
    link: "/leistungen#gartenpflege",
  },
  {
    title: "Hausmeisterdienste",
    description:
      "Rundum-Service für Ihre Immobilie. Kleinreparaturen, Wartung und Objektbetreuung – wir kümmern uns um alles.",
    icon: Wrench,
    link: "/leistungen#hausmeister",
  },
  {
    title: "Gebäudereinigung",
    description:
      "Professionelle Reinigung für makellose Sauberkeit in privaten und gewerblichen Objekten. Glas-, Grund- und Unterhaltsreinigung.",
    icon: Home,
    link: "/leistungen#reinigung",
  },
  {
    title: "Sicherheitstechnik",
    description:
      "Schutz für Ihr Zuhause und Ihr Unternehmen. Wir beraten Sie zu modernen Schließsystemen und Einbruchschutz.",
    icon: Shield,
    link: "/leistungen#sicherheit",
  },
];

export function LeistungenContent() {
  return (
    <section className="py-24 bg-gradient-to-br from-background to-slate-50 dark:from-background dark:to-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Unsere Kernkompetenzen im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Wir bieten ein breites Spektrum an Dienstleistungen, die stets auf
            höchste Qualität, Zuverlässigkeit und Ihre individuellen Bedürfnisse
            zugeschnitten sind.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-lg border border-border flex flex-col items-center text-center group"
              >
                <div className="p-4 bg-brand-blue/10 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-brand-blue" size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="text-brand-blue hover:underline font-semibold mt-auto"
                >
                  Mehr erfahren
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
