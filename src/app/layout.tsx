// src/app/layout.tsx
/**
 * Root Layout
 *
 * Enthält das Weihnachts-Theme (steuerbar über Sanity siteSettings),
 * das Announcement-System, Header, Footer und alle globalen Provider.
 *
 * Reihenfolge der Elemente:
 * 1. Weihnachts-Effekte (Lichterkette, Gruß)
 * 2. Announcement TopBar
 * 3. Header
 * 4. Announcement Banner
 * 5. Main Content
 * 6. Footer
 */
import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import {
  AnnouncementTopBarProvider,
  AnnouncementBannerProvider,
} from "@/components/AnnouncementProvider";
import { ChristmasProvider, getChristmasMode } from "@/components/christmas";
import PlausibleProvider from "next-plausible";
import { GoogleTagManager } from '@next/third-parties/google';
import CookieBanner from "@/components/CookieBanner";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/**
 * Root Metadata - Template-System für konsistente Titel
 * 
 * WICHTIG: Keine globale description hier!
 * Jede Seite definiert ihre eigene description für optimales SEO.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://alexander-ergart.de'),
  title: {
    template: '%s | Alexander Ergart',
    default: 'Hausmeisterservice Neuss - Alexander Ergart'
  },
  // KEINE description hier - wird auf Seitenebene definiert!
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { color: "#ffffff" },
  ],
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Lade Weihnachtsmodus für data-Attribut (parallel zum Render)
  const christmasMode = await getChristmasMode();

  return (
    <PlausibleProvider
      domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "alexander-ergart.de"}
      trackOutboundLinks
      taggedEvents
    >
      <html
        lang="de"
        suppressHydrationWarning
        data-christmas={christmasMode}
      >
        <head>
          {/* Preconnect für Google Fonts - reduziert TTFB */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Google Consent Mode v2 Default State */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                // Set default consent to 'denied' before GTM loads
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'wait_for_update': 500
                });
                
                // Pass consent back to localStorage if already granted
                if(localStorage.getItem('cookie_consent') === 'granted') {
                  gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                  });
                }
              `,
            }}
          />
        </head>
        {/* Sticky-Footer-Setup: body als Flex-Spalte, volle Viewport-Höhe */}
        <body
          className={[
            roboto.variable,
            robotoMono.variable,
            "font-sans",
            "antialiased",
            "bg-background text-foreground",
            "min-h-screen min-h-dvh",
            "flex flex-col",
            "relative",
          ].join(" ")}
        >
          {/* Skip-Link für A11y */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-brand-blue px-3 py-2 text-white"
          >
            Zum Inhalt springen
          </a>

          <Providers>
            {/* Weihnachts-Effekte (Lichterkette, Gruß) - ganz oben */}
            <ChristmasProvider />

            {/* Schmale Mitteilungs-Leiste (vor Header) */}
            <AnnouncementTopBarProvider />

            <Header />

            {/* Großes Mitteilungs-Banner (nach Header) */}
            <AnnouncementBannerProvider />

            {/* WICHTIG: flex-1 damit der Content die Lücke füllt -> Footer bleibt unten */}
            <main id="main" role="main" className="flex-1">
              {children}
            </main>

            <Footer />
          </Providers>

          {/* UI-Utility kann außerhalb von main bleiben */}
          <ScrollToTopButton />
          
          {/* Google Tag Manager - Requires valid consent mode UI */}
          <GoogleTagManager gtmId="GTM-NXD3FFQL" />
          
          {/* Global Cookie Banner for DSGVO/Consent Mode Updates */}
          <CookieBanner />
        </body>
      </html>
    </PlausibleProvider>
  );
}
