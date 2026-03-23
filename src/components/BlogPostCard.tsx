import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { type BlogPost } from "@/lib/blog-queries";
import { getThumbnailUrl } from "@/lib/sanity-image";
import sanityLoader from "@/lib/sanity-loader";

type Props = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: Props) {
  const imageUrl = post.mainImage ? getThumbnailUrl(post.mainImage) : null;
  const categoryColor = post.categories?.[0]?.color || "blue";

  // Color mapping for category badges
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    orange:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border/20"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-video bg-muted overflow-hidden">
          <Image
            loader={sanityLoader}
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        {post.categories && post.categories.length > 0 && (
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
              colorClasses[categoryColor] || colorClasses.blue
            }`}
          >
            {post.categories[0].title}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={14} />
          {new Date(post.publishedAt).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}
