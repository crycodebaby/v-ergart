"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GoogleCalendarButton from "./GoogleCalendarButton";
import { Phone, Mail } from "lucide-react";

export default function KontaktHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4 py-16 lg:py-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Schnell & unkompliziert Kontakt aufnehmen
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ob Angebot, Rückruf oder Sofort-Termin – wir melden uns fix und
            verbindlich.
            <span className="font-semibold text-foreground">
              {" "}
              Ihr Anliegen hat Priorität.
            </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <GoogleCalendarButton label="Termin online buchen" />
            <a
              href="tel:+4917666825889"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Phone size={18} /> Anrufen:{" "}
              <span className="font-semibold">
                +49&nbsp;176&nbsp;668&nbsp;25&nbsp;889
              </span>
            </a>
            <a
              href="mailto:aergart@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Mail size={18} /> E-Mail schreiben
            </a>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>
              • Reaktionszeit i. d. R. <strong>&lt; 24h</strong>
            </li>
            <li>• Vor-Ort in Neuss & Umgebung</li>
            <li>• Verbindliche Terminbestätigung</li>
          </ul>
        </motion.div>

        {/* Bild rechts – dein 800×1200 Motiv */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <Image
                src="/bilder_ordner/kontakt/team_ergart.webp"
                alt="Team Ergart – persönlich für Sie da"
                width={800}
                height={1200}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 90vw, 480px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
