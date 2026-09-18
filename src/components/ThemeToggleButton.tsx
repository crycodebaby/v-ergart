// src/components/ThemeToggleButton.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ThemeToggleButton
 *
 * Ein universeller, barrierefreier Theme-Switch (role="switch") – EINE
 * Komponente für Maus, Touch und Tastatur statt getrennter Versionen:
 *  - Touch: großzügige Hit-Area (≥ 44px) durch äußeres Padding, active:scale.
 *  - Maus:  Hover-Glow + Cursor-Feedback.
 *  - Tastatur: native <button>, focus-visible Ring, Enter/Space toggelt.
 *  - Screenreader: aria-checked spiegelt den Zustand, klares aria-label.
 *
 * Mikroanimationen (framer-motion): gleitender Thumb (Spring), Sonne/Mond
 * mit Rotations-Crossfade, funkelnde Sterne (Dark) und Sonnen-Glow (Light).
 * Respektiert prefers-reduced-motion.
 */
export function ThemeToggleButton({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => setMounted(true), []);

  // Platzhalter mit identischem Footprint → kein Layout-Shift / Hydration-Mismatch
  if (!mounted) {
    return <div className={cn("h-11 w-[68px]", className)} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  // Thumb-Reiseweg: Pill-Innenbreite (56 - 2*4 Padding = 48) minus Thumb (24) = 24px
  const travel = 24;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"}
      title={isDark ? "Heller Modus" : "Dunkler Modus"}
      onClick={toggle}
      className={cn(
        // Äußere Hit-Area (Touch ≥ 44px) – das Padding ist die Klickfläche
        "group relative inline-flex items-center justify-center rounded-full p-1.5",
        "transition-transform active:scale-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full",
        className
      )}
    >
      {/* Sichtbare Pill */}
      <span
        className={cn(
          "relative flex h-8 w-14 items-center rounded-full p-1 ring-1 ring-inset",
          "transition-colors duration-500 ease-out overflow-hidden",
          isDark
            ? "bg-gradient-to-b from-indigo-950 to-slate-900 ring-white/10"
            : "bg-gradient-to-b from-sky-300 to-sky-400 ring-black/5"
        )}
      >
        {/* Deko: Sterne (Dark Mode) */}
        <AnimatePresence>
          {isDark && (
            <>
              {[
                { top: "5px", left: "8px", size: 2, delay: 0 },
                { top: "16px", left: "14px", size: 1.5, delay: 0.4 },
                { top: "9px", left: "20px", size: 1, delay: 0.8 },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{ top: s.top, left: s.left, width: s.size * 2, height: s.size * 2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    reduce
                      ? { opacity: 0.9, scale: 1 }
                      : { opacity: [0.3, 1, 0.3], scale: 1 }
                  }
                  exit={{ opacity: 0, scale: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 2.4, delay: s.delay, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Deko: Sonnen-Glow (Light Mode) */}
        <AnimatePresence>
          {!isDark && (
            <motion.span
              className="pointer-events-none absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-amber-200/70 blur-[6px]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* Gleitender Thumb */}
        <motion.span
          initial={false}
          animate={{ x: isDark ? travel : 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 500, damping: 30, mass: 0.6 }
          }
          className={cn(
            "relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md",
            isDark ? "bg-slate-100" : "bg-white"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={reduce ? false : { rotate: -90, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0, scale: 0.4 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="flex items-center justify-center"
              >
                <Moon className="h-3.5 w-3.5 text-slate-700" fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={reduce ? false : { rotate: 90, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0, scale: 0.4 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="flex items-center justify-center"
              >
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
    </button>
  );
}
