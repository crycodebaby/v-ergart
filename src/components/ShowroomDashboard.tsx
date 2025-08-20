// src/components/ShowroomDashboard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ShowroomCard = ({
  href,
  image,
  title,
  subtitle,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
}) => (
  <Link
    href={href}
    className="group relative block w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
  >
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 p-8 text-white">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl font-bold"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-2 text-slate-200"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 flex items-center gap-2 text-brand-blue font-semibold transition-transform duration-300 group-hover:translate-x-1"
      >
        Details entdecken <ArrowRight size={20} />
      </motion.div>
    </div>
  </Link>
);

export const ShowroomDashboard = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Der Showroom für Ihr Zuhause
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          Entdecken Sie unsere Premium-Lösungen für Fenster und Türen. Jedes
          Produkt ist ein Versprechen für Qualität, Sicherheit und Ästhetik –
          fachgerecht montiert von Ihrem Partner in Neuss.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShowroomCard
            href="/fenster"
            image="/bilder_ordner/hoening/fenster/fenster1.webp"
            title="Fenster"
            subtitle="Mehr Licht, Wärme und Sicherheit."
          />
          <ShowroomCard
            href="/tueren"
            image="/bilder_ordner/hoening/tueren/aluminium-tuer1.webp"
            title="Türen"
            subtitle="Der perfekte Eingang für Ihr Zuhause."
          />
        </div>
      </div>
    </section>
  );
};
