// src/hooks/useRecaptcha.ts
"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

if (!SITE_KEY && typeof window !== "undefined") {
  console.error(
    "[reCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set. " +
    "Add it to .env.local (local) and Vercel Environment Variables (production)."
  );
}

/**
 * Loads the reCAPTCHA v3 script once and returns an `executeRecaptcha` function.
 * Returns null if the site key is not configured.
 */
export function useRecaptcha() {
  const loaded = useRef(false);

  useEffect(() => {
    if (!SITE_KEY || loaded.current) return;
    if (document.querySelector(`script[src*="recaptcha"]`)) {
      loaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      loaded.current = true;
      console.log("[reCAPTCHA] Script loaded successfully.");
    };
    script.onerror = () => {
      console.error("[reCAPTCHA] Script failed to load. Check site key and network.");
    };
    document.head.appendChild(script);
    console.log("[reCAPTCHA] Script injected, site key:", SITE_KEY ? SITE_KEY.slice(0, 8) + "..." : "(empty!)");
  }, []);

  const executeRecaptcha = useCallback(
    (action: string): Promise<string | null> => {
      return new Promise((resolve) => {
        if (!SITE_KEY) {
          console.error("[reCAPTCHA] Cannot execute: site key is missing.");
          resolve(null);
          return;
        }
        if (typeof window === "undefined") {
          console.warn("[reCAPTCHA] Cannot execute server-side.");
          resolve(null);
          return;
        }
        if (!window.grecaptcha) {
          console.error("[reCAPTCHA] window.grecaptcha is not defined. Script may not have loaded yet.");
          resolve(null);
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action });
            console.log("[reCAPTCHA] Token generated for action:", action);
            resolve(token);
          } catch (err) {
            console.error("[reCAPTCHA] execute() failed:", err);
            resolve(null);
          }
        });
      });
    },
    []
  );

  return { executeRecaptcha, siteKey: SITE_KEY };
}
