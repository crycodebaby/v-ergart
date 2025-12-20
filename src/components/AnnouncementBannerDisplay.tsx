/**
 * AnnouncementBanner – Großes Banner unter dem Header
 *
 * Prominente Darstellung für wichtige Mitteilungen.
 * Features:
 * - Größere Schrift, mehr Padding für Sichtbarkeit
 * - Zentrierte Darstellung
 * - Dismiss-Button mit localStorage-Speicherung
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
    bg: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-900 dark:text-blue-100",
    icon: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
    icon: "text-amber-600 dark:text-amber-400",
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/50",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
    icon: "text-green-600 dark:text-green-400",
  },
  promo: {
    bg: "bg-purple-50 dark:bg-purple-950/50",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-900 dark:text-purple-100",
    icon: "text-purple-600 dark:text-purple-400",
  },
};

const STORAGE_KEY = "dismissed-announcements";

export function AnnouncementBannerDisplay({ announcement, onDismiss }: Props) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      // localStorage nicht verfügbar
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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className={`${styles.bg} ${styles.border} border-y relative`}
        role={role}
        aria-live="polite"
      >
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
            <div className={`p-3 rounded-full ${styles.bg} border ${styles.border}`}>
              <Icon
                className={`w-6 h-6 ${styles.icon}`}
                aria-hidden="true"
              />
            </div>

            <div>
              {announcement.title && (
                <h3 className={`font-bold text-lg md:text-xl ${styles.text} mb-2`}>
                  {announcement.title}
                </h3>
              )}
              <p className={`text-base md:text-lg ${styles.text}`}>
                {announcement.message}
              </p>
            </div>

            {announcement.cta && (
              <Link
                href={announcement.cta.url}
                className={`
                  inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                  font-semibold text-base transition-all
                  ${styles.text} ${styles.border} border-2
                  hover:brightness-95 dark:hover:brightness-110
                `}
              >
                {announcement.cta.text}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* Close Button in der Ecke */}
          <button
            onClick={handleDismiss}
            className={`
              absolute top-3 right-3 p-2 rounded-full
              hover:bg-black/5 dark:hover:bg-white/5 
              transition-colors ${styles.text}
            `}
            aria-label="Hinweis schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
