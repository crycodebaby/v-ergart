// src/components/PortfolioGallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { alleReferenzen, ReferenzBild } from "@/lib/referenzen-data";
import { Button } from "@/components/ui/button";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const filters = ["Alle", "Bau & Montage", "Innenausbau", "Reinigung", "Garten"];

export const PortfolioGallery = () => {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [filteredImages, setFilteredImages] = useState<ReferenzBild[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (activeFilter === "Alle") {
      setFilteredImages(alleReferenzen);
    } else {
      setFilteredImages(
        alleReferenzen.filter((image) => image.category === activeFilter)
      );
    }
  }, [activeFilter]);

  const openLightbox = (imageSrc: string) => {
    const imageIndex = filteredImages.findIndex((img) => img.src === imageSrc);
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        {/* Filter-Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Die animierte Galerie */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer aspect-[3/4]"
                onClick={() => openLightbox(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-4 text-white transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <h3 className="font-bold">{img.title}</h3>
                  <p className="text-sm opacity-80">{img.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={filteredImages.map((img) => ({ src: img.src }))}
        index={lightboxIndex}
      />
    </section>
  );
};
