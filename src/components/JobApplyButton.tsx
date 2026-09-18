// src/components/JobApplyButton.tsx
"use client";

import { Mail } from "lucide-react";
import { trackKarriereAction } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  /** Stellentitel – landet im Mail-Betreff und im Tracking. */
  jobTitle: string;
  /** Eigener Mail-Betreff, z. B. "Initiativbewerbung". Default: "Bewerbung als <Titel>". */
  subject?: string;
  label?: string;
  /** "inverse": für dauerhaft dunkle Flächen (Hero, Abschlussblock). */
  tone?: "default" | "inverse";
  className?: string;
};

/**
 * Einheitlicher Bewerben-CTA der Stellenanzeigen. Öffnet das Mailprogramm mit
 * vorausgefülltem Betreff und meldet den Klick an das Karriere-Tracking.
 */
export function JobApplyButton({
  jobTitle,
  subject,
  label = "Jetzt bewerben",
  tone = "default",
  className,
}: Props) {
  const href = `mailto:info@ergart.de?subject=${encodeURIComponent(
    subject ?? `Bewerbung als ${jobTitle}`
  )}`;

  return (
    <a
      href={href}
      onClick={() => trackKarriereAction("apply_click", jobTitle)}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        tone === "inverse"
          ? "bg-white text-slate-900 hover:bg-slate-100"
          : "bg-primary text-primary-foreground hover:bg-brand-solid-hover",
        className
      )}
    >
      <Mail size={18} aria-hidden="true" />
      {label}
    </a>
  );
}
