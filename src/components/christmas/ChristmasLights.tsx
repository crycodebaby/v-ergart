/**
 * ChristmasLights – Verbesserte Lichterkette
 *
 * Mit mehr Lichtern, besserem Kontrast,
 * und realistischerem Kabel-Look.
 */
"use client";

import { useEffect, useState } from "react";

export function ChristmasLights() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Mehr sichtbare Lichter
  const lightsCount = 30;
  
  // Festliche Farben mit besserem Kontrast
  const colors = [
    { bg: "bg-red-500", shadow: "shadow-red-400" },
    { bg: "bg-amber-400", shadow: "shadow-amber-300" },
    { bg: "bg-green-500", shadow: "shadow-green-400" },
    { bg: "bg-blue-500", shadow: "shadow-blue-400" },
    { bg: "bg-pink-500", shadow: "shadow-pink-400" },
    { bg: "bg-purple-500", shadow: "shadow-purple-400" },
  ];

  return (
    <div
      className="relative w-full h-8 overflow-hidden bg-gradient-to-b from-gray-900/20 to-transparent dark:from-gray-900/40"
      aria-hidden="true"
    >
      {/* Kabel mit Schwingung */}
      <svg 
        className="absolute top-2 left-0 w-full h-4" 
        preserveAspectRatio="none"
        viewBox="0 0 1000 20"
      >
        <path
          d="M0,10 Q50,5 100,10 Q150,15 200,10 Q250,5 300,10 Q350,15 400,10 Q450,5 500,10 Q550,15 600,10 Q650,5 700,10 Q750,15 800,10 Q850,5 900,10 Q950,15 1000,10"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          className="dark:stroke-gray-500"
        />
      </svg>

      {/* Lichter */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-2">
        {Array.from({ length: lightsCount }).map((_, i) => {
          const color = colors[i % colors.length];
          const delay = i * 0.15;
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              className="relative flex flex-col items-center"
              style={{ marginTop: isEven ? "4px" : "8px" }}
            >
              {/* Fassung */}
              <div className="w-1 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-t-sm" />
              {/* Glühbirne */}
              <div
                className={`
                  w-2 h-3 md:w-2.5 md:h-3.5 rounded-b-full
                  ${color.bg}
                  shadow-lg ${color.shadow}
                  ${!prefersReducedMotion ? "animate-pulse" : ""}
                `}
                style={{
                  animationDelay: `${delay}s`,
                  animationDuration: "2s",
                  boxShadow: `0 0 6px 2px currentColor, 0 0 12px 4px currentColor`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
