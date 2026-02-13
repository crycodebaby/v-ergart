// src/app/leistungen/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Phone, Mail, ChevronRight, Home } from "lucide-react";
import { LeistungGallery } from "@/components/LeistungGallery";
import { ServiceAreaBadges } from "@/components/ServiceAreaBadges";
import CTA from "@/components/CTA";
import { BASE_URL } from "@/lib/seo-utils";
import { ServicePromoCard } from "@/components/ServicePromoCard";

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

  const url = `${BASE_URL}/leistungen/${item.slug}`;

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
          url: new URL(item.heroImage, BASE_URL).toString(),
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

// JSON-LD Structured Data
function ServiceJsonLd({ item }: { item: typeof LEISTUNGEN_DETAILS[0] }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.detailedDescription,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Leistungen",
        item: `${BASE_URL}/leistungen`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `${BASE_URL}/leistungen/${item.slug}`,
      },
    ],
  };

  const faqSchema = item.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export default function LeistungDetailPage({ params }: Props) {
  const item = getLeistung(params.slug);
  if (!item) return notFound();

  return (
    <>
      <ServiceJsonLd item={item} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/leistungen" className="hover:text-brand-blue transition-colors">
              Leistungen
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
              {item.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {item.title}
              </h1>

              {/* Service Area Badges */}
              <ServiceAreaBadges areas={item.serviceArea} className="mb-8" />

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {item.detailedDescription}
              </p>

              {/* Quick CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Link href="/kontakt">
                    <Mail className="w-5 h-5 mr-2" />
                    Kostenlos anfragen
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover:bg-accent/50">
                  <a href="tel:+4917666825889">
                    <Phone className="w-5 h-5 mr-2" />
                    0176 – 668 25 889
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 ring-1 ring-black/5">
              <Image
                src={item.heroImage}
                alt={`${item.title} in Neuss und Umgebung`}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content Column (8 spans) */}
            <div className="lg:col-span-8 space-y-20">

              {/* Benefits Grid */}
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-brand-blue pl-4">
                  Ihre Vorteile bei Ergart
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {item.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/30 hover:shadow-lg transition-all group h-full"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 group-hover:bg-brand-blue/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <CheckCircle className="w-5 h-5 text-brand-blue" />
                      </div>
                      <p className="text-base text-foreground/90 font-medium leading-relaxed pt-1">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              {item.galleryImages && item.galleryImages.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Eindrücke unserer Arbeit
                  </h2>
                  <LeistungGallery images={item.galleryImages} />
                </section>
              )}

              {/* FAQ */}
              {item.faq && item.faq.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-brand-blue pl-4">
                    Häufig gestellte Fragen
                  </h2>
                  <div className="space-y-4">
                    {item.faq.map(({ q, a }, index) => (
                      <div
                        key={index}
                        className="p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/20 transition-colors"
                      >
                        <h3 className="font-semibold text-lg text-foreground mb-3 flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded bg-brand-blue text-white text-xs font-bold mt-0.5 flex-shrink-0">
                            ?
                          </span>
                          {q}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-9">
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar (4 spans) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Desktop Sticky Container */}
              <div className="lg:sticky lg:top-32 space-y-8">

                {/* Contact Card */}
                <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-foreground mb-2 text-lg">
                    Interesse geweckt?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Lassen Sie uns über Ihr Projekt in Neuss und Umgebung sprechen. Unverbindlich & kostenlos.
                  </p>

                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/kontakt">
                        Kontaktformular
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                    <a
                      href="tel:+4917666825889"
                      className="flex items-center justify-center gap-2 w-full h-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      0176 – 668 25 889
                    </a>
                  </div>
                </div>

                {/* HIER NEU: Fenster Promo Card */}
                <ServicePromoCard />

              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
