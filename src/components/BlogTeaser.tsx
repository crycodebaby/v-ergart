// src/components/BlogTeaser.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPosts } from "@/lib/blog-queries";
import BlogPostCard from "@/components/BlogPostCard";

type BlogTeaserProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /**
   * Themenfilter: nur Beiträge, deren Slug oder Kategorie diesen Begriff
   * enthält (z. B. "fenster"). Ohne Filter: die neuesten Beiträge.
   */
  topic?: string;
  /** Maximale Anzahl Karten (Default: 3) */
  limit?: number;
};

/**
 * BlogTeaser – holt Blogbeiträge aus Sanity auf Seiten ausserhalb von /blog.
 *
 * Server Component: nutzt denselben gecachten fetchPosts()-Aufruf wie die
 * Blog-Übersicht (revalidate 60s). Rendert nur Inhalt – Fläche, Abstand und
 * Breite kommen von der umgebenden <Section>. Gibt es keine (passenden)
 * Beiträge, rendert die Komponente nichts.
 */
export default async function BlogTeaser({
  eyebrow = "Ratgeber",
  title,
  description,
  topic,
  limit = 3,
}: BlogTeaserProps) {
  const allPosts = await fetchPosts();

  const needle = topic?.toLowerCase();
  // Treffer im Slug (= Thema des Artikels) zuerst, danach Treffer nur über die
  // Kategorie. Innerhalb beider Gruppen bleibt die Reihenfolge "neueste zuerst".
  const bySlug = needle
    ? allPosts.filter((post) => post.slug.current.toLowerCase().includes(needle))
    : allPosts;
  const byCategory = needle
    ? allPosts.filter(
        (post) =>
          !bySlug.includes(post) &&
          post.categories?.some(
            (cat) =>
              cat.slug.current.toLowerCase().includes(needle) ||
              cat.title.toLowerCase().includes(needle)
          )
      )
    : [];
  const posts = [...bySlug, ...byCategory].slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <Link
          href="/blog"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
        >
          Alle Beiträge
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
