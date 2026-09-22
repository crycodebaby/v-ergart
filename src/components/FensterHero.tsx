// src/components/FensterHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Ruler, Star, ArrowRight } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_RATING_DISPLAY } from "@/lib/reviews";

/**
 * Hero der Verkaufsseite /fenster.
 *
 * Aufgabe dieses ersten Bildschirms: Ein Besucher, der neue Fenster kaufen
 * oder seine alten Fenster austauschen lassen will, muss sofort erkennen,
 * dass er richtig ist – und wie er ein Angebot bekommt.
 *
 * Bewusste Entscheidungen:
 *  - Hoehe ist INHALTSGETRIEBEN (py + min-h), nicht 60/70vh wie zuvor. Der
 *    alte Hero war reine Bildflaeche mit Claim ("Fenster, die Massstaebe
 *    setzen") und ohne jeden CTA; der erste Handlungspunkt lag weit unter
 *    der Falz. Jetzt stehen H1, Nutzen, Vertrauenssignal und beide CTAs auf
 *    dem ersten Screen – auch auf einem 360x640-Telefon.
 *  - Zwei Conversion-Wege: Formular-Anker (primaer) und Telefon (alternativ).
 *  - Ein dezenter Abzweig zu /fensterservice faengt Besucher ab, die
 *    eigentlich eine Reparatur suchen. Ohne ihn wuerde die Verkaufsseite den
 *    Reparatur-Traffic verschlucken.
 *
 * Farbnotiz: `text-brand` statt `text-brand-text` – diese Flaeche ist ein
 * Foto mit dunklem Scrim und damit in BEIDEN Themes dunkel (siehe Regel in
 * globals.css und FensterserviceHero).
 */
export default function FensterHero() {
  return (
    <section className="relative flex min-h-[34rem] items-center overflow-hidden md:min-h-[34rem]">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bilder_ordner/hoening/fenster/fenster-titelbild.webp"
          alt="Neue Fensterfront eines Wohnhauses nach dem Fensteraustausch"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
      </div>

      {/* Textinhalt */}
      <div className="container relative z-10 mx-auto px-4 py-10 md:py-20">
        <div className="max-w-3xl">
          {/* Region + Hersteller: beantwortet "lokal?" und "womit?" sofort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-2 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-brand-blue/20 px-4 py-2 text-sm font-medium text-brand">
              <MapPin size={16} aria-hidden="true" />
              Neuss &amp; Umgebung
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              Offizieller HÖNING-Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl"
          >
            Neue Fenster in Neuss &amp; Umgebung
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-5 max-w-2xl text-base text-slate-100 md:mb-7 md:text-lg lg:text-xl"
          >
            Hochwertige HÖNING Fensterelemente – Beratung, Aufmaß und
            fachgerechte Montage aus einer Hand. Für Neubau, Sanierung und den
            Austausch alter Fenster.
          </motion.p>

          {/* Vertrauenssignal – Zahlen kommen aus lib/reviews.ts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/85 md:mb-8 md:gap-y-2"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star
                size={16}
                className="fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {GOOGLE_RATING_DISPLAY}/5 bei {GOOGLE_RATING.count}{" "}
              Google-Bewertungen
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler size={16} aria-hidden="true" />
              Kostenloses Aufmaß vor Ort
            </span>
            <span>Handwerksbetrieb aus Neuss · 13+ Jahre Erfahrung</span>
          </motion.div>

          {/* CTAs: Beratung zuerst, Telefon als gleichwertige Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="#fenster-beratung"
              id="fenster-beratung-cta"
              data-track="cta-fenster-beratung"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-solid-hover hover:shadow-xl"
            >
              Kostenlose Fenster-Beratung anfragen
              <ArrowRight size={20} aria-hidden="true" />
            </Link>

            <a
              href="tel:+4917666825889"
              id="fenster-phone-cta"
              data-track="call-fenster"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: "phone_click" });
                }
              }}
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/20"
            >
              <Phone size={22} className="shrink-0" aria-hidden="true" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-sm font-normal opacity-90">
                  Direkt sprechen
                </span>
                <span>0176 668 25 889</span>
              </span>
            </a>
          </motion.div>

          {/* Abzweig fuer den anderen Intent */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 text-sm text-white/75"
          >
            Sie möchten ein vorhandenes Fenster reparieren oder warten lassen?{" "}
            <Link
              href="/fensterservice"
              className="font-semibold text-brand underline underline-offset-4 hover:text-white"
            >
              Zum Fensterservice
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
