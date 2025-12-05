// src/components/KarriereHero.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Award, Heart, TrendingUp } from 'lucide-react';

export function KarriereHero() {
  const benefits = [
    {
      icon: Users,
      title: 'Starkes Team',
      description: 'Arbeiten in einem familiären Umfeld',
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Hochwertige Projekte & Partnerschaften',
    },
    {
      icon: Heart,
      title: 'Wertschätzung',
      description: 'Faire Bezahlung & Anerkennung',
    },
    {
      icon: TrendingUp,
      title: 'Entwicklung',
      description: 'Weiterbildung & Perspektiven',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px,transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-6">
              <span className="inline-block w-2 h-2 bg-brand-blue rounded-full mr-2 animate-pulse" />
              Wir suchen Verstärkung
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Werden Sie Teil
              <span className="block text-brand-blue mt-2">unseres Teams</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Bei Alexander Ergart vereinen wir handwerkliche Exzellenz mit modernem Arbeitsumfeld. 
              Werden Sie Teil eines Teams, das Qualität lebt und Werte schätzt.
            </p>

            {/* Quick Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/30 hover:border-brand-blue/50 transition-colors"
                >
                  <benefit.icon className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="flex flex-col gap-1">
                <div className="w-0.5 h-4 bg-brand-blue animate-pulse" />
              </div>
              <span>Scrollen Sie nach unten für offene Stellen</span>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-blue/20">
              <Image
                src="/bilder_ordner/ueberuns/teamfoto-vor-hauptzentrale-ergart.webp"
                alt="Team Alexander Ergart - Gemeinsam erfolgreich"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Badge */}  
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Unser Versprechen</p>
                    <p className="font-semibold text-foreground">Qualität durch Teamgeist</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white font-semibold text-sm">
                        {i}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xs font-medium">
                      +5
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-xl border border-border/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue">13+</div>
                <div className="text-xs text-muted-foreground mt-1">Jahre Erfahrung</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
