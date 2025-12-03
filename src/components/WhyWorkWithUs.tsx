// src/components/WhyWorkWithUs.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, TrendingUp, Users, Award, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function WhyWorkWithUs() {
  const benefits = [
    {
      icon: Award,
      title: 'Qualitätsfokus',
      description: 'Wir liefern Arbeit, auf die man stolz sein kann. Hochwertige Projekte mit renommierten Partnern wie HÖNING.',
    },
    {
      icon: Shield,
      title: 'Sicherer Arbeitsplatz',
      description: 'Unbefristeter Vertrag, moderne Ausrüstung und professionelles Arbeitsumfeld für Ihre langfristige Perspektive.',
    },
    {
      icon: Heart,
      title: 'Wertschätzung',
      description: 'Faire Bezahlung, Anerkennung Ihrer Leistung und ein respektvoller Umgang auf Augenhöhe.',
    },
    {
      icon: Users,
      title: 'Starkes Team',
      description: 'Familiäres Arbeitsklima mit gegenseitiger Unterstützung und ehrlichem, direktem Austausch.',
    },
    {
      icon: TrendingUp,
      title: 'Entwicklungsmöglichkeiten',
      description: 'Weiterbildung, Schulungen und die Chance, mit dem Unternehmen zu wachsen.',
    },
    {
      icon: Sparkles,
      title: 'Moderne Ausstattung',
      description: 'Hochwertiges Werkzeug, gepflegte Fahrzeuge und alles, was Sie für exzellente Arbeit brauchen.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Warum bei Ergart arbeiten?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mehr als nur ein Job – ein Arbeitsplatz, an dem Sie sich wohlfühlen 
              und Ihre Fähigkeiten voll entfalten können.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative aspect-[21/9]">
            <Image
              src="/bilder_ordner/ueberuns/team-stockphoto-toller-arbeitsplatz.webp"
              alt="Professionelles Arbeitsumfeld bei Alexander Ergart"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ein Arbeitsplatz, der begeistert
              </h3>
              <p className="text-white/90 max-w-2xl">
                Moderne Ausstattung, professionelle Abläufe und ein Team, 
                das zusammenhält – das ist Arbeiten bei Ergart.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
