/**
 * SEO Utilities
 *
 * Zentrale Hilfsfunktionen für SEO, Metadata und Open Graph.
 * Stellt konsistente Defaults und Generatoren für alle Seiten bereit.
 * 
 * @usage
 * ```tsx
 * import { generateSEOMetadata } from "@/lib/seo-utils";
 * 
 * export const metadata = generateSEOMetadata({
 *   title: "Seiten-Titel",
 *   description: "Beschreibung...",
 *   path: "/leistungen",  // Relativer Pfad, wird zu absoluter URL
 * });
 * ```
 */
import type { Metadata } from "next";

/** Basis-URL für absolute URLs */
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alexander-ergart.de";

/** Site-Name für OG-Tags */
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
 * Generiert absolute URL aus relativem Pfad
 * 
 * @param path - Relativer Pfad, z.B. "/leistungen" oder "/blog/mein-artikel"
 * @returns Absolute URL wie "https://alexander-ergart.de/leistungen"
 */
export function absoluteUrl(path: string): string {
  // Falls bereits absolute URL, unverändert zurückgeben
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Prüft ob URL bereits absolut ist
 */
function isAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Generiert Standard-Metadata mit konsistenten OG-Tags und absoluten URLs
 * 
 * @param title - Seitentitel (wird auch für OG/Twitter verwendet)
 * @param description - Meta-Description (max. 160 Zeichen empfohlen)
 * @param path - RELATIVER Pfad zur Seite, z.B. "/leistungen" oder "/blog/artikel-slug"
 * @param image - Optionales Custom-Bild für OG/Twitter (url kann relativ oder absolut sein)
 * @param type - OG-Type: "website" (default) oder "article" für Blogposts
 * @param noIndex - Wenn true, wird die Seite nicht indexiert
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
  /** Relativer Pfad zur Seite, z.B. "/leistungen" */
  path: string;
  /** Custom OG-Image (url kann relativ oder absolut sein) */
  image?: { url: string; alt: string };
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  // Absolute URL für Canonical und OG
  const canonicalUrl = absoluteUrl(path);

  // OG-Image mit robuster URL-Behandlung
  const ogImageUrl = image
    ? isAbsoluteUrl(image.url)
      ? image.url
      : absoluteUrl(image.url)
    : DEFAULT_OG_IMAGE.url;

  const ogImage = {
    url: ogImageUrl,
    width: 1200,
    height: 630,
    alt: image?.alt ?? DEFAULT_OG_IMAGE.alt,
  };

  return {
    // `absolute`: das Root-Layout definiert `title.template` = "%s | Alexander
    // Ergart". Alle Seiten hier tragen den Markennamen bereits selbst im Titel
    // – ohne `absolute` haengt Next.js den Suffix ein zweites Mal an
    // ("... | Alexander Ergart | Alexander Ergart").
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
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
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Generiert Metadata für dynamische Seiten (z.B. Blog-Artikel)
 * Convenience-Wrapper für generateSEOMetadata mit type="article"
 */
export function generateArticleMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  return generateSEOMetadata({
    title,
    description,
    path,
    image,
    type: "article",
  });
}
