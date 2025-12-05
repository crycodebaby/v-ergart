import { client } from "./sanity-client";
import groq from "groq";

export type Announcement = {
  _id: string;
  title?: string;
  message: string;
  cta?: {
    text: string;
    url: string;
  };
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  type: "info" | "warning" | "success" | "promo";
  priority: number;
  targetPages: "all" | "home" | "blog" | "karriere";
};

const ACTIVE_ANNOUNCEMENTS_QUERY = groq`
*[
  _type == "announcement" 
  && isActive == true
  && (
    !defined(startDate) || startDate <= now()
  )
  && (
    !defined(endDate) || endDate >= now()
  )
] | order(priority desc) {
  _id,
  title,
  message,
  cta,
  type,
  priority,
  targetPages
}
`;

// Tag für ISR Revalidation
export const ANNOUNCEMENTS_TAG = "announcements";

export async function fetchActiveAnnouncements(): Promise<Announcement[]> {
  try {
    return await client.fetch(
      ACTIVE_ANNOUNCEMENTS_QUERY,
      {},
      { 
        next: { 
          revalidate: 60, // Cache für 60 Sekunden
          tags: [ANNOUNCEMENTS_TAG] 
        } 
      }
    );
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    return []; // Fail gracefully
  }
}
