// src/components/PartnerBrandSpotlight.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Lokales, typ-sicheres Easing (kein String)
type Bezier = [number, number, number, number];
const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

export type PartnerBrandSpotlightProps = {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string; // interner oder externer Link
  imageSrc: string; // großes Produkt-/Stimmungsbild
  className?: string;
  externalInfoHref?: string; // z.B. HÖNING-Produktseite
};

/** Kleine, in sich geschlossene Badge-Subkomponente (kein milchiger Text) */
function MadeInGermanyBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase text-foreground shadow-sm">
      <Image
        src="/bilder_ordner/made-in-germany.png"
        alt="Made in Germany"
        width={16}
        height={16}
        className="rounded-full"
      />
      Made in Germany
    </span>
  );
}

/** PartnerBrandSpotlight – edle Banner/Karten-Box für Body-Bereiche */
export const PartnerBrandSpotlight: React.FC<PartnerBrandSpotlightProps> = ({
  title,
  subtitle,
  description,
  ctaText = "Jetzt beraten lassen",
  ctaHref = "/kontakt",
  imageSrc,
  externalInfoHref = "https://www.hoening.de/produkte/kunststofffenster/systemuebersicht-pvc-fenster/",
  className,
}) => {
  const r = useReducedMotion();

  return (
    <section
      className={cn("relative mx-auto max-w-7xl px-4", className)}
      aria-label="Partner-Spotlight"
    >
      <motion.div
        variants={fadeUp}
        initial={r ? undefined : "hidden"}
        whileInView={r ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        className="relative grid overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl lg:grid-cols-[1.2fr_1fr]"
      >
        {/* Textseite (links) */}
        <div className="relative z-10 flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-4">
            <Image
              src="/bilder_ordner/hoening/hoening.png"
              alt="HÖNING"
              width={160}
              height={36}
              // ==================================================================
              // KORREKTUR: Saubere Farbumkehr für Dark Mode statt Helligkeits-Hack
              // ==================================================================
              className="h-auto w-auto dark:invert"
              priority={false}
            />
            <MadeInGermanyBadge />
          </div>

          <header>
            <h3 className="text-2xl font-bold text-foreground sm:text-[1.75rem]">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-base font-medium text-brand-blue">
                {subtitle}
              </p>
            ) : null}
          </header>

          {description ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {ctaText}
            </Link>

            <Link
              href={externalInfoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              Mehr zu HÖNING
            </Link>
          </div>
        </div>

        {/* Bildseite (rechts) */}
        <div className="relative min-h-[260px]">
          <Image
            src={imageSrc}
            alt="HÖNING Fenster – Produktansicht"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
          {/* Dezentes Overlay nur am Rand für Textkontrast im Übergang */}
          <motion.div
            variants={fadeIn}
            initial={r ? undefined : "hidden"}
            whileInView={r ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[hsl(var(--background))]/10 via-transparent to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
export default PartnerBrandSpotlight;
