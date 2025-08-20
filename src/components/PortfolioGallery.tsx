// src/components/PortfolioGallery.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query"; // Unser neues Werkzeug!

const allImages = [
  {
    src: "/bilder_ordner/referenzen/gebaeudereiniger-neuss-bauelemente-transport.webp",
    title: "Bauelemente-Transport",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/treppenhausreinigung-neuss-kranarbeiten.webp",
    title: "Kranarbeiten",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/reinigungsservice-neuss-fensterbau.webp",
    title: "Fensterbau",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/der-hausmeister-profi-bauarbeiten.webp",
    title: "Bauarbeiten",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/bueroreinigung-neuss-verkleidung.webp",
    title: "Büroreinigung",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/gebaeudereiniger-neuss-renovierung.webp",
    title: "Renovierung",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/gebaeudereinigung-privathaushalt-neuss-fenster.webp",
    title: "Fensterreinigung",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/objektreinigung-neuss-transport.webp",
    title: "Objektreinigung",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/gartenpflege-neuss-renovierung.webp",
    title: "Gartenpflege",
    category: "Garten",
  },
  {
    src: "/bilder_ordner/referenzen/reinigungsservice-neuss-fensterjustierung.webp",
    title: "Fensterjustierung",
    category: "Bau & Montage",
  },
  {
    src: "/bilder_ordner/referenzen/grundreinigung-privat-neuss-fensterrahmen.webp",
    title: "Grundreinigung Privat",
    category: "Reinigung",
  },
  {
    src: "/bilder_ordner/referenzen/reinigungsdienst-neuss-fensteranlagen.webp",
    title: "Reinigung von Fensteranlagen",
    category: "Reinigung",
  },
];

const DesktopGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Verteile die Bilder auf drei Spalten
  const columns = [
    allImages.filter((_, i) => i % 3 === 0),
    allImages.filter((_, i) => i % 3 === 1),
    allImages.filter((_, i) => i % 3 === 2),
  ];

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yTransforms = [y1, y2, y3];

  return (
    <div
      ref={containerRef}
      className="hidden lg:grid grid-cols-3 gap-8 h-[250vh]"
    >
      {columns.map((columnImages, i) => (
        <motion.div
          key={i}
          className="flex flex-col gap-8 relative"
          style={{ y: yTransforms[i] }}
        >
          {columnImages.map((img, j) => (
            <div
              key={j}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={500}
                height={700}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold">{img.title}</h3>
                <p className="text-sm opacity-80">{img.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const MobileGallery = () => {
  return (
    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
      {allImages.map((img, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-xl shadow-lg group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={img.src}
            alt={img.title}
            width={500}
            height={700}
            className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold">{img.title}</h3>
            <p className="text-sm opacity-80">{img.category}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const PortfolioGallery = () => {
  // Wir fragen ab: Ist der Bildschirm breiter als 1024px?
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        {/* Hier ist die Magie: Wir rendern ENTWEDER die Desktop- ODER die Mobile-Version.
                   Aber da die Desktop-Version ihr eigenes Grid hat und die Mobile-Version auch, 
                   ist es sauberer, sie direkt in der Hauptkomponente zu rendern.
                 */}
        <DesktopGallery />
        <MobileGallery />
      </div>
    </section>
  );
};

export default PortfolioGallery;
