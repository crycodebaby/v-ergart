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
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-0 sm:bottom-6 left-0 sm:left-6 z-[100] w-full sm:max-w-md bg-background/95 backdrop-blur-xl border-t sm:border border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] sm:rounded-2xl overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
              <span className="text-xl">🍪</span> Ihre Privatsphäre
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Wir nutzen Cookies, um unsere Webseite für Sie optimal zu gestalten. Mit Klick auf &quot;Alle akzeptieren&quot; stimmen Sie der Verwendung für Analyse- und Marketingzwecke zu.
              <br />
              <br />
              Weitere Infos finden Sie in unserer{" "}
              <a href="/datenschutz" className="font-medium text-foreground underline decoration-brand-blue/30 hover:decoration-brand-blue transition-all">
                Datenschutzerklärung
              </a>.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccept}
                className="w-full px-4 py-3 rounded-xl bg-brand-blue text-white font-medium shadow-md shadow-brand-blue/20 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                id="cookie-accept-all"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleDecline}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-transparent hover:bg-muted text-foreground font-medium transition-all duration-200"
              >
                Nur notwendige Cookies
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
