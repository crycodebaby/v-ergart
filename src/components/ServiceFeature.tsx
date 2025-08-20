// src/components/ServiceFeature.tsx
"use client";

import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type Props = {
    id: number;
    icon: LucideIcon;
    title: string;
    description: string;
    setActiveIndex: (id: number) => void;
    activeIndex: number;
};

export const ServiceFeature = ({ id, icon: Icon, title, description, setActiveIndex, activeIndex }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(id);
        }
    }, [isInView, id, setActiveIndex]);

    return (
        <div ref={ref} className="feature-item p-4">
            <div className={cn(
                "flex items-start gap-4 transition-opacity duration-300",
                activeIndex === id ? "opacity-100" : "opacity-40"
            )}>
                <div className="mt-1 flex-shrink-0">
                    <Icon className="text-brand-blue" size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-foreground">{title}</h3>
                    <p className="text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
};