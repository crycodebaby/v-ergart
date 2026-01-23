// src/components/GoogleCalendarButton.tsx
"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Google Kalender Termin-Button
 * 
 * Ersetzt den Calendly-Button mit einem einfachen Link 
 * zur Google Calendar Appointment Scheduling Seite.
 * 
 * Simpel, clean und conversion-optimiert.
 */

interface GoogleCalendarButtonProps {
    label?: string;
    variant?: "default" | "outline" | "ghost";
    className?: string;
    /** Zeigt zusätzlichen Beschreibungstext unter dem Button */
    showDescription?: boolean;
}

const GOOGLE_CALENDAR_URL = "https://calendar.app.google/ZYpM2cqo9omejSDR7";

export default function GoogleCalendarButton({
    label = "Termin buchen",
    variant = "default",
    className = "",
    showDescription = false,
}: GoogleCalendarButtonProps) {
    return (
        <div className={showDescription ? "text-center" : ""}>
            <Button
                asChild
                variant={variant}
                className={`inline-flex items-center gap-2 ${className}`}
            >
                <Link
                    href={GOOGLE_CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="calendar-booking"
                >
                    {/* Google Calendar Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                    >
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                    </svg>
                    {label}
                </Link>
            </Button>

            {showDescription && (
                <p className="mt-2 text-sm text-muted-foreground">
                    Wählen Sie einen freien Termin in meinem Kalender
                </p>
            )}
        </div>
    );
}

/**
 * Inline Google Calendar Embed für Kontaktseite
 * 
 * Zeigt den Kalender direkt auf der Seite an für maximale Conversion.
 */
export function GoogleCalendarEmbed({ className = "" }: { className?: string }) {
    return (
        <div className={`rounded-xl overflow-hidden border border-border ${className}`}>
            <div className="bg-slate-50 dark:bg-zinc-900 px-4 py-3 border-b border-border flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-brand-blue"
                    fill="currentColor"
                >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                </svg>
                <span className="font-medium text-foreground">Termin online buchen</span>
            </div>
            <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1BH6gr0sUOPyktDI2rmCD0qlTY8Qpp6xaf_SlDVM4woyhVzUo0mNGpqE50KiNCOtRlPZ6ClvM3?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Google Kalender Terminbuchung"
                loading="lazy"
            />
        </div>
    );
}
