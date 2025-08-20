// src/components/DoorCarousel.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Wir importieren unser Helferlein für Klassen

// NEU: Jetzt mit 16 Türen
const doorImages = Array.from({ length: 16 }, (_, i) => `tuer${i + 1}.jpg`);

const DoorCarousel = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Eine Vielfalt an Designs</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                    Entdecken Sie eine Auswahl unserer hochwertigen Türen – für jeden Stil und jedes Sicherheitsbedürfnis.
                </p>
                
                <div
                    className="w-full inline-flex flex-nowrap overflow-hidden 
                               [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >
                    <ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll"
                        // NEU: Hier übergeben wir die Anzahl der Bilder als CSS-Variable
                        style={{ '--image-count': doorImages.length } as React.CSSProperties}
                    >
                        {/* Wir rendern die Bilder zweimal für den nahtlosen Loop */}
                        {[...doorImages, ...doorImages].map((imageName, index) => (
                            <li key={index} className="flex-shrink-0">
                                <Image
                                    src={`/bilder_ordner/hoening/tuer-kreisel/${imageName}`}
                                    alt={`Design-Tür ${imageName}`}
                                    // NEU: Angepasste Größe für die neuen, hochauflösenden Bilder.
                                    // Passe dies ggf. an die exakte Größe deiner Dateien an.
                                    width={210}
                                    height={270}
                                    className="rounded-lg object-cover shadow-lg h-[270px] w-auto"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default DoorCarousel;