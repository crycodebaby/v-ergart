/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Moderne Formate für bessere Kompression
    formats: ['image/avif', 'image/webp'],

    // Device-Breakpoints passend zu Tailwind
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

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
    ];
  },
};

export default nextConfig;
