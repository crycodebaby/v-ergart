/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Moderne Formate für bessere Kompression
    formats: ['image/avif', 'image/webp'],

    // Device-Breakpoints passend zu Tailwind Screens
    deviceSizes: [475, 640, 768, 1024, 1100, 1280, 1536, 1920, 2048],

    // Kleinere Größen für Icons/Thumbnails
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Remote-Quellen
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    minimumCacheTTL: 31536000,
  },

  /**
   * Server-side Redirects
   * 
   * Legacy HTML URLs + Karriereportal (301 Permanent)
   * - Redirects aus dem alten Static-Setup (HTML) zu Next.js Routes
   * - Verhindert 404-Fehler in Google Search Console
   * - Überträgt SEO-Equity durch 301 Permanent Redirects
   * 
   * /flyer: Offline-Kampagnen-Tracking Redirect (307 Temporary)
   * - Ersetzt clientseitige React-Weiterleitung durch sauberen HTTP 307
   * - Google sieht dadurch keinen "Page with redirect" Fehler mehr
   * - Tracking-Parameter bleiben erhalten
   */
  async redirects() {
    return [
      // Legacy HTML URLs → Next.js Routes (301 Permanent)
      {
        source: '/index.html',
        destination: '/',
        permanent: true, // 301 Permanent Redirect
      },
      {
        source: '/impressum.html',
        destination: '/impressum',
        permanent: true,
      },
      {
        source: '/leistungen.html',
        destination: '/leistungen',
        permanent: true,
      },
      {
        source: '/ueber-uns.html',
        destination: '/ueber-uns',
        permanent: true,
      },
      {
        source: '/fenster.html',
        destination: '/fenster',
        permanent: true,
      },

      // Legacy Karriereportal → /karriere (301 Permanent)
      {
        source: '/karriereportal/karriere.php',
        destination: '/karriere',
        permanent: true,
      },
      {
        source: '/karriereportal/karriere',
        destination: '/karriere',
        permanent: true,
      },
      {
        source: '/karriereportal/karriere/',
        destination: '/karriere',
        permanent: true,
      },

      // Offline-Kampagnen-Tracking (307 Temporary)
      {
        source: '/flyer',
        destination: '/?utm_source=flyer&utm_medium=offline&utm_campaign=FirstTriFoldFlyer',
        permanent: false, // 307 Temporary Redirect (Kampagne könnte sich ändern)
      },

      // QR-Codes Firmenfahrzeug 1 (307 Temporary, Ziel bleibt ohne Neudruck änderbar)
      // Kurzlinks sind auf dem Fahrzeug aufgedruckt und müssen stabil bleiben.
      {
        source: '/q/f1-links',
        destination: '/?utm_source=firmenfahrzeug&utm_medium=qr&utm_campaign=firmenfahrzeug-01&utm_content=fahrerseite',
        permanent: false,
      },
      {
        source: '/q/f1-rechts',
        destination: '/?utm_source=firmenfahrzeug&utm_medium=qr&utm_campaign=firmenfahrzeug-01&utm_content=beifahrerseite',
        permanent: false,
      },
      {
        source: '/q/f1-heck',
        destination: '/?utm_source=firmenfahrzeug&utm_medium=qr&utm_campaign=firmenfahrzeug-01&utm_content=heck',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
