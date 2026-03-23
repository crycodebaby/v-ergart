// src/lib/sanity-loader.ts
"use client";

import { ImageLoaderProps } from "next/image";

/**
 * Custom Loader für Sanity Bilder in Next.js.
 * Nimmt die von `src/lib/sanity-image.ts` generierte Basis-URL (ohne feste Breiten)
 * und hängt die von Next.js (bzw. dem Browser) geforderten responsiven Breiten an.
 * 
 * - Vercel Image Optimization wird dadurch komplett umgangen.
 * - Sanity Edge CDN übernimmt die Skalierung on-the-fly (`?w=...`).
 * - Vermeidet Upscaling durch `fit=max`.
 * - Auto-Format liefert Next-Gen Formate (WebP/AVIF) via Sanity.
 */
export default function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());
  
  if (quality) {
    url.searchParams.set("q", quality.toString());
  } else {
    // Default quality, wenn im Image-Tag nichts angegeben ist
    url.searchParams.set("q", "75");
  }

  return url.href;
}
