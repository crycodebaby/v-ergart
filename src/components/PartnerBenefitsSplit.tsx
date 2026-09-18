// src/components/PartnerBenefitsSplit.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Typ-sicheres Easing
type Bezier = [number, number, number, number];
const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export type PartnerBenefitsSplitProps = {
  title: string;
  subtitle?: string;
  features: string[];
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  className?: string;
  externalInfoHref?: string;
};

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

export const PartnerBenefitsSplit: React.FC<PartnerBenefitsSplitProps> = ({
  title,
  subtitle,
  features,
  ctaText = "Kostenlose Beratung",
  ctaHref = "/kontakt",
  imageSrc,
  className,
  externalInfoHref = "https://www.hoening.de/produkte/kunststofffenster/systemuebersicht-pvc-fenster/",
}) => {
  const r = useReducedMotion();

  return (
    <section
      className={cn("relative", className)}
      aria-label="Partner-Benefits"
    >
      <motion.div
        variants={fadeUp}
        initial={r ? undefined : "hidden"}
        whileInView={r ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        className="grid overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl lg:grid-cols-2"
      >
        {/* Textspalte */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-4">
            {/* Weiße Plakette statt dark:invert – Invertieren würde den roten
                Akzent im HÖNING-Logo türkis färben. Logo bleibt im Original. */}
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2 ring-1 ring-black/5">
              <Image
                src="/bilder_ordner/coop/hoening.png"
                alt="HÖNING"
                width={150}
                height={34}
                className="h-auto w-auto"
              />
            </span>
            <MadeInGermanyBadge />
          </div>

          <header>
            <h3 className="text-2xl font-bold text-foreground sm:text-[1.65rem]">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-base font-medium text-brand-text">
                {subtitle}
              </p>
            ) : null}
          </header>

          {features?.length ? (
            <ul className="mt-2 space-y-3 text-foreground/90">
              {features.map((f, i) => (
                <li
                  key={`${i}-${f.slice(0, 18)}`}
                  className="flex items-start gap-3 leading-relaxed"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-brand-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {ctaText}
            </Link>

            <Link
              href={externalInfoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Produktdetails bei HÖNING
            </Link>
          </div>
        </div>

        {/* Bildspalte */}
        <div className="relative min-h-[260px] lg:min-h-full">
          <Image
            src={imageSrc}
            alt="HÖNING Kunststofffenster – Detailansicht"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </motion.div>
    </section>
  );
};
export default PartnerBenefitsSplit;
