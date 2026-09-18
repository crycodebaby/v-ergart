// src/app/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyErgart from "@/components/WhyErgart";
import MapSection from "@/components/MapSection";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Section } from "@/components/ui/section";
import { TrustAndPartnerSection } from "@/components/TrustAndPartnerSection";

import { GOOGLE_AGGREGATE_RATING } from "@/lib/reviews";
import BlogTeaser from "@/components/BlogTeaser";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  || "https://alexander-ergart.de";

/**
 * Homepage Metadata – SEO-optimiert
 */
export const metadata: Metadata = {
  title: "Hausmeisterservice Neuss | Alexander Ergart – Ihr Profi vor Ort",
  description:
    "Ihr zuverlässiger Hausmeisterservice in Neuss und Umgebung: Gebäudereinigung, Objektpflege, Fenster- & Türenservice, Reparaturen und Winterdienst. Über 13 Jahre Erfahrung.",
  keywords: [
    "Hausmeisterservice Neuss",
    "Hausmeister Neuss",
    "Gebäudereinigung Neuss",
    "Objektpflege",
    "Fensterservice Neuss",
    "Winterdienst Neuss",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Alexander Ergart Hausmeister- & Fensterservice",
    title: "Hausmeisterservice Neuss | Alexander Ergart",
    description:
      "Ihr zuverlässiger Partner für Hausmeisterservice, Gebäudereinigung, Fenster- & Türenservice in Neuss und Umgebung.",
    images: [
      {
        url: `${BASE_URL}/bilder_ordner/office-ergart.webp`,
        width: 1200,
        height: 630,
        alt: "Alexander Ergart Hausmeisterservice in Neuss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausmeisterservice Neuss | Alexander Ergart",
    description:
      "Ihr zuverlässiger Partner für Hausmeisterservice, Gebäudereinigung und Fensterservice in Neuss.",
    images: [`${BASE_URL}/bilder_ordner/office-ergart.webp`],
  },
};

/**
 * LocalBusiness Structured Data für Google Rich Results
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: "Alexander Ergart Hausmeister- & Fensterservice",
  alternateName: "Ergart Hausmeisterservice",
  description:
    "Professioneller Hausmeisterservice in Neuss und Umgebung: Gebäudereinigung, Objektpflege, Fenster- und Türenservice, Reparaturen, Winterdienst.",
  url: BASE_URL,
  telephone: "+49 176 668 25 889",
  email: "info@ergart.de",
  logo: `${BASE_URL}/bilder_ordner/AE_logo.svg`,
  image: `${BASE_URL}/bilder_ordner/office-ergart.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Neuss",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.1981,
    longitude: 6.6899,
  },
  areaServed: [
    { "@type": "City", name: "Neuss" },
    { "@type": "City", name: "Düsseldorf" },
    { "@type": "City", name: "Kaarst" },
    { "@type": "City", name: "Dormagen" },
    { "@type": "City", name: "Meerbusch" },
    { "@type": "City", name: "Korschenbroich" },
    { "@type": "City", name: "Grevenbroich" },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Hausmeisterservice",
        description: "Umfassende Hausmeisterdienstleistungen für Wohn- und Gewerbeobjekte",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Gebäudereinigung",
        description: "Professionelle Reinigung von Treppenhäusern, Büros und Gewerbeflächen",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Fenster- und Türenservice",
        description: "Einbau, Wartung und Reparatur von Fenstern und Türen",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Winterdienst",
        description: "Zuverlässiger Räum- und Streudienst im Winter",
      },
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:00",
      closes: "16:00",
    },
  ],
  priceRange: "€€",
  aggregateRating: GOOGLE_AGGREGATE_RATING,
};

export default function HomePage() {
  return (
    <>
      {/* LocalBusiness Structured Data */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <Hero />
      <Stats />
      <Services />
      {/* Preservation-Wrapper (Welle 2D.1): PartnersSection hat ihr eigenes
          py/px/max-w abgegeben. Der Wrapper haelt den bisherigen Zustand
          dieser noch nicht migrierten Route. */}
      <Section surface="base" spacing="compact">
        <TrustAndPartnerSection />
      </Section>
      <WhyErgart />
      <ProfileCard />
      <Testimonials />
      <MapSection />
      <Section surface="muted">
        <BlogTeaser
          title="Aus unserem Ratgeber"
          description="Praktische Tipps rund um Fenster, Gebäudepflege und Winterdienst – direkt aus der Praxis in Neuss."
        />
      </Section>
      <CTA />
    </>
  );
}