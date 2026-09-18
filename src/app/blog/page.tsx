import { generateSEOMetadata } from "@/lib/seo-utils";
import Link from "next/link";
import { fetchPosts, fetchCategories } from "@/lib/blog-queries";
import BlogGrid from "@/components/BlogGrid";
import BlogWhatsAppCTA from "@/components/blog/BlogWhatsAppCTA";
import { Newspaper } from "lucide-react";

export const metadata = generateSEOMetadata({
  title: "Blog | Tipps rund um Hausmeisterservice & Objektpflege – Alexander Ergart",
  description:
    "Aktuelle Beiträge, Tipps und Einblicke rund um Hausmeisterservice, Objektpflege, Gebäudereinigung und Fensterservice in Neuss. Der Blog von Alexander Ergart.",
  path: "/blog",
});

// JSON-LD für Blog-Übersicht
function BlogJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Alexander Ergart Blog",
    description: "Hausmeister-Tipps und Fachwissen aus Neuss",
    url: "https://alexander-ergart.de/blog",
    publisher: {
      "@type": "Organization",
      name: "Alexander Ergart Hausmeister- & Fensterservice",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Neuss",
        addressCountry: "DE",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    fetchPosts(),
    fetchCategories(),
  ]);

  return (
    <>
      <BlogJsonLd />
      <div className="bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-brand-blue/10 via-background to-background border-b border-border/20">
          <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-20">
            <div className="flex items-center gap-4 mb-4">
              <Newspaper className="text-brand-blue" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Hausmeister-Blog
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Praktische Tipps, Fachwissen und Neuigkeiten rund um
              Hausmeisterservice, Fensterreinigung und Gebäudepflege; direkt
              aus Neuss und dem Rhein-Kreis.
            </p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="container mx-auto max-w-7xl px-4 pt-8 pb-4">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Willkommen im Blog von{" "}
            <Link href="/ueber-uns" className="text-brand-blue hover:underline font-medium">
              Alexander Ergart
            </Link>
            . Hier teilen wir unser Fachwissen rund um{" "}
            <Link href="/leistungen/hausmeister" className="text-brand-blue hover:underline">
              Hausmeisterservice
            </Link>
            ,{" "}
            <Link href="/leistungen/reinigung" className="text-brand-blue hover:underline">
              Fensterreinigung
            </Link>
            ,{" "}
            <Link href="/leistungen/hausmeister" className="text-brand-blue hover:underline">
              Winterdienst
            </Link>
            {" "}und{" "}
            <Link href="/leistungen" className="text-brand-blue hover:underline">
              weitere Dienstleistungen
            </Link>
            {" "}in Neuss und Umgebung. Praktische Tipps, Branchenwissen und
            Neuigkeiten; direkt vom Profi.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Noch keine Beiträge vorhanden
              </h2>
              <p className="text-muted-foreground mb-6">
                Wir arbeiten gerade an spannenden Inhalten für Sie. Schauen Sie
                bald wieder vorbei!
              </p>
              <Link
                href="/kontakt"
                className="inline-block px-6 py-3 bg-brand-blue text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Jetzt Kontakt aufnehmen
              </Link>
            </div>
          ) : (
            <BlogGrid posts={posts} categories={categories} />
          )}
        </div>

        {/* WhatsApp Business-Kontakt */}
        <div className="container mx-auto max-w-7xl px-4 pb-16 lg:pb-24">
          <BlogWhatsAppCTA />
        </div>
      </div>
    </>
  );
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60;
