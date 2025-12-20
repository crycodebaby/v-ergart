/**
 * AnnouncementTopBar – Schmale Leiste ganz oben
 *
 * Erscheint vor dem Header, ideal für kurze Hinweise.
 * Features:
 * - Animiertes Einblenden von oben
 * - Dismiss-Button mit localStorage-Speicherung
 * - Barrierefreiheit: role="alert" für warnings, aria-labels
 * - Dark Mode unterstützt
 */
"use client";

import { useState, useEffect } from "react";
import { X, Info, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Announcement, AnnouncementType } from "@/lib/announcements-queries";

type Props = {
  announcement: Announcement;
  onDismiss?: () => void;
};

const ICONS: Record<AnnouncementType, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  promo: Sparkles,
};

const STYLES: Record<AnnouncementType, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-900 dark:text-blue-100",
    icon: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
    icon: "text-amber-600 dark:text-amber-400",
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
    icon: "text-green-600 dark:text-green-400",
  },
  promo: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-900 dark:text-purple-100",
    icon: "text-purple-600 dark:text-purple-400",
  },
};

const STORAGE_KEY = "dismissed-announcements";

export function AnnouncementTopBar({ announcement, onDismiss }: Props) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialisierung: Check ob bereits dismissed
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const dismissed = JSON.parse(stored) as string[];
        if (dismissed.includes(announcement._id)) {
          setIsDismissed(true);
        }
      }
    } catch {
      // localStorage nicht verfügbar, ignorieren
    }
  }, [announcement._id]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const dismissed = stored ? (JSON.parse(stored) as string[]) : [];
      dismissed.push(announcement._id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dismissed));
    } catch {
      // localStorage nicht verfügbar, ignorieren
    }
    onDismiss?.();
  };

  // Nicht rendern bis mounted (Hydration-Mismatch vermeiden)
  if (!mounted || isDismissed) return null;

  const Icon = ICONS[announcement.type];
  const styles = STYLES[announcement.type];

  // role="alert" nur für Warnungen (Screen-Reader sollen diese sofort vorlesen)
  const role = announcement.type === "warning" ? "alert" : "status";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`${styles.bg} ${styles.border} border-b`}
        role={role}
        aria-live="polite"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Icon
              className={`w-5 h-5 flex-shrink-0 ${styles.icon}`}
              aria-hidden="true"
            />

            <div className="flex-1 min-w-0">
              {announcement.title && (
                <p className={`font-semibold text-sm ${styles.text}`}>
                  {announcement.title}
                </p>
              )}
              <p
                className={`text-sm ${styles.text} ${announcement.title ? "mt-0.5" : ""}`}
              >
                {announcement.message}
              </p>
            </div>

            {announcement.cta && (
              <Link
                href={announcement.cta.url}
                className={`text-sm font-medium ${styles.text} hover:underline flex-shrink-0 whitespace-nowrap`}
              >
                {announcement.cta.text} →
              </Link>
            )}

            <button
              onClick={handleDismiss}
              className={`p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0 ${styles.text}`}
              aria-label="Hinweis schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
