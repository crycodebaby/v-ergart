// src/components/ValuesSection.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Recycle, Scale } from "lucide-react";
import React, { useRef } from "react";
import { ueberUnsValues } from "@/lib/ueber-uns-data";

const iconMap = { ShieldCheck, Recycle, Scale } as const;

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 280, damping: 22, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["10deg", "-10deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
    my.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className="p-8 rounded-2xl bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg h-full"
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
};

const ValuesSection = () => {
  return (
    <section className="py-24 relative [perspective:800px]">
      {/* edles Background-Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900/60 dark:to-background" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top,theme(colors.brand-blue/50)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-foreground">
          Worauf Sie sich verlassen können
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ueberUnsValues.map((v, idx) => {
            const Icon = iconMap[v.icon];
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard>
                  <div className="inline-flex items-center justify-center h-16 w-16 bg-brand-blue/10 rounded-full mb-6">
                    <Icon className="text-brand-blue" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground">{v.text}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
