/**
 * AnnouncementInlineCard – Hinweis-Kasten im Content-Bereich
 *
 * Für kontextbezogene Mitteilungen innerhalb von Seiteninhalt.
 * Features:
 * - Card-Style mit Rahmen
 * - Optional schließbar
 * - Barrierefreiheit: role="alert" für warnings
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
  /** Ob der Close-Button angezeigt werden soll (Standard: true) */
  dismissible?: boolean;
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
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-900 dark:text-blue-100",
    icon: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
    icon: "text-amber-600 dark:text-amber-400",
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
    icon: "text-green-600 dark:text-green-400",
  },
  promo: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-900 dark:text-purple-100",
    icon: "text-purple-600 dark:text-purple-400",
  },
};

const STORAGE_KEY = "dismissed-announcements";

export function AnnouncementInlineCard({
  announcement,
  dismissible = true,
  onDismiss,
}: Props) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (dismissible) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const dismissed = JSON.parse(stored) as string[];
          if (dismissed.includes(announcement._id)) {
            setIsDismissed(true);
          }
        }
      } catch {
        // localStorage nicht verfügbar
      }
    }
  }, [announcement._id, dismissible]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const dismissed = stored ? (JSON.parse(stored) as string[]) : [];
      dismissed.push(announcement._id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dismissed));
    } catch {
      // localStorage nicht verfügbar
    }
    onDismiss?.();
  };

  if (!mounted || isDismissed) return null;

  const Icon = ICONS[announcement.type];
  const styles = STYLES[announcement.type];
  const role = announcement.type === "warning" ? "alert" : "status";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`
          ${styles.bg} ${styles.border} border-2 rounded-xl
          p-4 md:p-5 relative
        `}
        role={role}
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${styles.bg} border ${styles.border} flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${styles.icon}`} aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            {announcement.title && (
              <h4 className={`font-semibold ${styles.text} mb-1`}>
                {announcement.title}
              </h4>
            )}
            <p className={`text-sm ${styles.text}`}>{announcement.message}</p>

            {announcement.cta && (
              <Link
                href={announcement.cta.url}
                className={`
                  inline-flex items-center gap-1.5 mt-3
                  text-sm font-medium ${styles.text} 
                  hover:underline
                `}
              >
                {announcement.cta.text}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`
                p-1 rounded-lg flex-shrink-0
                hover:bg-black/5 dark:hover:bg-white/5 
                transition-colors ${styles.text}
              `}
              aria-label="Hinweis schließen"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
