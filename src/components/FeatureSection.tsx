// src/components/FeatureSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  image: string;
  title: string;
  description: string;
  features: { icon: LucideIcon; text: string }[];
  reverse?: boolean; // Für das wechselnde Layout
};

export const FeatureSection = ({
  image,
  title,
  description,
  features,
  reverse = false,
}: Props) => {
  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          reverse && "lg:grid-flow-col-dense"
        )}
      >
        <div className={cn("w-full", reverse && "lg:col-start-2")}>
          <Image
            src={image}
            alt={title}
            width={700}
            height={500}
            className="rounded-xl shadow-2xl"
          />
        </div>
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-4 text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          <ul className="space-y-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="text-brand-blue" size={20} />
                  </div>
                  <span>{feature.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
