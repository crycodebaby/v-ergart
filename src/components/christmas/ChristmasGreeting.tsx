/**
 * ChristmasGreeting – Verbesserter Weihnachtsgruß
 *
 * Mit festlichem Design, besserem Kontrast in Light/Dark Mode,
 * und weihnachtlichen Dekorationen.
 */
"use client";

import { Sparkles } from "lucide-react";

type Props = {
  greetingText: string;
};

export function ChristmasGreeting({ greetingText }: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-green-700 dark:from-red-900 dark:via-red-950 dark:to-green-900">
      {/* Dekorative Schneeflocken im Hintergrund */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white text-xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-center gap-3 text-center flex-wrap">
          {/* Linke Deko */}
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="text-lg">🎄</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>

          {/* Gruß-Text */}
          <p className="text-sm md:text-base text-white font-medium drop-shadow-sm">
            {greetingText}
          </p>

          {/* Rechte Deko */}
          <div className="flex items-center gap-2" aria-hidden="true">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-lg">🎅</span>
          </div>
        </div>
      </div>

      {/* Untere Girlande */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 opacity-80" />
    </div>
  );
}
