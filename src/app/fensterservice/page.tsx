// src/app/fensterservice/page.tsx
/**
 * Fensterservice Landing Page für Google Ads Kampagnen
 * 
 * Optimiert für:
 * - Keywords: "Fensterbauer Neuss", "Fenster Reparatur Neuss", etc.
 * - Conversion: Prominente CTAs, Tracking-Attribute
 * - SEO: Strukturierte Metadaten, JSON-LD Schema
 * - Performance: SSR, optimierte Bilder, keine unnötigen Client-Components
 * 
 * Tracking-Hinweise:
 * - Telefon-Button: data-track="call-fensterservice"
 * - Formular: data-track="form-submit-fensterservice"
 * - CTAs: data-track="cta-fensterservice"
 * 
 * Google Ads / Analytics Integration:
 * Die data-track Attribute können für Conversion-Tracking genutzt werden.
 * Plausible Analytics ist bereits eingebunden (taggedEvents aktiv).
 */

import Script from "next/script";
import { generateSEOMetadata, BASE_URL, SITE_NAME } from "@/lib/seo-utils";
import FensterserviceHero from "@/components/FensterserviceHero";
import FensterserviceLeistungen from "@/components/FensterserviceLeistungen";
import FensterserviceBildergalerie from "@/components/FensterserviceBildergalerie";
import FensterserviceVorteile from "@/components/FensterserviceVorteile";
import FensterserviceAblauf from "@/components/FensterserviceAblauf";
import FensterserviceFAQ from "@/components/FensterserviceFAQ";
import FensterserviceKontakt from "@/components/FensterserviceKontakt";
import { HandwerkskammerCard } from "@/components/HandwerkskammerCard";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
import HoeningGarantieCard from "@/components/HoeningGarantieCard";

// SEO Metadata
export const metadata = generateSEOMetadata({
    title: "Fensterbauer Neuss: Einbau, Reparatur & Service | Alexander Ergart",
    description:
        "Professioneller Fensterservice in Neuss & Umgebung: Fenstermontage, Austausch, Reparatur & Wartung. 12+ Jahre Erfahrung, HÖNING-Partner. ✓ Kostenlose Beratung ☎ 0176 668 25 889",
    path: "/fensterservice",
    image: {
        url: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
        alt: "Professioneller Fenstereinbau in Neuss – Alexander Ergart",
    },
});

/**
 * FAQ-Daten für JSON-LD Schema (muss Server-seitig sein)
 */
const faqData = [
    {
        frage: "Was kostet ein neues Fenster inklusive Einbau?",
        antwort:
            "Die Kosten hängen von Größe, Material und Verglasung ab. Ein Standardfenster inkl. fachgerechter Montage beginnt bei ca. 400–600 €. Für ein genaues Angebot besichtigen wir kostenlos vor Ort.",
    },
    {
        frage: "Wie lange dauert der Einbau eines Fensters?",
        antwort:
            "Der Austausch eines einzelnen Fensters dauert in der Regel 2–4 Stunden. Bei mehreren Fenstern planen wir effizient, sodass Sie meist am selben Tag fertig montierte Fenster haben.",
    },
    {
        frage: "Bieten Sie auch Reparaturen an?",
        antwort:
            "Ja, wir reparieren klemmende Fenster, erneuern Dichtungen, tauschen Beschläge aus und stellen Fensterflügel nach. Oft ist eine Reparatur günstiger als ein Komplettaustausch.",
    },
    {
        frage: "In welchen Gebieten sind Sie tätig?",
        antwort:
            "Wir sind hauptsächlich in Neuss und im Umkreis von ca. 15–20 km tätig: Düsseldorf, Kaarst, Dormagen, Meerbusch, Korschenbroich und Grevenbroich.",
    },
    {
        frage: "Wie schnell bekomme ich einen Termin?",
        antwort:
            "In der Regel können wir innerhalb von 1–2 Wochen einen Beratungstermin anbieten. Bei dringenden Reparaturen versuchen wir, noch schneller zu reagieren.",
    },
    {
        frage: "Welche Fenstermarken verbauen Sie?",
        antwort:
            "Wir sind offizieller Partner von HÖNING; einem deutschen Premium-Hersteller. Die Fenster überzeugen durch höchste Qualität, Energieeffizienz und lange Lebensdauer.",
    },
];

/**
 * FAQPage JSON-LD Schema für Google Rich Snippets
 */
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.frage,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.antwort,
        },
    })),
};

/**
 * LocalBusiness + Service JSON-LD für Google Rich Results
 */
const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE_URL}/fensterservice#organization`,
    name: SITE_NAME,
    alternateName: "Ergart Fensterservice",
    description:
        "Professioneller Fensterservice in Neuss und Umgebung: Fenstermontage, Austausch, Reparatur, Wartung und Dichtungserneuerung. HÖNING-Partner für Premium-Qualität.",
    url: `${BASE_URL}/fensterservice`,
    telephone: "+49 176 668 25 889",
    email: "aergart@gmail.com",
    logo: `${BASE_URL}/bilder_ordner/logo/ergart-hausmeister-logo.webp`,
    image: `${BASE_URL}/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp`,
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
                name: "Fenstermontage",
                description:
                    "Professioneller Einbau neuer Fenster mit fachgerechter Abdichtung",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Fensteraustausch",
                description:
                    "Austausch alter Fenster gegen moderne, energieeffiziente Modelle",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Fensterreparatur",
                description:
                    "Reparatur bei Beschädigungen, klemmenden Rahmen oder defekten Beschlägen",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Fensterwartung",
                description:
                    "Regelmäßige Wartung und präzises Einstellen für dauerhafte Funktion",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Dichtungserneuerung",
                description:
                    "Erneuerung von Fensterdichtungen zur Vermeidung von Zugluft",
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
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1",
    },
};

export default function FensterservicePage() {
    return (
        <>
            {/* Structured Data: LocalBusiness */}
            <Script
                id="fensterservice-local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />

            {/* Structured Data: FAQPage */}
            <Script
                id="fensterservice-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Page Sections */}
            <FensterserviceHero />
            <FensterserviceLeistungen />
            <FensterserviceBildergalerie />

            {/* Energieeinspar-Rechner */}
            <HoeningEnergierechner />

            {/* HÖNING Garantie & Digital ID */}
            <HoeningGarantieCard />

            <FensterserviceVorteile />
            <FensterserviceAblauf />
            <FensterserviceFAQ />
            <div className="container mx-auto px-4">
                <HandwerkskammerCard />
            </div>
            <FensterserviceKontakt />
        </>
    );
}

