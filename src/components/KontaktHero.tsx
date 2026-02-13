"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GoogleCalendarButton from "./GoogleCalendarButton";
import { Phone, Mail } from "lucide-react";

export default function KontaktHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4 py-16 lg:py-20">
        {/* Text Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 w-fit">
            <span className="text-sm font-medium">Wir sind für Sie da</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Persönlich & <br />
            <span className="text-brand-blue">direkt erreichbar.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg">
            Ob für eine Beratung, ein Angebot oder einen dringenden Termin –
            wir kümmern uns schnell und verbindlich um Ihr Anliegen.
          </p>

          <div className="mt-8 flex gap-4 items-center">
            <GoogleCalendarButton label="Termin direkt buchen" />
            <span className="text-sm text-muted-foreground">Dauert nur 1 Min.</span>
          </div>

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
