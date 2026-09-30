'use client';

// src/components/Footer.tsx
/**
 * Footer – auf jeder Seite die letzte Orientierungshilfe.
 *
 * Die Sitemap-Spalten kommen aus src/lib/navigation.ts, damit Header und
 * Footer nie auseinanderlaufen. Vorher fehlten hier Leistungen, Referenzen,
 * Über uns, Karriere und Kontakt komplett.
 *
 * Spalten (ab lg, 12er-Raster):
 *   4  Marke, Social (Facebook, TikTok, WhatsApp)
 *   2  Leistungen (Überschrift verlinkt auf die Übersicht)
 *   2  Fenster & Türen + Unternehmen
 *   2  Partner
 *   2  Direktkontakt (NAP + Öffnungszeiten)
 */
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { NAV_ITEMS, NAV_SECONDARY, type NavGroup } from "@/lib/navigation";
import { CONTACT, PARTNER_LINK_REL, SITE_LINKS, withPartnerUtm } from "@/lib/site-links";

const leistungen = NAV_ITEMS.find(
  (i): i is NavGroup => i.kind === "group" && i.href === "/leistungen"
);
const fensterTueren = NAV_ITEMS.find(
  (i): i is NavGroup => i.kind === "group" && i.href === "/fenster-tueren"
);
const unternehmen = [
  ...NAV_ITEMS.filter((i) => i.kind === "link"),
  ...NAV_SECONDARY,
];

/**
 * Social- und Messenger-Kanäle. WhatsApp zeigt auf denselben Business-Chat
 * wie Header und Kontaktseite (SITE_LINKS), nicht auf eine eigene Nummer.
 */
const SOCIAL_LINKS = [
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=61588187158143",
    label: "Ergart's Fensterservice auf Facebook",
    icon: "/bilder_ordner/icons/facebook.svg",
    alt: "Facebook",
    iconClassName: "h-5 w-5",
  },
  {
    key: "tiktok",
    href: "https://www.tiktok.com/@alexanderergart",
    label: "Alexander Ergart auf TikTok",
    icon: "/bilder_ordner/icons/tiktok.webp",
    alt: "TikTok",
    iconClassName: "h-5 w-5 object-contain dark:invert",
  },
  {
    key: "whatsapp",
    href: SITE_LINKS.external.whatsappChat,
    label: "Alexander Ergart per WhatsApp Business schreiben",
    icon: "/bilder_ordner/icons/whatsapp.svg",
    alt: "WhatsApp",
    iconClassName: "h-5 w-5 rounded-[22%]",
  },
] as const;

const PARTNER_LINKS = [
  { href: SITE_LINKS.external.immobilienverwaltung, label: "Ergart Immobilienverwaltung" },
  { href: SITE_LINKS.external.hoeningCompany, label: "HÖNING Fenster & Türen" },
  { href: SITE_LINKS.external.smairys, label: "Smairys Netz-Manufaktur" },
] as const;

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      {/* Haupt-Footer mit Blueprint-Thema */}
      <div className="bg-secondary text-secondary-foreground">
        <div
          className="container mx-auto max-w-7xl px-4 py-16"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px),
              repeating-linear-gradient(90deg, transparent, transparent 29px, hsla(208, 25%, 84%, 0.05) 30px)
            `,
            backgroundSize: "30px 30px, 30px 30px",
          }}
        >
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ─── Marke + Social ─────────────────────────────────────── */}
            <div className="col-span-2 lg:col-span-4">
              <Image
                src="/bilder_ordner/AE_logo.svg"
                alt="Logo Alexander Ergart"
                width={135}
                height={100}
                className="h-auto w-24 md:w-32"
                unoptimized
              />
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Ihr zuverlässiger Partner für Hausmeisterdienste, Fenster &amp; Türen,
                Reparaturen und Gebäudepflege in Neuss und Umgebung.
              </p>

              <p className="mb-3 mt-8 text-sm font-semibold text-foreground">Folgen Sie uns</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={() => trackCTAClick(social.key, 'footer')}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 transition-colors hover:border-brand-blue hover:bg-brand-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                  >
                    <Image
                      src={social.icon}
                      alt={social.alt}
                      width={22}
                      height={22}
                      className={social.iconClassName}
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ─── Leistungen ─────────────────────────────────────────── */}
            {leistungen && (
              <nav aria-label="Leistungen" className="lg:col-span-2">
                <FooterHeading href={leistungen.href}>{leistungen.label}</FooterHeading>
                <ul className="space-y-2">
                  {leistungen.children.map((child) => (
                    <li key={child.href}>
                      <FooterLink href={child.href}>{child.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* ─── Fenster & Türen + Unternehmen ──────────────────────── */}
            <div className="lg:col-span-2">
              {fensterTueren && (
                <nav aria-label="Fenster und Türen">
                  <FooterHeading>{fensterTueren.label}</FooterHeading>
                  <ul className="space-y-2">
                    {fensterTueren.children.map((child) => (
                      <li key={child.href}>
                        <FooterLink href={child.href}>{child.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <nav aria-label="Unternehmen">
                <FooterHeading className="mt-8">Unternehmen</FooterHeading>
                <ul className="space-y-2">
                  {unternehmen.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ─── Partner ───────────────────────────────────────────── */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <FooterHeading>Partner</FooterHeading>
              <ul className="space-y-2">
                {PARTNER_LINKS.map((partner) => (
                  <li key={partner.href}>
                    <FooterLink href={withPartnerUtm(partner.href, "footer-partner")} external>
                      {partner.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── Direktkontakt (NAP) ────────────────────────────────── */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <FooterHeading>Direktkontakt</FooterHeading>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-brand-blue" aria-hidden="true" />
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => trackCTAClick('phone', 'footer')}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-brand-blue" aria-hidden="true" />
                  <a
                    href={CONTACT.emailHref}
                    onClick={() => trackCTAClick('email', 'footer')}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  <a
                    href={CONTACT.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <address className="not-italic leading-snug">
                      {CONTACT.address.street}
                      <br />
                      {CONTACT.address.city}
                    </address>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  <span className="leading-snug text-muted-foreground">{CONTACT.hoursShort}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Credit-/Rechtliches-Leiste */}
      <div className="border-t border-border/20 bg-muted py-4 text-muted-foreground safe-bottom">
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/bilder_ordner/logo/smairys-logo.png"
              alt="Smairys Netz-Manufaktur Logo"
              width={32}
              height={32}
              className="transition-transform duration-300 hover:scale-110 dark:invert"
            />
            <span>
              Smairys Netz-Manufaktur. Alle Rechte vorbehalten. &copy;{" "}
              {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/impressum" className="transition-colors hover:text-foreground">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-foreground">
              Datenschutz
            </Link>
            {/* Steht auf jeder Seite und ist damit der staerkste der drei
                Wege zu Smairys — deshalb eigenes `utm_content`. Kein `rel`
                noetig: der Link oeffnet im selben Tab, es gibt also kein
                `window.opener`, und der Referrer geht ohnehin mit. */}
            <Link
              href={withPartnerUtm(SITE_LINKS.external.smairys, "footer-credit")}
              className="transition-colors hover:text-foreground"
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

/* ---------------------------------------------------------------------- */

function FooterHeading({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  /**
   * Macht die Überschrift selbst zum Link auf die Übersichtsseite der
   * Spalte. Sie bleibt optisch Überschrift; nur der Chevron und der
   * Hover-/Fokus-Zustand verraten das Ziel.
   */
  href?: string;
  className?: string;
}) {
  return (
    <h3
      className={`mb-4 font-mono text-base font-bold uppercase tracking-wider text-foreground ${className}`}
    >
      {href ? (
        <Link
          href={href}
          className="group -mx-1 inline-flex items-center gap-1 rounded-sm px-1 transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
        >
          {children}
          <ChevronRight
            className="h-4 w-4 text-brand-text transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : (
        children
      )}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  /**
   * Externe Ziele sind in dieser Fussleiste ausnahmslos Partnerseiten —
   * die Social-, Karten- und Kontaktlinks stehen als eigene `<a>` weiter
   * oben. Deshalb gilt hier `PARTNER_LINK_REL`, ohne zweiten Schalter.
   */
  external?: boolean;
}) {
  const className = "text-sm text-muted-foreground transition-colors hover:text-brand-text";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel={PARTNER_LINK_REL}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
