// src/components/Hero.tsx
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  "/bilder_ordner/startbilder/hausmeister-neuss-fensterservice.webp",
  "/bilder_ordner/startbilder/hausmeisterdienste neuss.webp",
  "/bilder_ordner/startbilder/Reinigungsservice und Objektreinigung Neuss.webp",
  "/bilder_ordner/startbilder/hausmeister-neuss-handwerksloesungen.webp",
  "/bilder_ordner/startbilder/treppenhausreinigung neuss und reinigungsservice neuss.webp"
];

// Spezifische Alt-Texte für bessere SEO
const altTexts = [
  "Fensterservice und Fensterreinigung in Neuss",
  "Hausmeisterdienste und Gebäudemanagement Neuss",
  "Professioneller Reinigungsservice in Neuss",
  "Handwerksarbeiten und Reparaturen Neuss",
  "Treppenhausreinigung und Gebäudereinigung Neuss"
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center">
      {/* Der Bilder-Slider als Hintergrund-Ebene mit Wrapper für CLS-Optimierung */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {images.map((src, index) => {
            if (index > 0 && !mounted) return null;
            return (
              <Image
                key={src}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                src={src}
                alt={altTexts[index]}
                fill
                sizes="100vw"
                priority={index === 0}
              />
            );
          })}
        </div>
        {/* Ein dunkles Overlay, um den Text lesbarer zu machen */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Der Text-Block als Vordergrund-Ebene, zentriert über dem Slider */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          Ihr Profi in Neuss
          <span className="block text-xl md:text-2xl font-normal normal-case mt-4 max-w-3xl mx-auto text-slate-200">
            Von Hausmeisterdienstleistungen über Fensteraustausch bis hin zur Gebäudereinigung – wir stehen Ihnen zuverlässig zur Seite.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;