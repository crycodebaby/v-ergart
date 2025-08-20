"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            className={cn(
              "group h-14 w-14 rounded-full",
              "bg-background/80 backdrop-blur-sm border border-border/20",
              "flex items-center justify-center",
              "shadow-lg",
              "hover:scale-110 focus:scale-110",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue",
              "transition-all duration-300"
            )}
            aria-label="Nach oben scrollen"
          >
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-current text-border/30"
                strokeWidth="5"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-current text-brand-blue"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray="0 1"
                style={{
                  pathLength,
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                  strokeLinecap: "round",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowUp className="h-6 w-6 text-foreground/70 transition-all duration-300 group-hover:-translate-y-1" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
