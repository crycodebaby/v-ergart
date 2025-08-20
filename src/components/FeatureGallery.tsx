// src/components/FeatureGallery.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Nur die Icons importieren, die wir nutzen
import {
  Lightbulb,
  ThermometerSun,
  ShieldCheck,
  Sparkles,
  Fingerprint,
} from "lucide-react";

// 1) Typsichere Icon-Map
const iconMap = {
  Lightbulb,
  ThermometerSun,
  ShieldCheck,
  Sparkles,
  Fingerprint,
};

// 2) Export: IconName für externe Nutzung (z. B. in Server Components)
export type IconName = keyof typeof iconMap;

// 3) Export: Props-Typ unter eindeutigem Namen
export type FeatureGalleryProps = {
  galleryImages: { src: string; alt: string }[];
  title: string;
  description: string;
  features: { icon: IconName; text: string }[];
  reverse?: boolean;
};

// 4) Komponente verwendet den neuen Props-Typ
export const FeatureGallery = ({
  galleryImages,
  title,
  description,
  features,
  reverse = false,
}: FeatureGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          reverse && "lg:grid-flow-col-dense"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Galerie */}
        <div
          className={cn(
            "grid grid-cols-2 gap-4 w-full",
            reverse && "lg:col-start-2"
          )}
        >
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={cn(
                "relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer group",
                index === 0 && "col-span-2 row-span-2 aspect-square"
              )}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Text & Features */}
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-4 text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>

          <ul className="space-y-4">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              if (!Icon) return null;
              return (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="text-brand-blue" size={20} />
                  </div>
                  <span>{feature.text}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={galleryImages.map((img) => ({ src: img.src }))}
        index={lightboxIndex}
      />
    </div>
  );
};
