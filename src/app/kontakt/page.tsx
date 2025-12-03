import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title:
    "Kontakt – Alexander Ergart | Hausmeister- & Fensterservice in Neuss & Umgebung",
  description:
    "Schnellanfrage an Alexander Ergart: Hausmeisterservice, Fensterservice, Reparaturen & Wartung, Grundstückspflege u. v. m. Öffnungszeiten Mo–Fr 08–12 & 13–16 Uhr. Jetzt Termin sichern.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title:
      "Kontakt – Alexander Ergart | Hausmeister- & Fensterservice in Neuss",
    description:
      "Schnellanfrage, Terminwahl, Telefon & E-Mail. Leistungen: Hausmeisterservice, Fensterservice, Reparaturen & Wartung, Grundstückspflege, Verwaltung von Immobilien.",
    type: "website",
    url: "/kontakt",
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
      <KontaktHero />

      <section className="bg-background">
        <div className="container mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-3 gap-10">
          {/* Formular */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border p-6 md:p-8 bg-card shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                Schnellanfrage
              </h2>
              <p className="text-muted-foreground mb-6">
                Kurz beschreiben, worum es geht – wir melden uns
                schnellstmöglich zurück.
              </p>
              <ContactForm />
              <div className="mt-6 flex flex-wrap gap-3">
                <CalendlyButton variant="outline" />
                <a
                  href="tel:+4917666825889"
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Phone size={18} /> Anrufen
                </a>
                <a
                  href="mailto:aergart@gmail.com"
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Mail size={18} /> E-Mail
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar: Trust & Soforthilfe */}
          <aside className="space-y-6 h-fit">
            <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
              <h3 className="text-lg font-bold mb-4">Darum Ergart</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-brand-blue mt-0.5" size={18} />
                  <span>
                    <strong>Verbindlich & ehrlich:</strong> Feste Zusagen, klare
                    Angebote.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-brand-blue mt-0.5" size={18} />
                  <span>
                    <strong>Schnelle Hilfe:</strong> Reaktionszeit i. d. R. &lt;
                    24h.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-blue mt-0.5" size={18} />
                  <span>
                    <strong>Neuss & Umgebung:</strong> regional & zuverlässig.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-blue mt-0.5" size={18} />
                  <span>
                    <strong>Saubere Arbeit:</strong> Wertarbeit, auf die man
                    stolz sein kann.
                  </span>
                </li>
              </ul>

              <div className="mt-6">
                <CalendlyButton
                  label="Termin sofort wählen"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Alternativ:{" "}
                  <a href="tel:+4917666825889" className="underline">
                    anrufen
                  </a>{" "}
                  oder{" "}
                  <a href="mailto:aergart@gmail.com" className="underline">
                    E-Mail
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
              <h3 className="text-lg font-bold mb-4">Öffnungszeiten</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                {/* Wochentage mit Flexbox für saubere Ausrichtung */}
                <li className="flex justify-between items-baseline">
                  <span>Mo – Fr</span>
                  <div className="text-right font-medium text-foreground">
                    <p>08:00 – 12:00 Uhr</p>
                    <p>13:00 – 16:00 Uhr</p>
                  </div>
                </li>
                {/* Trennlinie für visuelle Klarheit */}
                <li className="border-b border-border/50 !my-3"></li>
                {/* Wochenende */}
                <li className="flex justify-between items-center">
                  <span>Samstag</span>
                  <span className="font-medium text-foreground">
                    Geschlossen
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Sonntag</span>
                  <span className="font-medium text-foreground">
                    Geschlossen
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
              <h3 className="text-lg font-bold mb-3">Direktkontakt</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="tel:+4917666825889"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <Phone size={16} /> +49 176 668 25 889
                </a>
                <a
                  href="mailto:aergart@gmail.com"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <Mail size={16} /> aergart@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Karte / Servicegebiet – falls du das Modul nutzt */}
      <MapSection />

      {/* Finaler Catch-All-CTA */}
      <CTA />
    </>
  );
}
