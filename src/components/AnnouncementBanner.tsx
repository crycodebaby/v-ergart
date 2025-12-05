// src/components/AnnouncementBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Info, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Announcement = {
  _id: string;
  title?: string;
  message: string;
  cta?: { text: string; url: string };
  type: 'info' | 'warning' | 'success' | 'promo';
  targetPages: 'all' | 'home' | 'blog' | 'karriere';
};

type Props = {
  announcements: Announcement[];
  currentPage?: 'home' | 'blog' | 'karriere';
};

const ICONS = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  promo: Sparkles,
};

const STYLES = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-900 dark:text-amber-100',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-900 dark:text-green-100',
    icon: 'text-green-600 dark:text-green-400',
  },
  promo: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-900 dark:text-purple-100',
    icon: 'text-purple-600 dark:text-purple-400',
  },
};

export function AnnouncementBanner({ announcements, currentPage = 'home' }: Props) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load dismissed IDs from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('dismissed-announcements');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDismissedIds(new Set(parsed));
      } catch (e) {
        // Invalid data, ignore
      }
    }
  }, []);

  // Filter: target page + not dismissed
  const visibleAnnouncement = announcements.find(
    (a) =>
      !dismissedIds.has(a._id) &&
      (a.targetPages === 'all' || a.targetPages === currentPage)
  );

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissedIds);
    newDismissed.add(id);
    setDismissedIds(newDismissed);
    localStorage.setItem(
      'dismissed-announcements',
      JSON.stringify(Array.from(newDismissed))
    );
  };

  // Don't render until mounted (avoid hydration mismatch)
  if (!mounted || !visibleAnnouncement) return null;

  const Icon = ICONS[visibleAnnouncement.type];
  const styles = STYLES[visibleAnnouncement.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`${styles.bg} ${styles.border} border-b`}
        role="status"
        aria-live="polite"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Icon className={`w-5 h-5 flex-shrink-0 ${styles.icon}`} aria-hidden="true" />
            
            <div className="flex-1 min-w-0">
              {visibleAnnouncement.title && (
                <p className={`font-semibold text-sm ${styles.text}`}>
                  {visibleAnnouncement.title}
                </p>
              )}
              <p className={`text-sm ${styles.text} ${visibleAnnouncement.title ? 'mt-0.5' : ''}`}>
                {visibleAnnouncement.message}
              </p>
            </div>

            {visibleAnnouncement.cta && (
              <Link
                href={visibleAnnouncement.cta.url}
                className={`text-sm font-medium ${styles.text} hover:underline flex-shrink-0 whitespace-nowrap`}
              >
                {visibleAnnouncement.cta.text} →
              </Link>
            )}

            <button
              onClick={() => handleDismiss(visibleAnnouncement._id)}
              className={`p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0 ${styles.text}`}
              aria-label="Mitteilung schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
