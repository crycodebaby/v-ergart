"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down a bit to not cover Hero
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.15)] md:hidden">
      <a
        href="tel:+4917666825889"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'phone_click' });
          }
        }}
        className="flex items-center justify-center w-full py-3.5 text-primary-foreground font-bold text-lg rounded-xl bg-primary hover:bg-brand-solid-hover shadow-lg shadow-brand-blue/30 active:scale-95 transition-all"
      >
        <Phone size={22} className="mr-2" />
        Jetzt anrufen
      </a>
    </div>
  );
}
