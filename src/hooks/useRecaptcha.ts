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
    };
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = useCallback(
    (action: string): Promise<string | null> => {
      return new Promise((resolve) => {
        if (!SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
          resolve(null);
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action });
            resolve(token);
          } catch {
            resolve(null);
          }
        });
      });
    },
    []
  );

  return { executeRecaptcha, siteKey: SITE_KEY };
}
