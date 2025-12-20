/**
 * ChristmasDecorations – Zusätzliche festliche Dekorationen
 *
 * Dekorative Elemente für die Ecken der Seite,
 * die festliche Stimmung verstärken.
 */
"use client";

export function ChristmasCornerDecorations() {
  return (
    <>
      {/* Linke obere Ecke - Tannenzweig */}
      <div
        className="fixed top-20 left-0 w-24 h-24 pointer-events-none z-[1] opacity-70"
        aria-hidden="true"
      >
        <div className="transform -rotate-45 origin-top-left">
          <span className="text-4xl filter drop-shadow-lg">🎄</span>
        </div>
      </div>

      {/* Rechte obere Ecke - Geschenk */}
      <div
        className="fixed top-20 right-4 pointer-events-none z-[1] opacity-70"
        aria-hidden="true"
      >
        <span className="text-3xl filter drop-shadow-lg">🎁</span>
      </div>

      {/* Dekorative Schneeflocken an den Seiten (nur Desktop) */}
      <div className="hidden lg:block">
        {/* Linke Seite */}
        <div
          className="fixed left-4 top-1/3 pointer-events-none z-[1] opacity-40"
          aria-hidden="true"
        >
          <span className="text-4xl text-blue-400 dark:text-blue-300">❄</span>
        </div>
        <div
          className="fixed left-8 top-1/2 pointer-events-none z-[1] opacity-30"
          aria-hidden="true"
        >
          <span className="text-2xl text-blue-400 dark:text-blue-300">❅</span>
        </div>

        {/* Rechte Seite */}
        <div
          className="fixed right-4 top-2/5 pointer-events-none z-[1] opacity-40"
          aria-hidden="true"
        >
          <span className="text-3xl text-blue-400 dark:text-blue-300">❆</span>
        </div>
        <div
          className="fixed right-8 top-3/5 pointer-events-none z-[1] opacity-30"
          aria-hidden="true"
        >
          <span className="text-4xl text-blue-400 dark:text-blue-300">❄</span>
        </div>
      </div>

      {/* Untere Schnee-Linie */}
      <div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </>
  );
}

/**
 * WinterOverlay – Subtiler Wintereffekt
 * 
 * Ein leichter Frost-Overlay für die Ecken
 */
export function WinterCornerFrost() {
  return (
    <>
      {/* Frost Ecken */}
      <div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none opacity-20 dark:opacity-10"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(219,234,254,0.8) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed top-0 right-0 w-32 h-32 pointer-events-none opacity-20 dark:opacity-10"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(219,234,254,0.8) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
