// src/components/Breadcrumbs.tsx
/**
 * Breadcrumbs – Orientierung auf Unterseiten.
 *
 * Server-Komponente ohne State. Rendert
 *   1. eine <nav aria-label="Brotkrumen"> mit <ol>, letzter Eintrag trägt
 *      aria-current="page",
 *   2. das passende BreadcrumbList-JSON-LD (Google Rich Results).
 *
 * "Start" wird automatisch vorangestellt; `items` beschreibt nur den Weg
 * darunter. Der letzte Eintrag darf ein `href` haben – dann landet die
 * Seite auch im JSON-LD als vollständiger Knoten.
 *
 * `tone="inverse"` für Heroes mit dauerhaft dunkler Bühne (Karriere,
 * Einsatzgebiet), dort ist der Theme-Token text-muted-foreground unlesbar.
 */
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BASE_URL } from "@/lib/seo-utils";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  /** Relativer Pfad. Fehlt er, wird der Eintrag als reiner Text gezeigt. */
  href?: string;
};

type Props = {
  items: readonly Crumb[];
  tone?: "default" | "inverse";
  className?: string;
};

const TONES = {
  default: {
    link: "text-muted-foreground hover:text-brand-text",
    current: "text-foreground",
    separator: "text-muted-foreground/60",
  },
  inverse: {
    link: "text-slate-300 hover:text-white",
    current: "text-white",
    separator: "text-slate-500",
  },
} as const;

export function Breadcrumbs({ items, tone = "default", className }: Props) {
  const t = TONES[tone];
  const trail: Crumb[] = [{ label: "Start", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL}${crumb.href === "/" ? "" : crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Brotkrumen" className={cn("text-sm", className)}>
        {/* Auf schmalen Viewports scrollt der Pfad horizontal statt umzubrechen –
            ein zweizeiliger Pfad liest sich schlechter als ein abgeschnittener. */}
        <ol className="hide-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            const isHome = index === 0;

            return (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    aria-hidden="true"
                    className={cn("shrink-0", t.separator)}
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cn(
                      "max-w-[14rem] truncate font-medium sm:max-w-md",
                      t.current
                    )}
                  >
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded transition-colors",
                      t.link
                    )}
                  >
                    {isHome && <Home size={14} aria-hidden="true" />}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={t.link}>{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
