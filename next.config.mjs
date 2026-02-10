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
   * /flyer: Offline-Kampagnen-Tracking Redirect
   * - Ersetzt clientseitige React-Weiterleitung durch sauberen HTTP 307
   * - Google sieht dadurch keinen "Page with redirect" Fehler mehr
   * - Tracking-Parameter bleiben erhalten
   */
  async redirects() {
    return [
      {
        source: '/flyer',
        destination: '/?utm_source=flyer&utm_medium=offline&utm_campaign=FirstTriFoldFlyer',
        permanent: false, // 307 Temporary Redirect (Kampagne könnte sich ändern)
      },
    ];
  },
};

export default nextConfig;
