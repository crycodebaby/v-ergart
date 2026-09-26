// src/components/DesktopDropdown.tsx
"use client";

/**
 * DesktopDropdown – das Panel hinter "Leistungen" und "Fenster & Türen".
 *
 * Zwei Spalten: links die Einträge, rechts eine Bildvorschau, die dem
 * Hover (oder Tastaturfokus) folgt. Ohne Hover zeigt die Vorschau die
 * Gruppe selbst (Übersichtsbild + Intro).
 *
 * Micro-Interaktionen, alle ruhig gehalten:
 *  - Eine Hover-Markierung gleitet per shared layout (framer `layoutId`)
 *    von Eintrag zu Eintrag, statt pro Eintrag ein- und auszublenden.
 *  - Das Icon-Plättchen füllt sich beim Hover mit der Brandfarbe und
 *    wächst minimal, rechts fährt ein Chevron ein.
 *  - Das Vorschaubild blendet mit leichtem Zoom-out über, der Text darunter
 *    rückt nach.
 *
 * `useReducedMotion` schaltet Bewegung auf reine Fades zurück.
 *
 * Wichtig: `hot` wird erst beim Verlassen des GESAMTEN Panels
 * zurückgesetzt, nicht beim Verlassen der Liste – sonst springt die
 * Vorschau zurück, bevor man "Mehr erfahren" erreichen kann.
 */
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { pathMatches, type NavChild, type NavGroup } from "@/lib/navigation";
import { NavIcon } from "./NavIcon";
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

/** "Apple-ish" ease-out: schneller Start, langes, weiches Ausrollen. */
const EASE = [0.22, 1, 0.36, 1] as const;

type Preview = {
  key: string;
  href: string;
  title: string;
  text: string;
  image: string;
  cta: string;
};

export function DesktopDropdown({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const reduce = useReducedMotion();
  const [hot, setHot] = React.useState<string | null>(null);

  const hotChild = group.children.find((c) => c.href === hot) ?? null;
  const preview: Preview = hotChild
    ? {
        key: hotChild.href,
        href: hotChild.href,
        title: hotChild.label,
        text: hotChild.description,
        image: hotChild.image,
        cta: "Mehr erfahren",
      }
    : {
        key: group.href,
        href: group.href,
        title: group.label,
        text: group.intro,
        image: group.image,
        cta: group.overviewLabel,
      };

  return (
    // Neutrale Popover-Fläche, Brand nur als Akzent (20:1 light / 13.4:1 dark).
    <NavigationMenuContent
      className={cn(
        "relative isolate z-50 overflow-hidden rounded-xl p-0",
        "bg-popover text-popover-foreground",
        "ring-1 ring-border shadow-2xl"
      )}
    >
      <div
        className="grid w-[760px] grid-cols-[minmax(0,1fr)_280px]"
        onMouseLeave={() => setHot(null)}
      >
        {/* ── Liste ─────────────────────────────────────────────────── */}
        <div className="flex flex-col">
          <div className="border-b border-border px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.label}
            </p>
            <p className="mt-0.5 text-sm text-foreground">{group.intro}</p>
          </div>

          <ul className="flex-1 space-y-0.5 p-2">
            {group.children.map((child) => (
              <DropdownItem
                key={child.href}
                child={child}
                active={pathMatches(pathname, child.href)}
                hot={hot === child.href}
                onHot={() => setHot(child.href)}
                layoutId={`nav-pill-${group.href}`}
                reduce={!!reduce}
              />
            ))}
          </ul>

          <div className="border-t border-border bg-muted px-4 py-3">
            <NavigationMenuLink
              asChild
              className={cn(
                "group/all inline-flex flex-row items-center gap-1.5 rounded p-0 text-sm font-semibold",
                "text-brand-text hover:bg-transparent hover:text-brand-text hover:underline",
                "focus:bg-transparent focus:text-brand-text"
              )}
            >
              <Link href={group.href} onFocus={() => setHot(null)}>
                {group.overviewLabel}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/all:translate-x-0.5"
                />
              </Link>
            </NavigationMenuLink>
          </div>
        </div>

        {/* ── Vorschau ──────────────────────────────────────────────── */}
        <div className="relative m-2 ml-0 min-h-[300px] overflow-hidden rounded-lg bg-muted">
          <AnimatePresence initial={false}>
            <motion.div
              key={preview.key}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
            >
              <Image
                src={preview.image}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
              {/* Dauerhaft dunkler Scrim → weißer Text in beiden Themes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/5"
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative flex h-full flex-col justify-end p-4 text-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={preview.key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0.1 : 0.22, ease: EASE }}
              >
                <p className="text-base font-bold leading-tight">{preview.title}</p>
                <p className="mt-1 line-clamp-3 text-xs leading-snug text-slate-200">
                  {preview.text}
                </p>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "group/more mt-3 inline-flex flex-row items-center gap-1 rounded p-0 text-xs font-semibold",
                    "text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  )}
                >
                  <Link href={preview.href}>
                    {preview.cta}
                    <ArrowRight
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/more:translate-x-0.5"
                    />
                  </Link>
                </NavigationMenuLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sobald das Panel offen ist: Vorschaubilder der Einträge vorladen,
          damit der erste Hover nicht aus einem grauen Feld überblendet. */}
      <NavImagePrefetch srcs={group.children.map((c) => c.image)} />
    </NavigationMenuContent>
  );
}

/* ------------------------------------------------------------------------ */

/**
 * Lädt Bilder unsichtbar vor – mit exakt denselben `fill`/`sizes`-Parametern
 * wie die sichtbare Vorschau, damit der Browser dieselbe srcset-Kandidatin
 * wählt und der spätere sichtbare Einsatz aus dem Cache kommt.
 * display:none verhindert das Laden von <img> nicht, nur von Hintergrundbildern.
 */
export function NavImagePrefetch({ srcs }: { srcs: readonly string[] }) {
  return (
    <div aria-hidden="true" className="hidden">
      {srcs.map((src) => (
        <div key={src} className="relative h-px w-px">
          <Image src={src} alt="" fill sizes="280px" loading="eager" />
        </div>
      ))}
    </div>
  );
}

function DropdownItem({
  child,
  active,
  hot,
  onHot,
  layoutId,
  reduce,
}: {
  child: NavChild;
  active: boolean;
  hot: boolean;
  onHot: () => void;
  layoutId: string;
  reduce: boolean;
}) {
  return (
    <li className="relative">
      {/* Aktuelle Seite: ruhige, feste Fläche unter allem */}
      {active && (
        <span aria-hidden="true" className="absolute inset-0 rounded-lg bg-brand/10" />
      )}

      {/* Gleitende Hover-Markierung (shared layout über alle Einträge) */}
      {hot && (
        <motion.span
          aria-hidden="true"
          layoutId={layoutId}
          className="absolute inset-0 rounded-lg bg-foreground/[0.06] dark:bg-foreground/[0.09]"
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 520, damping: 42, mass: 0.8 }
          }
        />
      )}

      {/* Klassen gehören auf NavigationMenuLink, nicht auf das Kind:
          nur dort werden sie per twMerge gegen den Grundstil (flex-col, p-2)
          aufgelöst. Auf dem Kind würde Radix Slot beide Klassenlisten nur
          aneinanderhängen und flex-col gewänne. */}
      <NavigationMenuLink
        asChild
        active={active}
        className={cn(
          "relative z-10 flex flex-row items-center gap-3 rounded-lg px-3 py-2.5",
          "bg-transparent text-popover-foreground",
          "hover:bg-transparent hover:text-popover-foreground",
          "focus:bg-transparent focus:text-popover-foreground",
          "data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "[&_svg]:size-[18px]"
        )}
      >
        <Link href={child.href} onMouseEnter={onHot} onFocus={onHot}>
          <span
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              "transition-[background-color,color,transform,box-shadow] duration-300 ease-out",
              hot
                ? "scale-105 bg-primary text-primary-foreground shadow-md shadow-brand/30"
                : active
                  ? "bg-brand/15 text-brand-text"
                  : "bg-muted text-brand-text"
            )}
          >
            <NavIcon name={child.icon} size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "block text-sm font-semibold leading-tight",
                active && "text-brand-text"
              )}
            >
              {child.label}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
              {child.description}
            </span>
          </span>

          <ChevronRight
            aria-hidden="true"
            className={cn(
              "shrink-0 text-brand-text transition-[opacity,transform] duration-300 ease-out",
              hot ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            )}
          />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default DesktopDropdown;
