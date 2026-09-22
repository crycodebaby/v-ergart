// src/components/AttributionTracker.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  applyConsentChange,
  captureAttribution,
  CONSENT_EVENT,
  getAttributionForLead,
  type ConsentState,
} from "@/lib/attribution";

/**
 * Hängt im Root-Layout und erfasst bei jedem Aufruf die Kampagnen-Parameter.
 *
 * Rendert nichts. Die gesamte Consent-Logik liegt in `@/lib/attribution`;
 * diese Komponente ist nur der Auslöser.
 *
 * WICHTIG zur Einbindung: `useSearchParams()` zwingt in Next 14 jede Seite
 * ohne umgebende Suspense-Boundary ins Client-Rendering. Die Komponente
 * wird deshalb im Layout in <Suspense fallback={null}> gewickelt – sonst
 * würde das statische Rendering der gesamten Website wegfallen.
 */
export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution(searchParams?.toString() ?? "");
  }, [pathname, searchParams]);

  useEffect(() => {
    // Der CookieBanner meldet Zustimmung/Ablehnung. Erst dadurch darf eine
    // im Speicher liegende Attribution überhaupt persistiert werden.
    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ state?: ConsentState }>).detail;
      if (detail?.state) applyConsentChange(detail.state);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    // Nur in der Entwicklung: macht den aktuellen Attributionsstand in der
    // Konsole pruefbar (`__ergartAttribution()`), ohne dafuer jedes Mal ein
    // Formular abschicken zu muessen. Im Production-Build greift der Guard
    // immer, der Hook wird dort also nie gesetzt.
    if (process.env.NODE_ENV === "production") return;
    (window as unknown as Record<string, unknown>).__ergartAttribution = () =>
      getAttributionForLead();
  }, []);

  return null;
}
