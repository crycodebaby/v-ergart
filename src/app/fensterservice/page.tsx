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
import { Section } from "@/components/ui/section";
import FensterserviceHero from "@/components/FensterserviceHero";
import FensterserviceLeistungen from "@/components/FensterserviceLeistungen";
import FensterserviceBildergalerie from "@/components/FensterserviceBildergalerie";
import FensterserviceVorteile from "@/components/FensterserviceVorteile";
import FensterserviceAblauf from "@/components/FensterserviceAblauf";
import FensterserviceFAQ from "@/components/FensterserviceFAQ";
import FensterserviceKontakt from "@/components/FensterserviceKontakt";
import FensterservicePreisBewertungen from "@/components/FensterservicePreisBewertungen";
import TrustAndPartnerSection from "@/components/TrustAndPartnerSection";
import { ProcessStepper } from "@/components/ProcessStepper";
import HoeningEnergierechner from "@/components/HoeningEnergierechner";
import HoeningGarantieCard from "@/components/HoeningGarantieCard";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import { GOOGLE_AGGREGATE_RATING } from "@/lib/reviews";
import BlogTeaser from "@/components/BlogTeaser";
// SEO Metadata
export const metadata = generateSEOMetadata({
    title: "Fensterbauer Neuss: Einbau, Reparatur & Service | Alexander Ergart",
    description:
        "Professioneller Fensterservice in Neuss & Umgebung: Fenstermontage, Austausch, Reparatur & Wartung. 13+ Jahre Erfahrung, HÖNING-Partner. ✓ Kostenlose Beratung ☎ 0176 668 25 889",
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
 * HowTo Schema.org JSON-LD – Montageprozess für Google Rich Snippets
 */
const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Fenstermontage – Transparenz von Anfang bis Ende",
    description:
        "Unser bewährter 8-Schritte-Montageprozess für professionellen Fenstereinbau in Neuss und Umgebung – meisterhaft ausgeführt von Alexander Ergart.",
    totalTime: "PT4H",
    step: [
        { "@type": "HowToStep", position: 1, name: "Bestandsaufnahme", text: "Jedes Projekt beginnt mit der Analyse. Wir begutachten die alten Fenster und die Bausubstanz." },
        { "@type": "HowToStep", position: 2, name: "Vorbereitung", text: "Nach dem Ausbau der alten Elemente wird der Arbeitsplatz sauber vorbereitet und geschützt." },
        { "@type": "HowToStep", position: 3, name: "Logistik", text: "Mit Kränen und Spezialfahrzeugen positionieren wir große Fensterelemente millimetergenau." },
        { "@type": "HowToStep", position: 4, name: "Anlieferung", text: "Die maßgefertigten HÖNING-Fensterelemente werden sicher auf Spezialgestellen angeliefert." },
        { "@type": "HowToStep", position: 5, name: "Präzisionsarbeit", text: "Der Saugkraft-Hebelift ermöglicht sichere und beschädigungsfreie Handhabung der Scheiben." },
        { "@type": "HowToStep", position: 6, name: "Montage", text: "Das Fensterelement wird passgenau eingesetzt und professionell verankert." },
        { "@type": "HowToStep", position: 7, name: "Finale Justierung", text: "Dichtigkeit, Öffnungswinkel und Beschläge werden präzise justiert." },
        { "@type": "HowToStep", position: 8, name: "Abschluss & Übergabe", text: "Das Ergebnis: Neue energieeffiziente Fensterfront, sauber übergeben." },
    ],
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
    email: "info@ergart.de",
    logo: `${BASE_URL}/bilder_ordner/AE_logo.svg`,
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
    aggregateRating: GOOGLE_AGGREGATE_RATING,
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

            {/* Structured Data: HowTo – Montageprozess */}
            <Script
                id="fensterservice-howto-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
            />

            {/* Page Sections */}
            <FensterserviceHero />

            {/* Erste Ruheflaeche nach dem Hero */}
            <Section id="kontakt-formular" surface="base" spacing="spacious" className="relative overflow-hidden">
                <FensterserviceKontakt />
            </Section>

            <Section surface="muted">
                <FensterserviceLeistungen />
            </Section>

            {/* Galerie: die Bilder sind der Fokus, ruhigster Grund, breiteste Spur */}
            <Section surface="base" width="wide">
                <FensterserviceBildergalerie />
            </Section>

            <Section surface="muted">
                <FensterservicePreisBewertungen />
            </Section>

            {/* HÖNING-Block: Rechner und Garantie gehoeren inhaltlich zusammen
                und teilen sich deshalb bewusst EINE Flaeche. Die Garantie ist
                ein Bauteil (Card), keine eigene Seitenflaeche. */}
            <Section surface="base">
                <HoeningEnergierechner />
                <div className="mt-16 md:mt-20">
                    <HoeningGarantieCard />
                </div>
            </Section>

            <Section surface="muted">
                <FensterserviceVorteile />
            </Section>

            <Section surface="base">
                <FensterserviceAblauf />
            </Section>

            {/* Montageprozess – 8 Schritte als visuelle Beweisführung nach dem Ablauf */}
            <Section surface="muted" aria-label="Unser Montageprozess – 8 Schritte">
                <ProcessStepper />
            </Section>

            {/* Passende Ratgeber-Artikel: interne Verlinkung Landingpage <-> Blog */}
            <Section surface="base">
                <BlogTeaser
                    eyebrow="Ratgeber Fenster"
                    title="Fenster-Wissen aus der Praxis"
                    description="Zugluft, schwergängige Flügel, poröse Dichtungen: So erkennen Sie Probleme früh – und wann sich der Profi lohnt."
                    topic="fenster"
                />
            </Section>

            {/* Lange Accordion-Flaeche: schmalere Spur, ruhigster Grund */}
            <Section surface="base" width="prose">
                <FensterserviceFAQ />
            </Section>

            <Section surface="muted" spacing="compact">
                <TrustAndPartnerSection />
            </Section>
            
            <StickyMobileCTA />
        </>
    );
}

