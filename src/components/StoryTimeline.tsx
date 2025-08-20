// src/components/StoryTimeline.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const milestones = [
    {
        year: "2018",
        title: "Die Gründung: Eine Vision wird geboren",
        text: "Mit einer Leidenschaft für präzises Handwerk und dem Wunsch, einen wirklich zuverlässigen Service in Neuss zu etablieren, gründete Alexander Ergart das Unternehmen. Die Mission: Werte wie Vertrauen und Qualität neu zu definieren.",
        image: "/bilder_ordner/mission/kran.webp",
        align: "left"
    },
    {
        year: "2021",
        title: "Wachstum und Vertrauen in der Region",
        text: "Dank unzähliger erfolgreicher Projekte und dem wachsenden Vertrauen der Gemeinschaft konnte das Team erweitert werden. Wir wurden zu einer festen Größe für private und gewerbliche Kunden in der Region.",
        image: "/bilder_ordner/mission/team.webp",
        align: "right"
    },
    {
        year: "Heute",
        title: "Spezialisierung und Premium-Partnerschaft",
        text: "Wir haben unsere Expertise vertieft und uns auf hochwertige Fenster- und Türenlösungen spezialisiert. Die Partnerschaft mit der Manufaktur Höning steht für unser Versprechen: Deutsche Wertarbeit und modernste Technik.",
        image: "/bilder_ordner/hoening/tueren/aluminium-tuer1.webp",
        align: "left"
    }
];

const MilestoneCard = ({ milestone }: { milestone: typeof milestones[0] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const x = useTransform(scrollYProgress, [0.2, 0.5], [milestone.align === 'left' ? -50 : 50, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x }}
            className={`flex items-center gap-8 ${milestone.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
            <div className="w-full lg:w-1/2">
                <h3 className="font-bold text-2xl text-brand-blue mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.text}</p>
            </div>
            <div className="w-full lg:w-1/2">
                <Image src={milestone.image} alt={milestone.title} width={600} height={400} className="rounded-lg shadow-2xl" />
            </div>
        </motion.div>
    );
};


export const StoryTimeline = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start center", "end end"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={targetRef} className="py-24 relative">
            <div className="container max-w-5xl mx-auto px-4">
                {/* Die SVG-Linie, die sich beim Scrollen zeichnet */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden lg:block">
                    <svg width="4" height="100%" viewBox="0 0 4 1200" preserveAspectRatio="none" className="h-full">
                        <path d="M 2 0 L 2 1200" strokeWidth="4" stroke="hsl(var(--border))" fill="none" />
                        <motion.path
                            d="M 2 0 L 2 1200"
                            strokeWidth="4"
                            stroke="var(--brand-blue)"
                            fill="none"
                            style={{ pathLength }}
                        />
                    </svg>
                </div>

                <div className="space-y-24">
                    {milestones.map((milestone) => (
                        <div key={milestone.year} className="relative">
                             <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -translate-y-4 bg-brand-blue text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">
                                {milestone.year}
                            </div>
                            <MilestoneCard milestone={milestone} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};