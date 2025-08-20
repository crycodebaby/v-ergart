// src/components/Testimonials.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Jonas und Lena M.",
        quote: "Unser Balkon ist jetzt ein Träumchen! Die neue Schiebetür ist superleicht und sieht fantastisch aus.",
        image: "/bilder_ordner/startseite-kundenrezensionen/handwerker-neuss-profi-handwerker.webp"
    },
    {
        name: "Claudia H.",
        quote: "Die neue Farbe in Eierschalen-Weiß verleiht meiner Wohnung einen modernen Look. Saubere Arbeit und tolle Beratung!",
        image: "/bilder_ordner/startseite-kundenrezensionen/hausmeisterdienste-neuss.webp"
    },
    {
        name: "Johannes U.",
        quote: "Unsere neuen Fenster sind wunderbar! Der Austausch verlief reibungslos und das Ergebnis ist großartig.",
        image: "/bilder_ordner/startseite-kundenrezensionen/allround-fensterservice-neuss-fensterprofi.webp"
    }
];

const Testimonials = () => {
    return(
        <section id="testimonials" className="py-20 bg-slate-50 dark:bg-zinc-900">
            <div className="container max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Das sagen unsere Kunden</h2>
                <p className="text-lg text-muted-foreground mb-16">Unsere Arbeit spricht für sich!</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            className="card bg-background p-8 rounded-xl shadow-lg border border-border/20 flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <Image
                                src={testimonial.image}
                                alt={`Foto von ${testimonial.name}`}
                                width={80}
                                height={80}
                                className="rounded-full mb-6"
                            />
                            <blockquote className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</blockquote>
                            <p className="font-bold text-foreground mt-6">- {testimonial.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;