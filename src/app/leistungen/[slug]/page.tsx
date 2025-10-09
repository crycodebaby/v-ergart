// src/app/leistungen/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";
import { Button } from "@/components/ui/button";

type Props = { params: { slug: string } };

function getLeistung(slug: string) {
  return LEISTUNGEN_DETAILS.find((l) => l.slug === slug);
}

/* ---- Static params ---- */
export function generateStaticParams() {
  return LEISTUNGEN_DETAILS.map((l) => ({ slug: l.slug }));
}

/* ---- SEO / OpenGraph ---- */
export function generateMetadata({ params }: Props): Metadata {
  const item = getLeistung(params.slug);
  if (!item) return {};
  const title = `${item.title} | V-ERGART Leistungen`;
  const description = item.description;
  const url = `https://www.deine-domain.de/leistungen/${item.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function LeistungDetailPage({ params }: Props) {
  const item = getLeistung(params.slug);
  if (!item) return notFound();

  return (
    <main className="bg-background text-foreground font-sans">
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Leistungen",
                item: "https://www.deine-domain.de/leistungen",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: item.title,
                item: `https://www.deine-domain.de/leistungen/${item.slug}`,
              },
            ],
          }),
        }}
      />
      <section className="border-b border-border bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8 py-10 md:py-14">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link href="/leistungen" className="hover:underline">
              Leistungen
            </Link>{" "}
            / <span className="text-foreground">{item.title}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {item.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
            {item.description}
          </p>

          <div className="mt-6">
            <Button asChild size="lg" className="shadow-button">
              <Link href="/kontakt">Unverbindlich anfragen</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold">Ihre Vorteile</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {item.benefits.map((b) => (
              <li
                key={b}
                className="rounded-xl border border-border bg-card/90 p-4"
              >
                {b}
              </li>
            ))}
          </ul>

          {item.faq && item.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
              <div className="mt-5 grid gap-4">
                {item.faq.map(({ q, a }) => (
                  <div
                    key={q}
                    className="rounded-xl border border-border bg-card/90 p-5"
                  >
                    <p className="font-semibold">{q}</p>
                    <p className="mt-1 text-muted-foreground">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/leistungen">Zurück zur Übersicht</Link>
            </Button>
            <Button asChild>
              <Link href="/kontakt">Projekt anfragen</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
