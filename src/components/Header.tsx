// src/components/Header.tsx
"use client";

/**
 * Header – Topbar (nur ab md) + Hauptleiste, als Einheit sticky.
 *
 * Besucherführung:
 *  - Desktop (ab nav-desktop / 1100px): 5 Menüpunkte aus src/lib/navigation.ts,
 *    zwei davon als Dropdown mit Absichts-Klärung, rechts Telefon + Primär-CTA.
 *    Der aktive Bereich ist markiert (Unterstrich + Brandfarbe + aria-current),
 *    auch auf Unterseiten wie /leistungen/reinigung oder /fensterservice.
 *  - Mobil: Logo, Anruf-Button (die häufigste Conversion eines Handwerks-
 *    betriebs) und Hamburger. Das Menü selbst ist ein Sheet (MobileMenu.tsx).
 *  - Die Topbar mit WhatsApp/E-Mail/Öffnungszeiten ist auf Mobile ausgeblendet:
 *    dort zeigte sie nur drei Icons auf 48px Höhe, die dauerhaft am oberen
 *    Rand klebten. Ihre Inhalte stehen mobil im Fuß des Sheets.
 */
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, Clock, Mail, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NAV_CTA,
  NAV_ITEMS,
  isNavItemActive,
  pathMatches,
  type NavGroup,
} from "@/lib/navigation";
import { CONTACT, SITE_LINKS } from "@/lib/site-links";
import { trackCTAClick } from "@/lib/analytics";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { MobileMenu } from "./MobileMenu";
import { NavIcon } from "./NavIcon";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Nach jeder Navigation schließen – auch wenn der Klick nicht aus dem
  // Sheet kam (Browser-Zurück, Link in einem Banner).
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    // Dialog-Root rendert kein DOM. Er umschließt Header UND Sheet, damit der
    // Hamburger ein echter DialogPrimitive.Trigger sein kann (Fokus-Rückgabe,
    // aria-expanded/aria-controls kommen dann von Radix).
    <DialogPrimitive.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <div className="sticky top-0 z-50">
        {/* Topbar – Service-Kontakte, nur ab Tablet */}
        <div className="hidden border-b border-black/5 bg-muted text-sm dark:border-white/5 md:block">
          <div className="container mx-auto flex h-10 max-w-7xl items-center justify-between px-4">
            <div className="flex items-center gap-5">
              <a
                href={SITE_LINKS.external.whatsappChat}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Per WhatsApp schreiben"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image
                  src="/bilder_ordner/icons/whatsapp.svg"
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  className="shrink-0 rounded-[22%]"
                  unoptimized
                />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT.emailHref}
                onClick={() => trackCTAClick("email", "header")}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail size={15} aria-hidden="true" />
                <span>{CONTACT.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-1.5 text-muted-foreground lg:inline-flex">
                <Clock size={14} aria-hidden="true" />
                {CONTACT.hoursShort}
              </span>
              <ThemeToggleButton />
            </div>
          </div>
        </div>

        {/* Hauptleiste */}
        <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-top">
          <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 nav-desktop:h-24">
            <Link
              href="/"
              aria-label="Alexander Ergart – zur Startseite"
              className="flex shrink-0 items-center gap-3 rounded"
            >
              <Image
                src="/bilder_ordner/AE_logo.svg"
                alt=""
                aria-hidden="true"
                width={135}
                height={100}
                className="h-auto w-14 transition-all md:w-20 nav-desktop:w-24"
                priority
                unoptimized
              />
              <span className="hidden lg:block">
                <span className="block text-xl font-bold leading-tight">Alexander Ergart</span>
                <span className="block text-sm text-muted-foreground">Ihr Profi in Neuss</span>
              </span>
            </Link>

            {/* Desktop-Navigation */}
            <nav aria-label="Hauptnavigation" className="hidden nav-desktop:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {NAV_ITEMS.map((item) => {
                    const active = isNavItemActive(item, pathname);

                    if (item.kind === "group") {
                      return (
                        <NavigationMenuItem key={item.href}>
                          <NavigationMenuTrigger
                            className={desktopItemStyle}
                            data-active={active ? "true" : undefined}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <DesktopDropdown group={item} pathname={pathname} />
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink asChild active={active}>
                          <Link
                            href={item.href}
                            className={desktopItemStyle}
                            data-active={active ? "true" : undefined}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Desktop: Telefon + Primär-CTA */}
            <div className="hidden items-center gap-2 nav-desktop:flex xl:gap-3">
              <a
                href={CONTACT.phoneHref}
                onClick={() => trackCTAClick("phone", "header")}
                className={cn(
                  "hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold xl:inline-flex",
                  "text-foreground transition-colors hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <Phone size={16} aria-hidden="true" className="text-brand-text" />
                {CONTACT.phoneDisplay}
              </a>
              <Link
                href={NAV_CTA.href}
                onClick={() => trackCTAClick("contact", "header")}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground",
                  "shadow-sm transition-colors hover:bg-brand-solid-hover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                {NAV_CTA.label}
              </Link>
            </div>

            {/* Mobil / Tablet: Anrufen + Menü */}
            <div className="flex items-center gap-1 nav-desktop:hidden">
              <a
                href={CONTACT.phoneHref}
                aria-label={`Jetzt anrufen: ${CONTACT.phoneDisplay}`}
                onClick={() => trackCTAClick("phone", "header")}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-text",
                  "transition-colors hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <Phone size={22} aria-hidden="true" />
              </a>
              <DialogPrimitive.Trigger asChild>
                <button
                  type="button"
                  aria-label="Menü öffnen"
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground",
                    "transition-colors hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <Menu size={24} aria-hidden="true" />
                </button>
              </DialogPrimitive.Trigger>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu onClose={() => setMenuOpen(false)} pathname={pathname} />
    </DialogPrimitive.Root>
  );
}

/* ======================================================================
   Desktop-Dropdown
   ====================================================================== */

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const twoColumns = group.children.length > 3;

  return (
    // Neutrale Popover-Fläche, Brand nur als Akzent (20:1 light / 13.4:1 dark).
    <NavigationMenuContent
      className={cn(
        "relative isolate z-50 overflow-hidden rounded-xl p-0",
        "bg-popover text-popover-foreground",
        "ring-1 ring-border shadow-2xl"
      )}
    >
      <div className="border-b border-border bg-muted px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {group.label}
        </p>
        <p className="mt-0.5 text-sm text-foreground">{group.intro}</p>
      </div>

      <ul className={cn("grid gap-1 p-2", twoColumns ? "w-[660px] grid-cols-2" : "w-[440px]")}>
        {group.children.map((child) => {
          const childActive = pathMatches(pathname, child.href);
          return (
            <li key={child.href}>
              {/* Klassen gehören auf NavigationMenuLink, nicht auf das Kind:
                  nur dort werden sie per twMerge gegen den Grundstil
                  (flex-col, p-2) aufgelöst. Auf dem Kind würde Radix Slot
                  beide Klassenlisten nur aneinanderhängen und flex-col gewänne. */}
              <NavigationMenuLink
                asChild
                active={childActive}
                className={cn(
                  "group/item flex flex-row items-start gap-3 rounded-lg px-3 py-3 transition-colors",
                  "text-popover-foreground hover:bg-accent hover:text-popover-foreground",
                  "focus:bg-accent focus:text-popover-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "[&_svg]:size-[18px]",
                  childActive && "bg-brand/10"
                )}
              >
                <Link href={child.href}>
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                      childActive ? "bg-brand/15 text-brand-text" : "bg-muted text-brand-text"
                    )}
                  >
                    <NavIcon name={child.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-semibold leading-tight",
                        childActive && "text-brand-text"
                      )}
                    >
                      {child.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                      {child.description}
                    </span>
                  </span>
                </Link>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border bg-muted px-4 py-3">
        <NavigationMenuLink
          asChild
          className="inline-flex flex-row items-center gap-1.5 rounded p-0 text-sm font-semibold text-brand-text hover:bg-transparent hover:text-brand-text hover:underline focus:bg-transparent focus:text-brand-text"
        >
          <Link href={group.href}>
            {group.overviewLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </NavigationMenuLink>
      </div>
    </NavigationMenuContent>
  );
}

/* ======================================================================
   Stil der Desktop-Menüpunkte (Trigger und Link identisch)
   ====================================================================== */

const desktopItemStyle = cn(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium xl:px-4",
  "transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "data-[state=open]:bg-muted data-[state=open]:text-foreground",
  // Unterstrich: bei Hover/offen animiert, für den aktiven Bereich dauerhaft.
  "relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-brand after:content-['']",
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-300",
  "hover:after:scale-x-100 data-[state=open]:after:scale-x-100 data-[active=true]:after:scale-x-100",
  "data-[active=true]:font-semibold data-[active=true]:text-brand-text"
);
