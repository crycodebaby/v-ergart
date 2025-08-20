// src/components/ValuesSection.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Recycle, Scale } from "lucide-react"; // KORREKTUR: 'Scaling' zu 'Scale'
import React, { useRef } from "react";

const values = [
    { icon: ShieldCheck, title: "Zuverlässigkeit", text: "Termine, die wir einhalten. Ergebnisse, die überzeugen." },
    { icon: Recycle, title: "Nachhaltigkeit", text: "Ressourcenschonend arbeiten, für Sie und für die Umwelt." },
    { icon: Scale, title: "Individuelle Lösungen", text: "Kein Projekt ist wie das andere. Wir hören zu und setzen Ihre Wünsche um." }
];

// EINE NEUE, WIEDERVERWENDBARE TILT-CARD KOMPONENTE
const TiltCard = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Hooks, um die Mausposition zu verfolgen
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Hooks, um die Bewegung "weicher" zu machen
    const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.5 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.5 });

    // Transformation der Mausposition in Rotationswerte
    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["-10deg", "10deg"]);
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["10deg", "-10deg"]);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        // Berechnet die Mausposition relativ zur Mitte der Karte (-0.5 bis 0.5)
        mouseX.set((e.clientX - left - width / 2) / (width / 2));
        mouseY.set((e.clientY - top - height / 2) / (height / 2));
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg h-full"
        >
            <div style={{ transform: "translateZ(50px)" }}> {/* Dieser Div hebt den Inhalt leicht an für mehr 3D-Tiefe */}
                {children}
            </div>
        </motion.div>
    );
};

// DIE HAUPTKOMPONENTE, JETZT VIEL SAUBERER
const ValuesSection = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-zinc-900 [perspective:800px]">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-foreground">Worauf Sie sich verlassen können</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <TiltCard>
                                <div className="inline-flex items-center justify-center h-16 w-16 bg-brand-blue/10 rounded-full mb-6">
                                    <value.icon className="text-brand-blue" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                                <p className="text-muted-foreground">{value.text}</p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;