// src/app/fensterservice/page.tsx
/**
 * /fensterservice – primäre SERVICE-Seite für bestehende Fenster.
 *
 * Rollenverteilung seit Batch 2 (Intent-Trennung Fenster):
 *   /fensterservice Mein vorhandenes Fenster klemmt, zieht, ist defekt.
 *   /fenster        Ich will neue Fenster kaufen / meine alten austauschen.
 *
 * Was sich in Batch 2 geändert hat und warum:
 *  - Title/Description/H1/Hero/Leistungen/Formular sprechen jetzt durchgängig
 *    vom Instandsetzen, nicht vom Kaufen.
 *  - Der 8-Schritte-Montageprozess (ProcessStepper) ist von hier nach
 *    /fenster gewandert. Er beschreibt den Einbau NEUER Elemente inkl.
 *    Kranlogistik – auf der Reparaturseite war er das stärkste
 *    Verkaufssignal und damit der Hauptgrund für die Überschneidung.
 *    Das zugehörige HowTo-JSON-LD ist deshalb hier ebenfalls entfallen.
 *  - Die Preisvorschau für ein neues PVC-Fensterelement (400–600 €, reiner
 *    Elementpreis ohne Montage) steht jetzt auf /fenster. Hier bleiben die
 *    Google-Bewertungen, aber ohne Kaufpreis – für Reparaturen existiert
 *    keine belastbare Preisspanne.
 *  - Die FAQ wurde geteilt (siehe lib/fenster-faq-data.ts).
 *
 * Tracking-Hinweise (unverändert, kein neues Tracking in diesem Batch):
 *  - Telefon-Button: data-track="call-fensterservice"
 *  - Formular: data-track="form-submit-fensterservice"
 *  - CTAs: data-track="cta-fensterservice"
 */

import { generateSEOMetadata, BASE_URL, SITE_NAME } from "@/lib/seo-utils";
import { Section } from "@/components/ui/section";
import FensterserviceHero from "@/components/FensterserviceHero";
import FensterserviceLeistungen from "@/components/FensterserviceLeistungen";
import FensterserviceBildergalerie from "@/components/FensterserviceBildergalerie";
import FensterserviceVorteile from "@/components/FensterserviceVorteile";
import FensterserviceAblauf from "@/components/FensterserviceAblauf";
import FensterserviceKontakt from "@/components/FensterserviceKontakt";
import FaqAccordion from "@/components/FaqAccordion";
import PreisUndBewertungen from "@/components/PreisUndBewertungen";
import TrustAndPartnerSection from "@/components/TrustAndPartnerSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import { GOOGLE_AGGREGATE_RATING } from "@/lib/reviews";
import { FENSTER_SERVICE_FAQS, buildFaqJsonLd } from "@/lib/fenster-faq-data";
import BlogTeaser from "@/components/BlogTeaser";

export const metadata = generateSEOMetadata({
    title: "Fenster reparieren & warten in Neuss | Alexander Ergart",
    description:
        "Fensterservice in Neuss & Umgebung: Fenster reparieren, einstellen und warten, Dichtungen und Beschläge erneuern. Schnelle Termine vom Handwerksbetrieb aus Neuss. ☎ 0176 668 25 889",
    path: "/fensterservice",
    image: {
        url: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
        alt: "Fensterservice in Neuss – Reparatur und Wartung bestehender Fenster",
    },
});

/** FAQ-Schema aus genau der Liste, die unten auch sichtbar gerendert wird. */
const faqJsonLd = buildFaqJsonLd(FENSTER_SERVICE_FAQS);

/**
 * LocalBusiness + angebotene Leistungen.
 *
 * `makesOffer` listete bis Batch 2 "Fenstermontage" und "Fensteraustausch"
 * an erster Stelle – also Verkaufsleistungen auf der Serviceseite. Die
 * Liste spiegelt jetzt den sichtbaren Inhalt: Reparatur, Einstellung,
 * Wartung, Dichtungen, Sicherheitsnachrüstung. Der Verkaufs-Intent ist im
 * Schema auf /fenster beschrieben.
 */
const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE_URL}/fensterservice#organization`,
    name: SITE_NAME,
    alternateName: "Ergart Fensterservice",
    description:
        "Fensterservice in Neuss und Umgebung: Fenster reparieren, einstellen und warten, Dichtungen und Beschläge erneuern, Sicherheit nachrüsten.",
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
                name: "Fensterreparatur",
                description:
                    "Reparatur bei klemmenden Flügeln, defekten Beschlägen und Funktionsstörungen",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Fenster einstellen",
                description:
                    "Nachjustieren abgesackter Flügel und Neueinstellung des Anpressdrucks",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Fensterwartung",
                description:
                    "Jährlicher Funktionscheck: Beschläge prüfen und fetten, Dichtungen kontrollieren",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Dichtungserneuerung",
                description:
                    "Erneuerung poröser Fensterdichtungen zur Vermeidung von Zugluft",
            },
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Sicherheitsnachrüstung",
                description:
                    "Nachrüstung von Sicherheitsbeschlägen an vorhandenen Fenstern",
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
            {/* Structured Data bewusst als normales <script>, NICHT via
                next/script. Befund Batch 2 am gerendertem Output: <Script>
                rendert mit der Default-Strategie "afterInteractive"
                clientseitig – im ausgelieferten HTML stand kein einziges
                <script type="application/ld+json">, die Daten lagen nur in
                der RSC-Payload. Ein einfaches <script>-Element wird
                server-seitig mitgerendert. */}
            {/* Structured Data: LocalBusiness */}
            <script
                id="fensterservice-local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />

            {/* Structured Data: FAQPage */}
            <script
                id="fensterservice-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                <FensterserviceVorteile />
            </Section>

            <Section surface="base">
                <FensterserviceAblauf />
            </Section>

            {/* Bewertungen – ohne Kaufpreis, der gehoert auf /fenster */}
            <Section surface="muted">
                <PreisUndBewertungen
                    title="Was unsere Kunden sagen"
                    description="Kunden aus Neuss und Umgebung, die uns auf Google bewerten. Den Preis Ihrer Reparatur nennen wir, nachdem wir das Fenster gesehen haben."
                    ctaHref="#kontakt-formular"
                    ctaLabel="Reparatur-Termin anfragen"
                />
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
                <FaqAccordion
                    items={FENSTER_SERVICE_FAQS}
                    eyebrow="Häufige Fragen"
                    title="FAQ zu Fensterreparatur & Wartung"
                    description="Antworten auf die Fragen, die uns am Telefon am häufigsten gestellt werden."
                />
            </Section>

            <Section surface="muted" spacing="compact">
                <TrustAndPartnerSection />
            </Section>

            <StickyMobileCTA />
        </>
    );
}
