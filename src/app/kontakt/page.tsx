// src/app/kontakt/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import KontaktHero from "@/components/KontaktHero";
import ContactForm from "@/components/ContactForm";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import { ShieldCheck, Clock, MapPin, Phone, Mail, Star } from "lucide-react";
import CTA from "@/components/CTA";
import MapSection from "@/components/MapSection";
import { LOCATIONS } from "@/lib/locations";
import { BASE_URL } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title:
    "Kontakt – Alexander Ergart | Hausmeister- & Fensterservice in Neuss & Umgebung",
  description:
    "Schnellanfrage an Alexander Ergart: Hausmeisterservice, Fensterservice, Reparaturen & Wartung, Grundstückspflege u. v. m. Öffnungszeiten Mo–Fr 08–12 & 13–16 Uhr. Jetzt Termin sichern.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${BASE_URL}/kontakt` },
  openGraph: {
    title:
      "Kontakt – Alexander Ergart | Hausmeister- & Fensterservice in Neuss",
    description:
      "Schnellanfrage, Terminwahl, Telefon & E-Mail. Leistungen: Hausmeisterservice, Fensterservice, Reparaturen & Wartung, Grundstückspflege, Verwaltung von Immobilien.",
    type: "website",
    url: `${BASE_URL}/kontakt`,
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Alexander Ergart Hausmeister- & Fensterservice",
  areaServed: [
    "Neuss",
    "Rhein-Kreis Neuss",
    "Düsseldorf",
    "Kaarst",
    "Dormagen",
    ...LOCATIONS.map((loc) => loc.name),
  ],
  url: "https://alexander-ergart.de/kontakt", // ggf. anpassen
  email: "mailto:aergart@gmail.com",
  telephone: "+49 176 668 25 889",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Neuss",
    addressCountry: "DE",
  },
  sameAs: [],
  makesOffer: [
    "Hausmeisterservice",
    "Fensterservice / Glasreinigung",
    "Reparaturen & Wartung",
    "Grundstückspflege",
    "Verwaltung von Mietimmobilien",
    "Verwaltung von Eigentumswohnungen",
    "Verwaltung von Apartmentkomplexen",
    "Hotelmanagement (technischer Service)",
    "Verwaltung gewerblicher Immobilien",
    "Verwaltung von Immobilienanlagen",
    "Verwaltung von Immobilien auf Inseln",
    "Eigenheimverwaltung",
    "Hausverwaltung für Ferienunterkünfte",
    "Immobilienmanagement",
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
};

export default function KontaktPage() {
  return (
    <>
      <div className="relative isolate bg-background overflow-hidden min-h-screen">
        {/* LIGHT MODE ONLY: Slate overlay to darken the white background */}
        <div className="absolute inset-0 -z-30 bg-slate-100 dark:hidden"></div>
        {/* LIGHT MODE BACKGROUND: Strong Checkered Pattern + Geometric Shapes */}
        <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden"></div>

        {/* Geometric Squares scattered for Light Mode */}
        <div className="absolute top-20 left-20 -z-20 w-32 h-32 bg-blue-200/30 rounded-lg rotate-12 dark:hidden"></div>
        <div className="absolute top-40 right-40 -z-20 w-24 h-24 bg-slate-300/40 rounded-lg -rotate-6 dark:hidden"></div>
        <div className="absolute bottom-40 left-1/4 -z-20 w-28 h-28 bg-blue-100/30 rounded-lg rotate-45 dark:hidden"></div>
        <div className="absolute bottom-60 right-1/3 -z-20 w-20 h-20 bg-slate-400/20 rounded-lg -rotate-12 dark:hidden"></div>

        {/* Larger Gradient Areas for Light Mode */}
        <div className="absolute top-0 right-0 -z-20 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-3xl dark:hidden pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-20 w-[1000px] h-[1000px] bg-gradient-to-tr from-slate-300/40 to-transparent rounded-full blur-3xl dark:hidden pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        {/* DARK MODE BACKGROUND: Existing Geometric Pattern + Radial Gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 hidden dark:block">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-blue to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Hero Section Simplified */}
        <KontaktHero />

        <div className="container mx-auto px-4 pb-24 lg:pb-32">
          {/* Main Grid: Symmetrical Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Information & Trust */}
            <div className="space-y-10">

              {/* Trust Section */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Star className="text-brand-blue" />
                  Darum Ergart
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <strong className="block text-foreground">Verbindlich & ehrlich</strong>
                      <span className="text-muted-foreground text-sm">Feste Zusagen, keine versteckten Kosten.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                      <Clock size={20} />
                    </div>
                    <div>
                      <strong className="block text-foreground">Schnelle Reaktion</strong>
                      <span className="text-muted-foreground text-sm">Antwort i. d. R. innerhalb von 24h.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong className="block text-foreground">Aus der Region</strong>
                      <span className="text-muted-foreground text-sm">Schnell vor Ort in Neuss & Umgebung.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Opening Hours & Direct Contact */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    Öffnungszeiten
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Mo – Fr</span>
                      <span className="font-medium">08:00 – 16:00</span>
                    </li>
                    <li className="flex justify-between border-t border-border/50 pt-2">
                      <span className="text-muted-foreground">Mittagspause</span>
                      <span className="font-medium">12:00 – 13:00</span>
                    </li>
                    <li className="flex justify-between text-muted-foreground pt-2">
                      <span>Sa / So</span>
                      <span>Geschlossen</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-center gap-4">
                  <a href="tel:+4917666825889" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                    <div className="p-2 rounded-full bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Telefon</span>
                      <span className="font-medium">0176 668 25 889</span>
                    </div>
                  </a>

                  <a href="mailto:aergart@gmail.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                    <div className="p-2 rounded-full bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">E-Mail</span>
                      <span className="font-medium">aergart@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: The Form */}
            <div className="relative">
              {/* Depth Decor behind Form */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-blue-400/20 blur-3xl -z-10 rounded-full opacity-50 transform translate-y-10"></div>

              <div className="bg-card/80 backdrop-blur-md border border-border/60 rounded-3xl p-1 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                <div className="bg-background/50 rounded-[1.4rem] p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Kontakt aufnehmen</h2>
                    <p className="text-muted-foreground">
                      Schreiben Sie uns Ihr Anliegen. Wir prüfen es und melden uns mit einer Ersteinschätzung oder einem Terminvorschlag.
                    </p>
                  </div>

                  <ContactForm
                    customServices={[
                      "Immobilienverwaltung (allgemein)",
                      "Fensterservice",
                      "Haustürelemente",
                      "Objektreinigung",
                      "Grundstückspflege",
                      "Hausmeisterservice"
                    ]}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* Map Section stays full width */}
      <MapSection />
    </>
  );
}
