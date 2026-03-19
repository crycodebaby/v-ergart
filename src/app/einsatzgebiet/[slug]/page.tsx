import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone } from "lucide-react";
import { LOCATIONS, type LocationSlug } from "@/lib/locations";
import CTA from "@/components/CTA";
import MapSection from "@/components/MapSection";
import KontaktHero from "@/components/KontaktHero"; // Reusing hero style or creating a specific one
import { BASE_URL } from "@/lib/seo-utils";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = LOCATIONS.find((l) => l.slug === params.slug);
  if (!location) return { title: "Einsatzgebiet nicht gefunden" };

  // Nur Haupt-Standorte indexieren (Neuss ist Hauptstandort)
  // TODO [SEO Review]: Review whether sub-locations like neuss-hoisten 
  // should remain noindex or be opened up for indexation strategically.
  const shouldIndex = ['neuss'].includes(location.slug);

  return {
    title: `Hausmeister ${location.name} | Alexander Ergart`,
    description: `Ihr zuverlässiger Hausmeister in ${location.name}. Reinigung, Reparaturen, Gartenpflege & Winterdienst. Jetzt Angebot für ${location.name} anfordern!`,
    alternates: {
      canonical: `${BASE_URL}/einsatzgebiet/${location.slug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `Hausmeister Service in ${location.name} | Alexander Ergart`,
      description: `Professioneller Hausmeisterservice direkt in ${location.name}. Schnell, zuverlässig & kompetent.`,
      url: `${BASE_URL}/einsatzgebiet/${location.slug}`,
    },
  };
}

export default function LocationPage({ params }: Props) {
  const location = LOCATIONS.find((l) => l.slug === params.slug);

  if (!location) {
    return notFound();
  }

  return (
    <main>
      {/* Simple Hero for Location */}
      <section className="relative bg-zinc-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
          style={{ backgroundImage: "url('/bilder_ordner/hero/hero-bg.webp')" }}
        />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 border border-brand-blue/50 text-brand-blue text-sm font-medium mb-6">
            Vor Ort in {location.name}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ihr Hausmeister in <span className="text-brand-blue">{location.name}</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Zuverlässiger Service für Immobilien, Gärten und Gewerbeobjekte direkt in Ihrer Nähe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors"
            >
              Angebot anfordern
            </Link>
            <a
              href="tel:+4917666825889"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              0176 668 25 889
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Warum Alexander Ergart in {location.name}?
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Als lokaler Dienstleister kennen wir {location.name} und die Bedürfnisse unserer Kunden vor Ort.
                Egal ob private Immobilie, Mehrfamilienhaus oder Gewerbeobjekt – wir sorgen für Ordnung, Sauberkeit und Werterhalt.
              </p>
              <ul className="space-y-4">
                {[
                  "Schnelle Anfahrt & Reaktionszeiten",
                  "Persönlicher Ansprechpartner vor Ort",
                  "Kenntnis der lokalen Gegebenheiten",
                  "Faire Preise ohne versteckte Anfahrtskosten",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand-blue h-6 w-6 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/leistungen"
                  className="text-brand-blue font-semibold hover:underline inline-flex items-center"
                >
                  Alle Leistungen ansehen <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-zinc-100">
              {/* Placeholder map or image - using MapSection below instead for real map */}
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                <MapPin className="h-16 w-16 text-brand-blue/50" />
                <span className="sr-only">Karte von {location.name}</span>
              </div>
              {/* If you had specific images for each district, you'd load them here */}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Reused */}
      <MapSection />

      {/* CTA */}
      <CTA />
    </main>
  );
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    slug: loc.slug,
  }));
}
