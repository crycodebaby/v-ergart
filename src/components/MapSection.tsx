// src/components/MapSection.tsx
"use client";
import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <motion.section
      id="map-section"
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Ihr Handwerker direkt in Ihrer Nähe
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Zuverlässig und schnell vor Ort in Neuss und Umgebung.
        </p>

        {/* Responsive 16:9 Map */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/20">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.6725517098325!2d6.677123900000001!3d51.206685099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b502d2fb22dd%3A0x85c06d8d067c552!2sHausmeisterservice%20Alexander%20Ergart!5e0!3m2!1sde!2sde!4v1755703197499!5m2!1sde!2sde"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Standort von Alexander Ergart in Neuss"
          />
        </div>

        {/* Optional: Link zum Google Business Profil */}
        <div className="mt-6">
          <a
            href="https://share.google/83jFCBXI97XewOWWz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-blue hover:underline"
          >
            Auf Google ansehen
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default MapSection;
