// src/components/ReferenzenHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  title?: string; // Optionaler Titel
  description?: string; // Optionale Beschreibung
  imageSrc?: string; // Optionales Bild, Standard ist das Titelbild
  heightClass?: string; // Optionale Höhenklasse, Standard ist h-[50vh]
  children?: React.ReactNode; // Optionaler Child-Content
};

export default function ReferenzenHero({
  title = "Ihre Vision, unsere Expertise", // Standardtitel
  description = "Entdecken Sie die Vielfalt unserer abgeschlossenen Projekte und überzeugen Sie sich von unserer Qualität.", // Standardbeschreibung
  imageSrc = "/bilder_ordner/referenzen/titelbild.webp", // Standardbild
  heightClass = "h-[50vh]",
  children,
}: Props) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 dark:from-background dark:to-zinc-950",
        heightClass
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          // Parallax-Effekt: Bild bewegt sich langsamer als der Scroll
          style={{ transform: "translateY(var(--parallax-translate-y))" }}
        />
        <div className="absolute inset-0 bg-black/40" />{" "}
        {/* Leichte Verdunkelung */}
      </div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl drop-shadow-md"
        >
          {description}
        </motion.p>
        {children}
      </div>
    </section>
  );
}
