import { client, isSanityConfigured } from "./sanity-client";
import groq from "groq";

// TypeScript Types
export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  body?: any;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  author?: {
    name: string;
    slug: { current: string };
    image?: any;
    bio?: any;
    website?: string;
    linkedin?: string;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
    color?: string;
  }>;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  locationTags?: string[];
  isFeatured?: boolean;
};

export type BlogCategory = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
};

// GROQ Queries
const POSTS_LIST_QUERY = groq`
*[_type == "post" && isPublished == true] 
| order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    asset,
    crop,
    hotspot,
    alt
  },
  author->{
    name,
    slug,
    image,
    bio
  },
  categories[]->{
    title,
    slug,
    color
  },
  metaTitle,
  metaDescription,
  isFeatured
}
`;

const POST_BY_SLUG_QUERY = groq`
*[_type == "post" && slug.current == $slug && isPublished == true][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  mainImage {
    asset,
    crop,
    hotspot,
    alt
  },
  author->{
    name,
    slug,
    image,
    bio,
    website,
    linkedin
  },
  categories[]->{
    title,
    slug,
    color
  },
  metaTitle,
  metaDescription,
  focusKeywords,
  locationTags
}
`;

const FEATURED_POSTS_QUERY = groq`
*[_type == "post" && isPublished == true && isFeatured == true] 
| order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    asset,
    crop,
    hotspot,
    alt
  },
  categories[]->{
    title,
    slug,
    color
  }
}
`;

const CATEGORIES_QUERY = groq`
*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}
`;

const SLUGS_QUERY = groq`
*[_type == "post" && isPublished == true && defined(slug.current)] {
  "slug": slug.current
}
`;

// Cache Tags
export const BLOG_TAG = "blog";

// Fetch Functions
export async function fetchPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    POSTS_LIST_QUERY,
    {},
    { next: { revalidate: 60, tags: [BLOG_TAG] } }
  );
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60, tags: [BLOG_TAG] } }
  );
}

export async function fetchFeaturedPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    FEATURED_POSTS_QUERY,
    {},
    { next: { revalidate: 60, tags: [BLOG_TAG] } }
  );
}

export async function fetchCategories(): Promise<BlogCategory[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600, tags: [BLOG_TAG] } }
  );
}

export async function fetchPostSlugs(): Promise<Array<{ slug: string }>> {
  if (!isSanityConfigured) return [];
  return client.fetch(SLUGS_QUERY, {}, { cache: "force-cache" });
}

// Helper: Get related posts (by category)
export async function fetchRelatedPosts(
  currentPostId: string,
  categoryIds: string[]
): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];

  const query = groq`
  *[_type == "post" && isPublished == true && _id != $currentPostId && count((categories[]._ref)[@ in $categoryIds]) > 0] 
  | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      crop,
      hotspot,
      alt
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
  `;

  return client.fetch(
    query,
    { currentPostId, categoryIds },
    { next: { revalidate: 60, tags: [BLOG_TAG] } }
  );
}
