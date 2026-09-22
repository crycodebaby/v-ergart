// src/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/fenster-faq-data";

/**
 * FAQ-Accordion – datengetrieben.
 *
 * Nachfolger der frueheren `FensterserviceFAQ`, die ihre Fragen fest
 * eingebaut hatte und deshalb nur auf einer Seite und nur mit einem Intent
 * nutzbar war. Die Fragen kommen jetzt von aussen (siehe
 * `src/lib/fenster-faq-data.ts`), damit /fenster und /fensterservice je
 * ihren eigenen Fragenblock zeigen koennen – und das FAQPage-JSON-LD aus
 * derselben Quelle gebaut wird wie der sichtbare Text.
 */

type FaqAccordionProps = {
  items: FaqItem[];
  /** Kleiner Pill-Text ueber der Ueberschrift. */
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function FaqAccordion({
  items,
  eyebrow = "Häufige Fragen",
  title,
  description,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-text text-sm font-medium"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {items.map((faq, index) => (
          <motion.div
            key={faq.frage}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border border-border rounded-xl overflow-hidden bg-card"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-foreground pr-4">
                {faq.frage}
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Antwort ist IMMER im DOM, das Auf-/Zuklappen laeuft ueber CSS
                (max-h/opacity) – dieselbe Strategie wie im ProcessStepper.
                Grund: Die Seite meldet alle Fragen als FAQPage-JSON-LD an.
                Wuerden die Antworten conditional gerendert, stuende im
                ausgelieferten HTML nur die erste Antwort und das Schema
                wuerde Inhalte behaupten, die nicht auf der Seite stehen. */}
            <div
              id={`faq-answer-${index}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openIndex === index
                  ? "max-h-[32rem] opacity-100"
                  : "max-h-0 opacity-0"
              )}
              aria-hidden={openIndex !== index}
            >
              <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                {faq.antwort}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
