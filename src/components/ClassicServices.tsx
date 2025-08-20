"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wrench,
  TreePine,
  Brush,
  Wind,
  Snowflake,
  ShieldQuestion,
  Home,
  SprayCan,
} from "lucide-react";
import { ServiceFeature } from "./ServiceFeature";

const services = [
  {
    id: 0,
    icon: Wrench,
    title: "Kleinreparaturen & Instandhaltung",
    description:
      "Von der tropfenden Armatur bis zur klemmenden Tür – wir lösen die kleinen Probleme des Alltags schnell und zuverlässig, damit Sie sich um nichts sorgen müssen.",
    image: "/bilder_ordner/leistungen/kleinstreparaturen.webp",
  },
  {
    id: 1,
    icon: TreePine,
    title: "Garten- & Landschaftspflege",
    description:
      "Ihr Garten ist Ihre persönliche Oase. Wir sorgen mit professionellem Heckenschnitt, Rasenpflege und saisonaler Bepflanzung dafür, dass sie ganzjährig in voller Pracht erstrahlt.",
    image: "/bilder_ordner/leistungen/gartenpflege.webp",
  },
  {
    id: 2,
    icon: Brush,
    title: "Treppenhaus- & Objektreinigung",
    description:
      "Ein sauberes Treppenhaus ist die Visitenkarte Ihrer Immobilie. Wir garantieren streifenfreie Sauberkeit und einen gepflegten ersten Eindruck für Bewohner und Besucher.",
    image: "/bilder_ordner/leistungen/treppenreinigung.webp",
  },
  {
    id: 3,
    icon: Wind,
    title: "Professionelle Fensterreinigung",
    description:
      "Genießen Sie glasklare Aussichten ohne Schlieren und Streifen. Mit professionellem Werkzeug und Know-how bringen wir Licht in Ihre Räume.",
    image: "/bilder_ordner/leistungen/fensterreinigung.webp",
  },
  {
    id: 4,
    icon: Snowflake,
    title: "Zuverlässiger Winterdienst",
    description:
      "Sicherheit geht vor. Wir sorgen bei Schnee und Eis für geräumte Wege und zugängliche Flächen, damit Sie und Ihre Mieter sicher durch den Winter kommen.",
    image: "/bilder_ordner/leistungen/winterdienst.webp",
  },
  {
    id: 5,
    icon: ShieldQuestion,
    title: "Arbeitsschutz-Beratung",
    description:
      "Als zertifizierter Sicherheitsbeauftragter berate ich Sie praxisnah, um Risiken zu minimieren und ein sicheres Arbeitsumfeld für alle zu gewährleisten.",
    image: "/bilder_ordner/leistungen/arbeitsschutz.webp",
  },
];

const ClassicServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Der bewährte Hausmeisterservice
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Seit über 7 Jahren der zuverlässige Partner für Immobilien in Neuss.
            Wir vereinfachen Ihr Leben, indem wir uns um die Details kümmern.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-16">
            {services.map((service) => (
              <ServiceFeature
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>

          <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden hidden lg:block">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassicServices;
