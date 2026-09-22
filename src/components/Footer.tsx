'use client';

// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";
import { trackCTAClick } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      {/* Haupt-Footer mit Blueprint-Thema */}
      <div className="bg-secondary text-secondary-foreground">
        <div
          className="container max-w-7xl mx-auto px-4 py-16"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px),
              repeating-linear-gradient(90deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px)
            `,
            backgroundSize: "30px 30px, 30px 30px",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* ─── Gruppe 1: Brand + Social ───────────────────────────── */}
            <div className="sm:col-span-2 lg:col-span-4">
              <Image
                src="/bilder_ordner/AE_logo.svg"
                alt="Logo Alexander Ergart"
                width={135}
                height={100}
                className="w-24 md:w-32 h-auto"
                unoptimized
              />
              <p className="mt-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
                Ihr zuverlässiger Partner für professionelle Hausmeisterdienste,
                Reparaturen und Gebäudepflege in Neuss und Umgebung.
              </p>

              {/* Social Media */}
              <p className="mt-8 mb-3 text-sm font-semibold text-foreground">
                Folgen Sie uns
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61588187158143"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ergart's Fensterservice auf Facebook"
                  onClick={() => trackCTAClick('facebook', 'footer')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
                >
                  <Image
                    src="/bilder_ordner/icons/facebook.svg"
                    alt="Facebook"
                    width={22}
                    height={22}
                    className="h-5 w-5"
                    unoptimized
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@alexanderergart"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Alexander Ergart auf TikTok"
                  onClick={() => trackCTAClick('tiktok', 'footer')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
                >
                  <Image
                    src="/bilder_ordner/icons/tiktok.webp"
                    alt="TikTok"
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain dark:invert"
                    unoptimized
                  />
                </a>
              </div>
            </div>

            {/* ─── Gruppe 2: Entdecken + Partner ──────────────────────── */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Entdecken
              </h3>
              <ul className="space-y-3">
                {/* Batch 2: Die beiden Fenster-Intents stehen hier bewusst
                    getrennt und mit sprechendem Anchor – der Footer ist auf
                    jeder Seite die letzte Orientierungshilfe. */}
                <li>
                  <Link
                    href="/fenster"
                    className="text-brand-text font-bold hover:underline transition-colors uppercase tracking-wide text-sm"
                    aria-label="Neue Fenster und Fensteraustausch"
                  >
                    Neue Fenster
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fensterservice"
                    className="text-brand-text font-bold hover:underline transition-colors uppercase tracking-wide text-sm"
                    aria-label="Fensterservice: Reparatur und Wartung"
                  >
                    Fensterservice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-brand-text transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>

              <h3 className="font-mono text-base font-bold mt-8 mb-4 text-foreground uppercase tracking-wider">
                Partner
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://ergart-immobilienverwaltung.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand-text transition-colors"
                  >
                    Ergart Immobilien
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hoening.de/unternehmen/ueber-uns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand-text transition-colors"
                  >
                    HÖNING Fenster &amp; Türen
                  </a>
                </li>
              </ul>
            </div>

            {/* ─── Gruppe 3: Einsatzgebiet (Local SEO) ────────────────── */}
            <div className="lg:col-span-2">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Einsatzgebiet
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {LOCATIONS.slice(0, 5).map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/einsatzgebiet/${loc.slug}`}
                      className="hover:text-brand-text transition-colors"
                    >
                      {loc.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/kontakt"
                    className="text-brand-text font-medium hover:underline"
                  >
                    Alle Gebiete ansehen
                  </Link>
                </li>
              </ul>
            </div>

            {/* ─── Gruppe 4: Direktkontakt (NAP) ──────────────────────── */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-base font-bold mb-4 text-foreground uppercase tracking-wider">
                Direktkontakt
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-blue shrink-0" />
                  <a
                    href="tel:+4917666825889"
                    onClick={() => trackCTAClick('phone', 'footer')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +49 176 668 25 889
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-blue shrink-0" />
                  <a
                    href="mailto:info@ergart.de"
                    onClick={() => trackCTAClick('email', 'footer')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@ergart.de
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Further+Str.+89B+41462+Neuss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <address className="not-italic leading-snug">
                      Further Str. 89B
                      <br />
                      41462 Neuss
                    </address>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Credit-/Rechtliches-Leiste */}
      <div className="bg-muted text-muted-foreground py-4 border-t border-border/20 safe-bottom">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs">
          {/* Links: Credit */}
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

          {/* Rechts: Rechtliches + Credit-Link */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/impressum"
              className="hover:text-foreground transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-foreground transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="https://www.smairys-netz-manufaktur.de/"
              className="hover:text-foreground transition-colors"
            >
              Web-Design &amp; Entwicklung: Smairys
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
