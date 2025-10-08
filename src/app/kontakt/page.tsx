// src/app/kontakt/page.tsx
import KontaktHero from "@/components/KontaktHero";
import ContactForm from "@/components/ContactForm";
import CalendlyButton from "@/components/CalendlyButton";
import { ShieldCheck, Clock, MapPin, Phone, Mail, Star } from "lucide-react";
import CTA from "@/components/CTA";
import MapSection from "@/components/MapSection"; // falls vorhanden, sonst entfernen

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
              <h3 className="text-lg font-bold mb-3">Öffnungszeiten</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>Mo–Fr: 07:00 – 17:00 Uhr</li>
                <li>Sa: nach Vereinbarung</li>
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
