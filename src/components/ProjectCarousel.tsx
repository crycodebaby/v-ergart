// src/components/ProjectCarousel.tsx
"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type Props = { images: string[] };

export const ProjectCarousel = ({ images }: Props) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div
            className="relative flex-grow-0 flex-shrink-0 w-full"
            key={index}
          >
            <Image
              src={src}
              alt={`Referenzbild ${index + 1}`}
              width={800}
              height={600}
              className="object-cover w-full aspect-[4/3]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
