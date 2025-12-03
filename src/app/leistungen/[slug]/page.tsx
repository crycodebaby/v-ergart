// src/app/leistungen/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react";
import { LeistungGallery } from "@/components/LeistungGallery";
import CTA from "@/components/CTA";

type Props = { params: { slug: string } };

function getLeistung(slug: string) {
  return LEISTUNGEN_DETAILS.find((l) => l.slug === slug);
}

export function generateStaticParams() {
  return LEISTUNGEN_DETAILS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getLeistung(params.slug);
  if (!item) return {};

  const title = `${item.title} | ERGART Leistungen`;
  const description = item.description;
  const url = `https://www.alexander-ergart.de/leistungen/${item.slug}`;

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

export default function LeistungDetailPage({ params }: Props) {
  const item = getLeistung(params.slug);
  if (!item) return notFound();

  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900 dark:from-black dark:via-zinc-950 dark:to-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          {/* Breadcrumb */}
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Zurück zur Übersicht</span>
          </Link>

          {/* Content */}
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 rounded-full text-brand-blue text-sm font-medium mb-6">
              Leistung
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {item.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {/* Quick CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link href="/kontakt">
                  <Mail className="w-4 h-4" />
                  Jetzt anfragen
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                <a href="tel:+4917666825889">
                  <Phone className="w-4 h-4" />
                  Anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path 
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" 
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Benefits & FAQ */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Ihre Vorteile im Überblick
                </h2>
                <div className="grid gap-4">
                  {item.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 bg-card border border-border/40 rounded-xl hover:border-brand-blue/50 hover:shadow-lg transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-brand-blue" />
                      </div>
                      <p className="text-base text-foreground leading-relaxed pt-1.5">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {item.faq && item.faq.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-8">
                    Häufig gestellte Fragen
                  </h2>
                  <div className="space-y-6">
                    {item.faq.map(({ q, a }, index) => (
                      <div
                        key={index}
                        className="p-6 bg-card border border-border/40 rounded-xl"
                      >
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                          {q}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="space-y-6">
              {/* Gallery */}
              {item.galleryImages && item.galleryImages.length > 0 && (
                <div className="lg:sticky lg:top-28">
                  <LeistungGallery images={item.galleryImages} />
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-brand-blue to-blue-600 text-white p-8 rounded-xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-3">
                  Interesse geweckt?
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Lassen Sie uns über Ihr Projekt sprechen. Wir beraten Sie gerne unverbindlich.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-white text-brand-blue hover:bg-slate-100">
                    <Link href="/kontakt">
                      <Mail className="w-4 h-4 mr-2" />
                      Jetzt anfragen
                    </Link>
                  </Button>
                  <a
                    href="tel:+4917666825889"
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-md border-2 border-white/30 hover:bg-white/10 transition-all font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    0176 – 668 25 889
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
