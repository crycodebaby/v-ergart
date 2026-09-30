// src/components/TrustpilotReviewCollector.tsx
"use client";

/**
 * Trustpilot "Review Collector" – bewusst lokal statt in layout.tsx.
 *
 * Consent: Das Bootstrap-Script baut eine Verbindung zu Trustpilot auf
 * (IP-Adresse, Browserdaten). Es lädt deshalb NUR bei
 * `cookie_consent === "granted"` – derselben Einwilligung, die auch Analyse
 * und Marketing freischaltet (siehe @/lib/attribution). Ohne Einwilligung
 * steht an seiner Stelle ein normaler Link aufs Trustpilot-Profil; ein Link
 * überträgt erst beim Klick etwas. Entscheidet sich jemand im Banner, kommt
 * das über CONSENT_EVENT sofort hier an – auch ein Widerruf.
 *
 * Laden: Beim ersten Mal scannt das Script das DOM selbst nach
 * `.trustpilot-widget`. Nach einer Client-Navigation ist es schon da und
 * scannt nicht erneut – deshalb `onReady` (läuft bei jedem Mount, anders
 * als `onLoad`) und dort `loadFromElement` für genau dieses Element.
 *
 * Höhe: Widget und Platzhalter sind beide exakt 52 px hoch. Der Wechsel
 * nach dem Consent-Check im Browser verschiebt deshalb nichts.
 */
import { ArrowUpRight } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { CONSENT_EVENT, getConsentState } from "@/lib/attribution";
import { TRUSTPILOT_REVIEW_COLLECTOR } from "@/lib/reviews";
import { cn } from "@/lib/utils";

const BOOTSTRAP_SRC =
  "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export default function TrustpilotReviewCollector({
  className,
}: {
  className?: string;
}) {
  const widgetRef = useRef<HTMLDivElement>(null);
  // Startet immer mit false: Server und erster Client-Render sind identisch,
  // localStorage wird erst nach der Hydration gelesen.
  const [consented, setConsented] = useState(false);
  const { templateId, businessUnitId, token, locale, profileUrl } =
    TRUSTPILOT_REVIEW_COLLECTOR;

  useEffect(() => {
    setConsented(getConsentState() === "granted");

    const onConsent = (event: Event) => {
      const state = (event as CustomEvent<{ state?: string }>).detail?.state;
      setConsented(state === "granted");
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!consented) {
    return (
      <div className={cn("h-[52px]", className)}>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="review-trustpilot-home"
          className="inline-flex h-full w-full items-center justify-center gap-2 rounded-lg border border-input px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Auf Trustpilot bewerten
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    // color-scheme: light – next-themes setzt im Dark Mode `color-scheme: dark`
    // auf <html>. Weicht das vom Schema des iframe-Dokuments ab, malt der
    // Browser dem iframe einen deckend weißen Hintergrund über die volle
    // Breite. Mit passendem Schema bleibt es transparent, sichtbar ist nur
    // der Trustpilot-Button selbst.
    <div className={cn("min-h-[52px] [color-scheme:light]", className)}>
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height="52px"
        data-style-width="100%"
        data-token={token}
      >
        {/* Fallback, falls das Script blockiert wird (z. B. Adblocker). */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex h-[52px] items-center text-sm font-semibold text-brand-text underline-offset-4 hover:underline"
        >
          Trustpilot
        </a>
      </div>

      <Script
        id="trustpilot-bootstrap"
        src={BOOTSTRAP_SRC}
        strategy="afterInteractive"
        onReady={() => {
          if (widgetRef.current) {
            window.Trustpilot?.loadFromElement(widgetRef.current);
          }
        }}
      />
    </div>
  );
}
