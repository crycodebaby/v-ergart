// src/components/FensterserviceHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_RATING_DISPLAY } from "@/lib/reviews";

/**
 * Hero-Sektion der SERVICE-Seite /fensterservice.
 *
 * Intent dieser Seite seit Batch 2: ein VORHANDENES Fenster wieder in
 * Ordnung bringen (Reparatur, Wartung, Einstellung, Dichtungen, Beschläge).
 * Der Verkauf neuer Fenster liegt auf /fenster; von hier führt nur ein
 * bewusster Abzweig dorthin.
 *
 * Optimiert für Google Ads Conversion:
 * - Klare H1 mit lokalen Keywords
 * - Prominente Telefonnummer (tel:-Link)
 * - Schneller CTA für Formular
 * - Trust-Signale (Erfahrung, Region)
 * 
 * Tracking-Attribute:
 * - data-track="call-fensterservice" auf Telefon-Button
 * - data-track="cta-fensterservice" auf Formular-Link
 */
export default function FensterserviceHero() {
  return (
    <section className="relative flex min-h-[38rem] items-center overflow-hidden md:min-h-[85vh]">
      {/* Hintergrundbild mit Aspect-Ratio für CLS-Optimierung */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp"
            alt="Professioneller Fenstereinbau in Neuss"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Gradient Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-10 md:py-24">
        <div className="max-w-3xl">
          {/* Badge.
              text-brand statt text-brand-text: diese Flaeche ist ein Foto mit
              schwarzem Scrim und damit in BEIDEN Themes dunkel. Der
              themegesteuerte --brand-text waere im Light Mode #0061C2 und
              damit auf dunklem Grund unlesbar. Siehe Regel in globals.css. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand"
          >
            <MapPin size={16} />
            <span className="text-sm font-medium">Neuss & Umgebung</span>
          </motion.div>

          {/* H1 - SEO-optimiert */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Fensterservice in Neuss & Umgebung – <span className="text-brand">Reparatur, Wartung, Einstellung</span>
          </motion.h1>

          {/* Subheadline: sagt in einem Satz, welches Problem hier geloest wird */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-xl text-slate-100 mb-4 md:mb-6 max-w-2xl"
          >
            Klemmender Flügel, Zugluft, poröse Dichtung, defekter Beschlag? Wir
            setzen Ihre vorhandenen Fenster instand – statt sie auszutauschen.
          </motion.p>

          {/* Trust-Zeile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-lg text-yellow-400 font-semibold mb-4 md:mb-8 max-w-2xl bg-black/40 inline-block p-2 rounded-lg backdrop-blur-sm"
          >
            ⭐ {GOOGLE_RATING_DISPLAY}/5 Sterne bei {GOOGLE_RATING.count} Google-Bewertungen | Über 13 Jahre Erfahrung | Schnelle Termine vor Ort
          </motion.p>

          {/* USP Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10"
          >
            {[
              "13+ Jahre Erfahrung",
              "Reparatur statt Austausch",
              "Faire Preise",
              "Schnelle Termine",
            ].map((usp) => (
              <span
                key={usp}
                className="px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm backdrop-blur-sm"
              >
                {usp}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Telefon-CTA (Primary) */}
            <a
              href="tel:+4917666825889"
              id="fensterservice-phone-cta"
              data-track="call-fensterservice"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: 'phone_click' });
                }
              }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:bg-brand-solid-hover transition-all duration-300 shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/30 hover:scale-[1.02]"
            >
              <Phone size={24} className="shrink-0" />
              <span className="flex flex-col items-start">
                <span className="text-sm font-normal opacity-90">Jetzt anrufen</span>
                <span>0176 668 25 889</span>
              </span>
            </a>

            {/* Formular-CTA (Secondary) */}
            <Link
              href="#kontakt-formular"
              id="fensterservice-form-cta"
              data-track="cta-fensterservice"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle size={22} />
              Reparatur anfragen
            </Link>
          </motion.div>

          {/* Verfügbarkeitshinweis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex items-center gap-2 text-gray-400 text-sm"
          >
            <Clock size={16} />
            <span>Mo–Fr 08:00–12:00 & 13:00–16:00 Uhr</span>
          </motion.div>

          {/* Abzweig fuer den Kauf-Intent: wer neue Fenster will, soll nicht
              erst die halbe Reparaturseite lesen muessen. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-4 text-sm text-white/75"
          >
            Sie möchten komplett neue Fenster?{" "}
            <Link
              href="/fenster"
              className="font-semibold text-brand underline underline-offset-4 hover:text-white"
            >
              Neue Fenster &amp; Fensteraustausch
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Scroll-Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
