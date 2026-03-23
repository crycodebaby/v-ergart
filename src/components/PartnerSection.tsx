// src/components/PartnerSection.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const PartnerSection = () => {
    return (
        <motion.section 
            className="py-16 bg-slate-50 dark:bg-zinc-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-widest mb-8">
                    Qualität, der Sie vertrauen können
                </h3>
                <div className="flex justify-center items-center gap-12 md:gap-20">
                    <div className="flex flex-col items-center gap-4">
                        <Image src="/bilder_ordner/coop/hoening.png" alt="Höning Logo" width={180} height={60} className="dark:brightness-0 dark:invert" unoptimized />
                        <p className="text-xs text-muted-foreground">Premium Partner</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Image src="/bilder_ordner/coop/made-in-germany.png" alt="Made in Germany Siegel" width={80} height={80} unoptimized />
                         <p className="text-xs text-muted-foreground">Deutsche Wertarbeit</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default PartnerSection;