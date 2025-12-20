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
};

export default nextConfig;
