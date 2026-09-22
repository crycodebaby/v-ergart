// src/app/robots.ts
import type { MetadataRoute } from "next";

// Fallback OHNE Trailing Slash - sonst entsteht "...//sitemap.xml" (404),
// falls NEXT_PUBLIC_SITE_URL im Deployment fehlt. Der .replace() greift nur
// auf den Env-Wert, nicht auf den Fallback.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alexander-ergart.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
