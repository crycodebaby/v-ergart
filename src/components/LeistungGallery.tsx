// src/components/LeistungGallery.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
};

export const LeistungGallery = ({ images }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-5 text-foreground">
        Visuelle Einblicke
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              "relative aspect-video rounded-lg overflow-hidden cursor-pointer group shadow-md",
              images.length > 2 && index === 0 && "col-span-2 aspect-[2/1]"
            )}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={src}
              alt={`Einblick in unsere Arbeit ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={lightboxIndex}
      />
    </div>
  );
};
