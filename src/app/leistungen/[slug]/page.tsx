// src/app/leistungen/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react";
import { LeistungGallery } from "@/components/LeistungGallery";
import { ServiceAreaBadges } from "@/components/ServiceAreaBadges";
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

  const url = `https://www.alexander-ergart.de/leistungen/${item.slug}`;

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: item.seoTitle,
      description: item.seoDescription,
      url,
      type: "article",
      locale: "de_DE",
      siteName: "Alexander Ergart Hausmeister- & Fensterservice",
      images: [
        {
          url: new URL(item.heroImage, "https://www.alexander-ergart.de").toString(),
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.seoTitle,
      description: item.seoDescription,
    },
    other: {
      "geo.region": "DE-NW",
      "geo.placename": "Neuss",
      "geo.position": "51.1986;6.6850",
    },
  };
}

// JSON-LD Structured Data for Service
function ServiceJsonLd({ item }: { item: typeof LEISTUNGEN_DETAILS[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.detailedDescription,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.alexander-ergart.de",
      name: "Alexander Ergart Hausmeister- & Fensterservice",
      telephone: "+49-176-66825889",
      email: "aergart@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Further Straße 89B",
        addressLocality: "Neuss",
        postalCode: "41462",
        addressRegion: "NRW",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "51.1986",
        longitude: "6.6850",
      },
    },
    areaServed: item.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
      containedIn: {
        "@type": "State",
        name: "Nordrhein-Westfalen",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${item.title} Angebote`,
      itemListElement: item.benefits.map((benefit, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: benefit,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function LeistungDetailPage({ params }: Props) {
  const item = getLeistung(params.slug);
  if (!item) return notFound();

  return (
    <>
      <ServiceJsonLd item={item} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors group mb-8"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Zurück zur Übersicht
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {item.title}
              </h1>
              
              {/* Service Area Badges */}
              <ServiceAreaBadges areas={item.serviceArea} className="mb-6" />

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {item.detailedDescription}
              </p>

              {/* Quick CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/kontakt">
                    <Mail className="w-4 h-4 mr-2" />
                    Kostenlose Beratung
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+4917666825889">
                    <Phone className="w-4 h-4 mr-2" />
                    0176 – 668 25 889
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-brand-blue/20">
              <Image
                src={item.heroImage}
                alt={`${item.title} in Neuss und Umgebung`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Benefits & FAQ */}
            <div className="lg:col-span-2 space-y-16">
              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Warum {item.title} von Ergart?
                </h2>
                <div className="space-y-4">
                  {item.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/50 hover:shadow-lg transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-blue/10 group-hover:bg-brand-blue/20 flex items-center justify-center flex-shrink-0 transition-colors">
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
                  <div className="space-y-4">
                    {item.faq.map(({ q, a }, index) => (
                      <div
                        key={index}
                        className="p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/20 transition-colors"
                      >
                        <h3 className="font-semibold text-lg text-foreground mb-3 flex items-start gap-2">
                          <span className="text-brand-blue mt-0.5">Q:</span>
                          {q}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-6">
                          {a}
                        </p>
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
              <div className="bg-card border border-border/40 p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  Interesse geweckt?
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Lassen Sie uns über Ihr Projekt in Neuss und Umgebung sprechen.
                </p>
                <Button asChild className="w-full mb-3">
                  <Link href="/kontakt">
                    <Mail className="w-4 h-4 mr-2" />
                    Jetzt anfragen
                  </Link>
                </Button>
                <a
                  href="tel:+4917666825889"
                  className="flex items-center justify-center gap-2 w-full h-10 rounded-md border-2 border-border hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Anrufen
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
