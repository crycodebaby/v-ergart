// src/components/Services.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CORE_SERVICES } from "@/lib/service-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="leistungen" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Unsere Kernkompetenzen
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Alles aus einer Hand: Von der professionellen Hausmeisterbetreuung bis hin
            zum fachgerechten Fenstereinbau. Qualität, auf die Sie bauen können.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="h-full"
              >
                <Link href={service.link} className="group block h-full">
                  <div className="h-full bg-card border border-border/40 rounded-2xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col items-start text-left">

                    {/* Image with improved aspect ratio */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center border border-white/50">
                        <Icon className="w-6 h-6 text-brand-blue" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow w-full">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-brand-blue font-semibold text-sm mt-auto group-hover:underline underline-offset-4 decoration-brand-blue/30">
                        <span>Details ansehen</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default Services;
