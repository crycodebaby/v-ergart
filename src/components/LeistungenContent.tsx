// src/components/LeistungenContent.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CORE_SERVICES } from "@/lib/service-data";

export function LeistungenContent() {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Unsere Kernkompetenzen
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ein breites Spektrum an Dienstleistungen, zugeschnitten auf höchste Qualität,
            Zuverlässigkeit und Ihre individuellen Bedürfnisse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.link} className="group block h-full">
                  <div className="h-full bg-card border border-border/40 rounded-xl overflow-hidden hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300">
                    {/* Image with fixed aspect ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-brand-text transition-colors flex-1">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-brand-text font-semibold text-sm">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
    </>
  );
}
