// src/components/MapSection.tsx
"use client";
import { motion } from 'framer-motion';

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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ihr Handwerker direkt in Ihrer Nähe</h2>
                <p className="text-lg text-muted-foreground mb-12">Zuverlässig und schnell vor Ort in Neuss und Umgebung.</p>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border border-border/20">
                    <iframe
                        src="https://www.google.com/maps/place/Further+Str.+89B,+41462+Neuss/@51.206685,6.677124,16z/data=!4m6!3m5!1s0x47b8b45af82e16e1:0xfe2636e0d90c3936!8m2!3d51.2066851!4d6.6771239!16s%2Fg%2F11c1grylsf?hl=de&entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Standort von Alexander Ergart in Neuss"
                    ></iframe>
                </div>
            </div>
        </motion.section>
    );
};

export default MapSection;