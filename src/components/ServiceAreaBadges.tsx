// src/components/ServiceAreaBadges.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

type Props = {
  areas: string[];
  className?: string;
};

export function ServiceAreaBadges({ areas, className = '' }: Props) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-brand-blue" />
        <span className="text-sm font-semibold text-foreground">Verfügbar in:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {areas.map((area, index) => (
          <motion.span
            key={area}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="inline-flex items-center px-3 py-1 bg-muted hover:bg-brand-blue/10 border border-border/40 hover:border-brand-blue/30 rounded-full text-sm text-muted-foreground hover:text-brand-blue transition-colors cursor-default"
          >
            {area}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
