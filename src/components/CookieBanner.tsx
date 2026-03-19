"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setShow(false);
    
    // Update Google Consent Mode v2
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
      // Push to dataLayer for GTM tags to fire immediately if configured on consent update
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_update" });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setShow(false);
    // Keep default 'denied' state (set in layout.tsx script)
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
        >
          <div className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between gap-4">
            <div className="mb-4 md:mb-0 max-w-3xl">
              <h3 className="text-lg font-bold mb-1">Ihre Privatsphäre ist uns wichtig</h3>
              <p className="text-sm text-muted-foreground">
                Wir nutzen Cookies und ähnliche Technologien, um unsere Webseite für Sie optimal zu gestalten und fortlaufend zu verbessern. Mit Klick auf &quot;Alle akzeptieren&quot; stimmen Sie der Verwendung für Analyse- und Marketingzwecke (z.B. Google Ads) zu. Weitere Informationen finden Sie in unserer{" "}
                <a href="/datenschutz" className="underline text-brand-blue hover:text-blue-500 transition-colors">
                  Datenschutzerklärung
                </a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-sm font-medium transition-colors"
              >
                Nur Notwendige
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-lg bg-brand-blue text-white hover:bg-blue-600 text-sm font-medium shadow-lg transition-colors"
                id="cookie-accept-all"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global declarations for Google tracking objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
