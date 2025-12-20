/**
 * SEO Utilities
 *
 * Zentrale Hilfsfunktionen für SEO, Metadata und Open Graph.
 * Stellt konsistente Defaults und Generatoren für alle Seiten bereit.
 */
import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alexander-ergart.de";

export const SITE_NAME = "Alexander Ergart Hausmeister- & Fensterservice";

/**
 * Standard Open Graph Bild für Social Sharing
 */
export const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/bilder_ordner/office-ergart.webp`,
  width: 1200,
  height: 630,
  alt: "Alexander Ergart Hausmeisterservice Neuss",
};

/**
 * Generiert Standard-Metadata mit konsistenten OG-Tags
 */
export function generateSEOMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const ogImage = image
    ? { url: image.url, width: 1200, height: 630, alt: image.alt }
    : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      locale: "de_DE",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

/**
 * Generiert absolute URL für Canonicals und OG
 */
export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
