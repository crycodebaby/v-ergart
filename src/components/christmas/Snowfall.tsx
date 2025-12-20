/**
 * Snowfall – Verbesserter Schneefall-Effekt
 *
 * Mit mehr Schneeflocken, verschiedenen Größen,
 * und besserem Kontrast im Light Mode.
 */
"use client";

import { useEffect, useState } from "react";

export function Snowfall() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.innerWidth >= 768;

    setShouldShow(!prefersReducedMotion && isDesktop);

    const handleResize = () => {
      const isDesktopNow = window.innerWidth >= 768;
      setShouldShow(!prefersReducedMotion && isDesktopNow);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!shouldShow) return null;

  // Mehr Schneeflocken mit Variation
  const snowflakes = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 8,
    size: 10 + Math.random() * 14,
    opacity: 0.4 + Math.random() * 0.4,
    char: i % 3 === 0 ? "❄" : i % 3 === 1 ? "❅" : "❆",
  }));

  return (
    <div
      className="fixed inset-x-0 top-0 h-80 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute text-blue-300 dark:text-blue-200"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            filter: "drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))",
          }}
        >
          {flake.char}
        </div>
      ))}

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-30px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(320px) rotate(360deg) translateX(20px);
            opacity: 0;
          }
        }
        .snowflake {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
}
