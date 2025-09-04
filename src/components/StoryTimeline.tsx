// src/components/StoryTimeline.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ueberUnsMilestones } from "@/lib/ueber-uns-data";

const MilestoneCard = ({
  milestone,
}: {
  milestone: (typeof ueberUnsMilestones)[number];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [16, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`grid items-center gap-8 lg:gap-12 ${
        milestone.align === "left"
          ? "lg:grid-cols-[1fr_1fr]"
          : "lg:grid-cols-[1fr_1fr] lg:[&>*:first-child]:order-2"
      }`}
    >
      <div>
        <h3 className="font-bold text-2xl text-foreground mb-2">
          {milestone.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {milestone.text}
        </p>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl border border-border/60 shadow-lg">
        <div className="aspect-[4/3] relative">
          <Image
            src={milestone.image}
            alt={milestone.title}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 600px"
          />
        </div>
      </div>
    </motion.div>
  );
};

export const StoryTimeline = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 20%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={trackRef} className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900/60 dark:to-background" />
      <div className="container max-w-5xl mx-auto px-4">
        {/* Zentrale Linie */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <motion.div
          className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-px"
          style={{
            background: "linear-gradient(var(--brand-blue), transparent)",
            scaleY: pathLength,
            transformOrigin: "top",
          }}
        />
        {/* Items */}
        <div className="space-y-20">
          {ueberUnsMilestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -translate-y-7 bg-brand-blue text-white rounded-full h-12 w-12 items-center justify-center font-bold shadow-md">
                {m.year}
              </div>
              <MilestoneCard milestone={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
