// src/components/JobMobileApplyBar.tsx
"use client";

/**
 * Mobile Bewerbungsleiste der Stellenanzeige. Auf dem Desktop übernimmt das
 * die Sticky-Sidebar; unter lg gibt es keine – dort erscheint diese Leiste
 * am unteren Rand, sobald der Kopf der Anzeige (mit dem ersten
 * Bewerben-Button) aus dem Bild gescrollt ist.
 */
import * as React from "react";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/site-links";
import { cn } from "@/lib/utils";
import { JobApplyButton } from "./JobApplyButton";

type Props = {
  jobTitle: string;
  /** id des Elements, nach dessen Verlassen die Leiste erscheint. */
  sentinelId: string;
};

export function JobMobileApplyBar({ jobTitle, sentinelId }: Props) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  // Signal an globale Fixed-Elemente (ScrollToTopButton), dass unten eine
  // Leiste liegt – sie rücken dann per CSS nach oben.
  React.useEffect(() => {
    if (visible) document.body.dataset.applyBar = "1";
    else delete document.body.dataset.applyBar;
    return () => {
      delete document.body.dataset.applyBar;
    };
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden safe-bottom",
        "transition-transform duration-300 ease-soft motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {jobTitle}
        </p>
        <a
          href={CONTACT.phoneHref}
          aria-label={`Anrufen: ${CONTACT.phoneDisplay}`}
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-input text-foreground transition-colors hover:bg-muted"
        >
          <Phone size={18} aria-hidden="true" />
        </a>
        <JobApplyButton jobTitle={jobTitle} label="Bewerben" size="sm" className="shrink-0" />
      </div>
    </div>
  );
}
