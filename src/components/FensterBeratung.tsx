// src/components/FensterBeratung.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Ruler, FileText, Hammer } from "lucide-react";
import FensterAnfrageForm from "@/components/FensterAnfrageForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

/**
 * Conversion-Abschluss der Verkaufsseite /fenster.
 *
 * Bis Batch 2 endete /fenster mit der generischen <CTA />-Sektion
 * ("Verwirklichen Sie Ihre Pläne" -> /kontakt). Das war der einzige
 * Handlungspunkt der Seite, lag ganz unten und hatte mit Fenstern nichts zu
 * tun. Hier steht jetzt stattdessen das echte Formular auf der Seite selbst
 * – derselbe Mechanismus, den /fensterservice schon nutzt.
 *
 * Batch 3: Hier stand bis eben die generische `ContactForm` mit einer
 * angepassten Auswahlliste. Deren Datenmodell (Name / E-Mail / Freitext)
 * reicht fuer einen Fensterverkauf nicht – es fehlten Vorhaben, Anzahl,
 * Objektart, PLZ und Zeitraum, und der Browser sendete direkt an Formcarry,
 * ohne dass der Lead jemals eine eindeutige ID bekam. Ersetzt durch
 * `FensterAnfrageForm`, das ueber `/api/leads/fenster` laeuft.
 *
 * `/fensterservice` behaelt bewusst weiterhin die `ContactForm`.
 */

const ablauf = [
  {
    icon: Phone,
    title: "1. Anfrage",
    text: "Kurz schildern, worum es geht – Formular, Telefon oder WhatsApp.",
  },
  {
    icon: Ruler,
    title: "2. Aufmaß vor Ort",
    text: "Wir messen kostenlos auf und besprechen Verglasung, Sicherheit und Optik.",
  },
  {
    icon: FileText,
    title: "3. Angebot",
    text: "Transparent, unverbindlich und ohne versteckte Kosten.",
  },
  {
    icon: Hammer,
    title: "4. Montage",
    text: "Lieferung der maßgefertigten Elemente und fachgerechter Einbau.",
  },
];

export default function FensterBeratung() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-2 text-brand-text">
          <Ruler size={18} aria-hidden="true" />
          <span className="text-sm font-medium">
            Beratung &amp; Aufmaß kostenlos
          </span>
        </div>

        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Ihr Angebot für neue Fenster
        </h2>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Sagen Sie uns, wie viele Fenster es sind und wo sie sitzen – den Rest
          klären wir beim Aufmaß vor Ort.
        </p>
      </motion.div>

      {/* Ablauf in vier Schritten – nimmt die Unsicherheit vor dem Absenden */}
      <motion.ol
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {ablauf.map((schritt) => (
          <li
            key={schritt.title}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
              <schritt.icon
                size={20}
                className="text-brand-text"
                aria-hidden="true"
              />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">
              {schritt.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {schritt.text}
            </p>
          </li>
        ))}
      </motion.ol>

      {/* Dediziertes Verkaufsformular (serverseitige Lead-Annahme) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <FensterAnfrageForm sourcePage="/fenster" />
      </motion.div>

      {/* Alternative Conversion-Wege */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="tel:+4917666825889"
            data-track="call-fenster"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "phone_click" });
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Phone size={20} aria-hidden="true" />
            0176 668 25 889
          </a>

          <WhatsAppButton
            label="Foto per WhatsApp senden"
            iconSize={24}
            className="px-6 py-3 border-emerald-500/40 hover:border-emerald-500/60"
          />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Geht es um ein vorhandenes Fenster, das klemmt oder zieht?{" "}
          <Link
            href="/fensterservice"
            className="font-semibold text-brand-text underline underline-offset-4"
          >
            Zum Fensterservice
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
