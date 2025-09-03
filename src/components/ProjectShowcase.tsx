// src/components/ProjectShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { ProjectCarousel } from "./ProjectCarousel";
import { projekte, Projekt } from "@/lib/referenzen-data"; // Wir importieren unsere Projektdaten
import { Tag } from "lucide-react";

const ProjectSection = ({
  projekt,
  reverse = false,
}: {
  projekt: Projekt;
  reverse?: boolean;
}) => (
  <motion.div
    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className={`w-full ${reverse ? "lg:order-last" : ""}`}>
      <ProjectCarousel images={projekt.images} />
    </div>
    <div className="w-full">
      <h3 className="text-3xl font-bold mb-4 text-foreground">
        {projekt.title}
      </h3>
      <p className="text-muted-foreground mb-6">{projekt.description}</p>
      <div className="flex flex-wrap gap-2">
        {projekt.services.map((service) => (
          <span
            key={service}
            className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
          >
            <Tag size={12} /> {service}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export const ProjectShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 space-y-24">
        {projekte.map((projekt, index) => (
          <ProjectSection
            key={index}
            projekt={projekt}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};
