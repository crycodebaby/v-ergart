"use client";

import { useEffect, useCallback } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

type Props = {
  url?: string; // Fallback: dein Link unten
  label?: string; // Button-Text
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  className?: string;
};

export default function CalendlyButton({
  url = "https://calendly.com/aergart/gesprachsanfrage",
  label = "Termin online buchen",
  variant = "default",
  className,
}: Props) {
  // CSS & Script nur 1x nachladen
  useEffect(() => {
    const cssId = "calendly-css";
    const jsId = "calendly-js";

    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById(jsId)) {
      const s = document.createElement("script");
      s.id = jsId;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const openCalendly = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url });
      } else {
        // Fallback: öffnet die Calendly-Seite, falls Script noch lädt
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [url]
  );

  return (
    <Button onClick={openCalendly} variant={variant} className={className}>
      <Calendar size={18} className="mr-2" />
      {label}
    </Button>
  );
}
