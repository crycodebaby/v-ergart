"use client";

import { useState } from "react";
import { type BlogPost, type BlogCategory } from "@/lib/blog-queries";
import BlogPostCard from "./BlogPostCard";

type Props = {
  posts: BlogPost[];
  categories: BlogCategory[];
};

export default function BlogGrid({ posts, categories }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredPosts = activeFilter
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.slug.current === activeFilter)
      )
    : posts;

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === null
                  ? "bg-brand-blue text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Alle
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveFilter(cat.slug.current)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === cat.slug.current
                    ? "bg-brand-blue text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Keine Artikel in dieser Kategorie gefunden.
          </p>
        </div>
      )}
    </div>
  );
}
