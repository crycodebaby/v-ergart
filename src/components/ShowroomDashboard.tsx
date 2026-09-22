// src/components/ShowroomDashboard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// NEUE Sub-Komponente für die Split-Screen-Panels
const ShowroomPanel = ({
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
    className="group relative block w-full h-full overflow-hidden"
  >
    <Image
      src={image}
      alt={title}
      fill
      priority // Wichtig für schnelle Ladezeit der Hauptbilder
      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
    />
    {/* Overlay für Kontrast */}
    <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/40" />

    <div className="absolute bottom-0 left-0 p-8 text-white">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="mt-2 text-slate-200">{subtitle}</p>
      <div className="mt-4 flex items-center gap-2 text-brand-blue font-semibold transition-transform duration-300 group-hover:translate-x-1">
        Details entdecken <ArrowRight size={20} />
      </div>
    </div>
  </Link>
);

// Die NEUE ShowroomDashboard-Komponente
export const ShowroomDashboard = () => {
  return (
    <section className="relative w-full h-[calc(100vh-144px)] min-h-[700px]">
      {/* Zentraler Text-Hub – pointer-events-none: der Wrapper überdeckt die
          gesamte Fläche und würde sonst Klicks/Hover der Panels darunter schlucken. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl text-center bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-border/60 shadow-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Der Showroom für Ihr Zuhause
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            Entdecken Sie unsere Premium-Lösungen. Jedes Produkt ist ein
            Versprechen für Qualität, Sicherheit und Ästhetik.
          </p>
        </motion.div>
      </div>

      {/* Die beiden Split-Screen-Panels */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <ShowroomPanel
          href="/fenster"
          image="/bilder_ordner/hoening/fenster/fenster1.webp"
          title="Neue Fenster"
          subtitle="Fensteraustausch, Aufmaß und Montage."
        />
        <ShowroomPanel
          href="/tueren"
          image="/bilder_ordner/hoening/tueren/aluminium-tuer1.webp"
          title="Türen"
          subtitle="Der perfekte Eingang für Ihr Zuhause."
        />
      </div>
    </section>
  );
};
