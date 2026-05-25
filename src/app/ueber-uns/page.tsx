// src/app/ueber-uns/page.tsx
import Image from "next/image";
import SectionShell from "@/components/about/SectionShell";
import SectionHeader from "@/components/about/SectionHeader";
import MediaTextBlock from "@/components/about/MediaTextBlock";
import FeatureGrid from "@/components/about/FeatureGrid";
import FeatureCard from "@/components/about/FeatureCard";
import LogoPartnerGrid from "@/components/about/LogoPartnerGrid";
import CTAGroup from "@/components/about/CTAGroup";
import ResponsiveImageFigure from "@/components/about/ResponsiveImageFigure";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";
import { ABOUT_ASSETS } from "@/lib/about/about-assets";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title:
    "Über uns | Alexander Ergart - Hausmeisterservice, Fensterservice & Immobilienverwaltung",
  description:
    "Lernen Sie Alexander Ergart kennen: strukturierter Hausmeister- und Fensterservice mit klaren Prozessen, starken Partnern und Fokus auf langfristigen Werterhalt in Neuss und der Region.",
  path: "/ueber-uns",
  image: {
    url: ABOUT_PAGE_DATA.hero.figure.src,
    alt: ABOUT_PAGE_DATA.hero.figure.alt,
  },
});

export default function UeberUnsPage() {
  const data = ABOUT_PAGE_DATA;

  return (
    <>
      <SectionShell id={data.hero.id} spacing="lg" containerWidth="2xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
              {data.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {data.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.hero.intro}
            </p>
            <div className="mt-8">
              <CTAGroup data={data.hero.ctas} />
            </div>
          </div>
          <figure className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-lg">
            <Image
              src={data.hero.figure.src}
              alt={data.hero.figure.alt}
              width={data.hero.figure.width ?? 1600}
              height={data.hero.figure.height ?? 1000}
              priority
              sizes={data.hero.figure.sizes ?? "(max-width: 1024px) 100vw, 50vw"}
              className="h-auto w-full object-cover"
            />
          </figure>
        </div>
      </SectionShell>

      <SectionShell id={data.origin.id} tone="muted">
        <MediaTextBlock
          eyebrow={data.origin.eyebrow}
          title={data.origin.title ?? ""}
          intro={data.origin.intro}
          paragraphs={data.origin.paragraphs}
          figure={data.origin.figure}
          mediaPosition="right"
          ratio="4/3"
        />
      </SectionShell>

      <SectionShell id={data.leadership.id}>
        <MediaTextBlock
          eyebrow={data.leadership.eyebrow}
          title={data.leadership.title ?? ""}
          paragraphs={data.leadership.paragraphs}
          figure={data.leadership.figure}
          mediaPosition="left"
          ratio="3/2"
          objectFit="cover"
        />
      </SectionShell>

      <SectionShell id={data.milestones.id} tone="muted">
        <SectionHeader
          eyebrow={data.milestones.eyebrow}
          title={data.milestones.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={2} className="mt-10">
          {data.milestones.items.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              body={item.body}
              badge={item.year}
            />
          ))}
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.regionScope.id}>
        <SectionHeader
          eyebrow={data.regionScope.eyebrow}
          title={data.regionScope.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          <FeatureCard
            title="Einsatzgebiet"
            body={data.regionScope.regions.join(", ")}
          />
          <FeatureCard
            title="Leistungen für private Kunden"
            body={data.regionScope.b2cServices.join(", ")}
          />
          <FeatureCard
            title="Leistungen für B2B & Verwaltung"
            body={data.regionScope.b2bServices.join(", ")}
          />
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.quality.id} tone="muted">
        <SectionHeader
          eyebrow={data.quality.eyebrow}
          title={data.quality.title ?? ""}
          intro={data.quality.intro}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          {data.quality.principles.map((principle) => (
            <FeatureCard
              key={principle.id}
              title={principle.title}
              body={principle.body}
            />
          ))}
        </FeatureGrid>
        {data.quality.toolsNote ? (
          <p className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            {data.quality.toolsNote}
          </p>
        ) : null}
      </SectionShell>

      <SectionShell id={data.partnerships.id}>
        <SectionHeader
          eyebrow={data.partnerships.eyebrow}
          title={data.partnerships.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-10">
          <LogoPartnerGrid partners={data.partnerships.partners} />
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <ResponsiveImageFigure
            figure={{
              ...ABOUT_ASSETS.windowService,
              caption:
                "Fenster- und Türenservice mit Fokus auf Qualität, Funktion und langlebige Ergebnisse.",
            }}
          />
        </div>
      </SectionShell>

      <SectionShell id={data.future.id} tone="muted">
        <SectionHeader
          eyebrow={data.future.eyebrow}
          title={data.future.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          {data.future.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-xl border border-border/60 bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          {data.future.disclaimer}
        </p>
      </SectionShell>

      <SectionShell id={data.socialEngagement.id}>
        <SectionHeader
          eyebrow={data.socialEngagement.eyebrow}
          title={data.socialEngagement.title}
          intro={data.socialEngagement.body}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mx-auto mt-8 max-w-4xl">
          {data.socialEngagement.figure ? (
            <ResponsiveImageFigure figure={data.socialEngagement.figure} ratio="3/2" />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Bild folgt nach Lieferung der optimierten Datei.
              </p>
              <p className="mt-2 font-medium">
                TODO: {data.socialEngagement.imageTodo}
              </p>
              <p className="mt-2">Bildnachweis: K&amp;L Verlag</p>
            </div>
          )}
        </div>
        {data.socialEngagement.legalNote ? (
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {data.socialEngagement.legalNote}
          </p>
        ) : null}
      </SectionShell>

      <SectionShell id={data.values.id} tone="muted">
        <SectionHeader
          eyebrow={data.values.eyebrow}
          title={data.values.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          {data.values.principles.map((principle) => (
            <FeatureCard key={principle.id} title={principle.title} body={principle.body} />
          ))}
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.finalCta.id}>
        <SectionHeader
          eyebrow={data.finalCta.eyebrow}
          title={data.finalCta.title ?? ""}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-4">
          <CTAGroup data={data.finalCta.ctas} align="center" />
        </div>
      </SectionShell>
    </>
  );
}