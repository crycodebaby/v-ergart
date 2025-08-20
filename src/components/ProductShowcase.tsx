// src/components/ProductShowcase.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ShieldCheck, ThermometerSun, Leaf } from "lucide-react";

const ProductCard = ({ title, text, image, features }: { title: string, text: string, image: string, features: { icon: React.ElementType, text: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Image src={image} alt={title} width={600} height={500} className="rounded-lg shadow-xl" />
        <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
            <p className="text-muted-foreground mb-6">{text}</p>
            <ul className="space-y-4">
                {features.map((feature, i) => <li key={i} className="flex items-center gap-3"><feature.icon className="text-brand-blue" size={20} /><span>{feature.text}</span></li>)}
            </ul>
        </div>
    </div>
);

const ProductShowcase = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Fenster & Türen: Unsere Kernkompetenz</h2>
                     <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Modernste Technik für Ihr Zuhause – sicher, energieeffizient und stilvoll.</p>
                </div>
                <Tabs defaultValue="fenster" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="fenster">Fenster</TabsTrigger>
                        <TabsTrigger value="haustueren">Haustüren</TabsTrigger>
                        <TabsTrigger value="nebentueren">Nebeneingangstüren</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fenster">
                        <ProductCard 
                            title="Energieeffiziente Kunststofffenster"
                            text="Maximale Wärmedämmung und modernes Design. Unsere Fenster senken Ihre Heizkosten und steigern den Wert Ihrer Immobilie."
                            image="/bilder_ordner/hoening/fenster/fenster2.webp"
                            features={[
                                { icon: ThermometerSun, text: "Exzellente U-Werte für höchste Energieeffizienz" },
                                { icon: ShieldCheck, text: "Erhöhter Einbruchschutz durch moderne Verriegelung" },
                                { icon: Leaf, text: "CO2-Reduktion und Beitrag zum Umweltschutz" },
                            ]}
                        />
                    </TabsContent>
                    <TabsContent value="haustueren">
                        <ProductCard 
                            title="Sichere Aluminium-Haustüren"
                            text="Der erste Eindruck zählt. Unsere Haustüren vereinen höchste Sicherheitsstandards mit individueller Eleganz und Langlebigkeit."
                            image="/bilder_ordner/hoening/tueren/aluminium-tuer1.webp"
                            features={[
                                { icon: ShieldCheck, text: "Mehrfachverriegelung für maximale Sicherheit (RC2)" },
                                { icon: ThermometerSun, text: "Hervorragende Wärme- und Schalldämmung" },
                                { icon: Leaf, text: "Vielfältige Designs und Oberflächen" },
                            ]}
                        />
                    </TabsContent>
                     <TabsContent value="nebentueren">
                        <ProductCard 
                            title="Robuste Nebeneingangstüren"
                            text="Funktionalität und Sicherheit müssen nicht auf Kosten des Designs gehen. Ideal für Keller, Garage oder den Gartenzugang."
                            image="/bilder_ordner/hoening/tueren/aluminium-tuer2.webp"
                            features={[
                                { icon: ShieldCheck, text: "Solide Bauweise und geprüfte Sicherheitskomponenten" },
                                { icon: ThermometerSun, text: "Witterungsbeständig und wartungsarm" },
                                { icon: Leaf, text: "Praktische Lösungen für den Alltag" },
                            ]}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default ProductShowcase;