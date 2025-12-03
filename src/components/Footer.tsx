'use client';

// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";
import { trackCTAClick } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-zinc-900 text-foreground">
      {/* Haupt-Footer mit Blueprint-Thema, jetzt mit Theme-Farben */}
      <div className="bg-secondary text-secondary-foreground">
        <div
          className="container max-w-7xl mx-auto px-4 py-16"
          style={{
            // Das Grid-Muster bleibt erhalten, liegt aber über der Theme-Farbe
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px),
              repeating-linear-gradient(90deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px)
            `,
            backgroundSize: "30px 30px, 30px 30px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Image
                src="/bilder_ordner/logo/ergart-hausmeister-logo.webp"
                alt="Logo Alexander Ergart"
                width={180}
                height={138}
              />
              <p className="mt-6 text-sm text-muted-foreground max-w-xs">
                Ihr zuverlässiger Partner für professionelle Hausmeisterdienste,
                Reparaturen und Gebäudepflege in Neuss und Umgebung.
              </p>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/leistungen"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Leistungen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/referenzen"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Referenzen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ueber-uns"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Über Uns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontakt"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Informationen
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/impressum"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/datenschutz"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <a
                    href="https://ergart-immobilienverwaltung.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Partner: Ergart Immobilien
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hoening.de/unternehmen/ueber-uns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    Partner: Hoening Fenster & Türen
                  </a>
                </li>
              </ul>

              <h3 className="font-mono text-base font-bold mt-8 mb-4 text-foreground uppercase tracking-wider">
                Einsatzgebiet
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {LOCATIONS.slice(0, 5).map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/einsatzgebiet/${loc.slug}`}
                      className="hover:text-brand-blue transition-colors"
                    >
                      {loc.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/kontakt"
                    className="text-brand-blue font-medium hover:underline"
                  >
                    Alle Gebiete ansehen
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Direktkontakt
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-blue" />
                  <a
                    href="tel:+4917666825889"
                    onClick={() => trackCTAClick('phone', 'footer')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +49 176 668 25 889
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-blue" />
                  <a
                    href="mailto:aergart@gmail.com"
                    onClick={() => trackCTAClick('email', 'footer')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    aergart@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Die Credit-Leiste */}
      <div className="bg-muted text-muted-foreground py-4 border-t border-border/20">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Image
              src="/bilder_ordner/logo/smairys-logo.png"
              alt="Smairys Netz-Manufaktur Logo"
              width={32}
              height={32}
              className="dark:invert transition-transform duration-300 hover:scale-110"
            />
            <span>
              Smairys Netz-Manufaktur. Alle Rechte vorbehalten. &copy;{" "}
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="https://www.smairys-netz-manufaktur.de/"
              className="hover:text-foreground transition-colors"
            >
              Web-Design & Entwicklung: Smairys
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
