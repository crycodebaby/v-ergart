// src/components/TerrassenFensterSlider.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const TerrassenFensterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch move
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    
    // Clamp between 0 and 100
    const newPosition = Math.max(0, Math.min(100, percent));
    setSliderPosition(newPosition);
  };

  // Mouse events
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // Touch events (mobile optimized)
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    e.preventDefault(); // Prevent scrolling while dragging
    handleMove(e.touches[0].clientX);
  };

  // Global mouse up (for when mouse leaves container while dragging)
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Transformation, die begeistert
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sehen Sie den beeindruckenden Wandel: Aus einer veralteten
            Terrassenwand wird ein modernes, energieeffizientes und sicheres
            Glanzstück.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            {/* Mobile-optimized Before/After Slider */}
            <div className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-blue/50">
              <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] select-none touch-none cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                  <Image
                    src="/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp"
                    alt="Nach der Fenstersanierung - Moderne Terrassenfenster"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Before Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src="/bilder_ordner/hoening/fenster/fenstersanierung/vorher-terassen-fensterwand.webp"
                    alt="Vor der Fenstersanierung - Alte Terrassenfenster"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Handle Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-brand-blue">
                    {/* Arrows */}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                      <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                  Vorher
                </div>
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                  Nachher
                </div>

                {/* Mobile Touch Hint (shows briefly on mobile) */}
                {!isDragging && (
                  <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-blue/90 text-white px-4 py-2 rounded-full text-xs font-medium animate-pulse">
                    ← Zum Vergleichen ziehen →
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Anthrazit-Ästhetik trifft auf höchste Funktion
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">
                  Elegantes Design:
                </span>{" "}
                Edle, anthrazit gebürstete Aluminium-Fensterelemente für eine
                moderne Optik.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Energieeffizienz:
                </span>{" "}
                Deutliche Heizkostenersparnis dank verbesserter Wärmedämmung
                nach Höning-Qualitätsstandard.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Mehr Ruhe:
                </span>{" "}
                Effektive Schalldämmung von außen schafft eine ruhige und
                entspannte Wohnatmosphäre.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Sicherheit & Langlebigkeit:
                </span>{" "}
                Robuste Bauweise in deutscher Qualität für ein dauerhaftes
                Gefühl der Geborgenheit.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Wohlfühlfaktor:
                </span>{" "}
                Mehr Licht und verbesserter Komfort für Ihr Wohnzimmer oder Ihre
                Terrasse.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
