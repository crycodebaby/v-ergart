// src/app/leistungen/[slug]/page.tsx

// --- GRUNDLAGEN & IMPORTE ---
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { LeistungGallery } from "@/components/LeistungGallery";
import CTA from "@/components/CTA";

// --- DATEN-HELFER & PROPS ---
type Props = { params: { slug: string } };

function getLeistung(slug: string) {
  return LEISTUNGEN_DETAILS.find((l) => l.slug === slug);
}

// --- SEITEN-GENERIERUNG (STATIC PARAMS) ---
export function generateStaticParams() {
  return LEISTUNGEN_DETAILS.map((l) => ({ slug: l.slug }));
}

// --- DYNAMISCHE SEO METADATEN ---
export function generateMetadata({ params }: Props): Metadata {
  const item = getLeistung(params.slug);
  if (!item) return {};

  const title = `${item.title} | ERGART Leistungen`;
  const description = item.description;
  const url = `https://www.alexander-ergart.de/leistungen/${item.slug}`; // Domain angepasst

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: new URL(
            item.heroImage,
            "https://www.alexander-ergart.de"
          ).toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// ==================================================================
// HAUPTKOMPONENTE: Die Seite selbst
// KORREKTUR: Dies darf KEINE async function sein, da es eine reine Server-Komponente ist,
// die ihre Daten synchron abruft.
// ==================================================================
export default function LeistungDetailPage({ params }: Props) {
  const item = getLeistung(params.slug);
  if (!item) return notFound();

  return (
    <>
      {/* Hero Sektion */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center p-4">
          <nav className="text-sm text-slate-300 mb-2">
            <Link href="/leistungen" className="hover:underline">
              Leistungen
            </Link>{" "}
            / <span>{item.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            {item.title}
          </h1>
          <p className="mt-3 text-lg text-slate-200 max-w-3xl mx-auto drop-shadow">
            {item.description}
          </p>
        </div>
      </section>

      {/* Hauptinhalt Sektion */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Linke Spalte: Vorteile & FAQ */}
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Ihre Vorteile im Überblick
              </h2>
              <ul className="mt-6 space-y-4">
                {item.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {item.faq && item.faq.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-foreground">
                  Häufig gestellte Fragen
                </h2>
                <div className="mt-6 border-t border-border">
                  {item.faq.map(({ q, a }) => (
                    <div key={q} className="py-6 border-b border-border">
                      <p className="font-semibold text-lg text-foreground">
                        {q}
                      </p>
                      <p className="mt-2 text-muted-foreground">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rechte Spalte: Galerie oder CTA */}
          <aside className="lg:sticky top-28 h-fit">
            {item.galleryImages && item.galleryImages.length > 0 ? (
              <LeistungGallery images={item.galleryImages} />
            ) : (
              <div className="bg-card border border-border p-6 rounded-lg text-center">
                <h3 className="font-bold text-foreground">
                  Interesse geweckt?
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Lassen Sie uns über Ihr Projekt sprechen.
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href="/kontakt">Jetzt anfragen</Link>
                </Button>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTA />
    </>
  );
}
