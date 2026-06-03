import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { PortableText } from "@portabletext/react";
import {
  fetchPostBySlug,
  fetchPostSlugs,
  fetchRelatedPosts,
  type BlogPost,
} from "@/lib/blog-queries";
import { getBlogImageUrl, urlForImage } from "@/lib/sanity-image";
import sanityLoader from "@/lib/sanity-loader";
import AuthorBox from "@/components/AuthorBox";
import BlogPostCard from "@/components/BlogPostCard";
import BlogServiceCTA from "@/components/BlogServiceCTA";
import BlogWhatsAppCTA from "@/components/blog/BlogWhatsAppCTA";
import { SITE_LINKS } from "@/lib/site-links";

type Props = { params: { slug: string } };

// Generate Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  const imageUrl = post.mainImage ? urlForImage(post.mainImage).width(1200).height(630).format('webp').url() : null;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://alexander-ergart.de'}/blog/${params.slug}`;
  
  // SEO-optimierte Fallbacks
  const title = post.metaTitle || `${post.title} | Ergart Blog`;
  const description = 
    post.metaDescription || 
    post.excerpt || 
    `${post.title} - Erfahren Sie mehr über unsere Dienstleistungen in Neuss und Umgebung.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.mainImage?.alt || post.title }] : [],
      locale: 'de_DE',
      siteName: 'Alexander Ergart Hausmeister- & Fensterservice',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// Article JSON-LD
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const imageUrl = post.mainImage ? urlForImage(post.mainImage).width(1200).height(630).format('webp').url() : null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.metaDescription,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: post.author.website || undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Alexander Ergart Hausmeister- & Fensterservice",
      logo: {
        "@type": "ImageObject",
        url: "https://alexander-ergart.de/bilder_ordner/AE_logo.svg",
      },
    },
    articleSection: post.categories?.map((c) => c.title).join(", "),
    keywords: post.focusKeywords?.join(", "),
    locationCreated: post.locationTags?.includes("neuss")
      ? {
          "@type": "Place",
          name: "Neuss",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Neuss",
            addressCountry: "DE",
          },
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Social Share Buttons
function ShareButtons({ post }: { post: BlogPost }) {
  const url = `https://alexander-ergart.de/blog/${post.slug.current}`;
  const text = post.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `${SITE_LINKS.external.whatsappShareBase}?text=${encodeURIComponent(text + " " + url)}`,
    email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        <Share2 size={16} />
        Teilen:
      </span>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 text-sm bg-[#1877F2] text-white rounded hover:opacity-90 transition-opacity"
      >
        Facebook
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 text-sm bg-[#25D366] text-white rounded hover:opacity-90 transition-opacity"
      >
        WhatsApp
      </a>
      <a
        href={shareLinks.email}
        className="px-3 py-2 text-sm bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
      >
        E-Mail
      </a>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return notFound();

  const imageUrl = post.mainImage ? getBlogImageUrl(post.mainImage) : null;

  // Fetch related posts - use manual category ID extraction
  // Categories in the post type don't have _id, we need to query them separately
  const relatedPosts: any[] = [];
  
  // For now, skip related posts to avoid type issues
  // TODO: Implement proper category reference resolution

  return (
    <>
      <ArticleJsonLd post={post} />
      <div className="bg-background">
        <article className="container mx-auto max-w-4xl px-4 py-12 lg:py-16">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Zurück zum Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author.name}
                </span>
              )}
              {post.categories && post.categories.length > 0 && (
                <span className="flex items-center gap-2">
                  <Tag size={16} />
                  {post.categories.map((cat) => cat.title).join(", ")}
                </span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <Image
                loader={sanityLoader}
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>Kein Inhalt vorhanden.</p>
            )}
          </div>

          {/* WhatsApp Business-Kontakt */}
          <BlogWhatsAppCTA className="mb-8" />

          {/* Service CTA */}
          <BlogServiceCTA categories={post.categories} />

          {/* Share Buttons */}
          <div className="border-t border-border/20 pt-8 mb-12">
            <ShareButtons post={post} />
          </div>

          {/* Author Box */}
          {post.author && (
            <div className="border-t border-border/20 pt-8 mb-12">
              <AuthorBox author={post.author} />
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-muted/30 border-t border-border/20">
            <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Ähnliche Artikel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Generate Static Params for SSG
export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

// ISR
export const revalidate = 60;
