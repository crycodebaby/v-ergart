// src/components/MobileMenu.tsx
"use client";

/**
 * MobileMenu – Navigations-Sheet für Viewports unter `nav-desktop` (1100px).
 *
 * Warum ein Radix-Dialog statt des bisherigen Fullscreen-Overlays:
 *  - Fokusfalle, Escape-Taste, Scroll-Lock und aria-modal kommen fertig mit.
 *  - Der Fokus kehrt beim Schließen zum Hamburger zurück (Tastaturnutzer).
 *  - Das Sheet gleitet von rechts ein – der Daumen bleibt auf der Seite,
 *    auf der auch der Menü-Button liegt.
 *
 * Aufbau von oben nach unten:
 *  1. Kopf: Logo + Schließen
 *  2. Navigation: Startseite, Gruppen (aufklappbar, aktive Gruppe offen),
 *     flache Links, sekundäre Ziele
 *  3. Fuß: Primär-CTA, drei Kontaktwege, Öffnungszeiten, Theme-Schalter
 *
 * Gruppen sind "Split-Buttons": der Text ist ein Link zur Übersichtsseite,
 * der Chevron rechts klappt die Unterpunkte auf. So kommt man mit einem Tipp
 * auf /leistungen UND sieht bei Bedarf die fünf Detailseiten.
 */
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDown, Mail, Phone, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NAV_CTA,
  NAV_ITEMS,
  NAV_SECONDARY,
  isNavItemActive,
  pathMatches,
  type NavGroup,
} from "@/lib/navigation";
import { CONTACT, SITE_LINKS } from "@/lib/site-links";
import { trackCTAClick } from "@/lib/analytics";
import { NavIcon } from "./NavIcon";
import { ThemeToggleButton } from "./ThemeToggleButton";

type Props = {
  /** Schließt das Sheet (setzt `open` im Header auf false). */
  onClose: () => void;
  pathname: string;
};

/** Präfix für die IDs der aufklappbaren Gruppen (aria-controls). */
export const MOBILE_MENU_ID = "mobile-menu";

/**
 * Nur Portal + Inhalt. `DialogPrimitive.Root` und der `Trigger` liegen im
 * Header, damit Radix den Fokus beim Schließen zuverlässig auf den
 * Hamburger zurücksetzt und aria-expanded/aria-controls selbst verdrahtet.
 */
export function MobileMenu({ onClose, pathname }: Props) {
  const close = onClose;

  return (
    <>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 right-0 z-[60] flex h-dvh w-[min(100vw-2.5rem,24rem)] flex-col",
            "border-l border-border bg-background text-foreground shadow-2xl",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
            "duration-300"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Menü</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Hauptnavigation und Kontaktmöglichkeiten
          </DialogPrimitive.Description>

          {/* 1. Kopf */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 safe-top">
            <Link href="/" onClick={close} className="flex items-center gap-3 rounded">
              <Image
                src="/bilder_ordner/AE_logo.svg"
                alt=""
                aria-hidden="true"
                width={135}
                height={100}
                className="h-auto w-10"
                unoptimized
              />
              <span className="text-sm font-bold">Alexander Ergart</span>
            </Link>
            <DialogPrimitive.Close
              aria-label="Menü schließen"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-md",
                "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <X size={22} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          {/* 2. Navigation */}
          <nav aria-label="Mobile Hauptnavigation" className="flex-1 overflow-y-auto px-2 py-3">
            <ul className="space-y-0.5">
              <li>
                <MobileLink href="/" label="Startseite" active={pathname === "/"} onNavigate={close} />
              </li>

              {NAV_ITEMS.map((item) =>
                item.kind === "group" ? (
                  <li key={item.href}>
                    <MobileGroup
                      group={item}
                      pathname={pathname}
                      active={isNavItemActive(item, pathname)}
                      onNavigate={close}
                    />
                  </li>
                ) : (
                  <li key={item.href}>
                    <MobileLink
                      href={item.href}
                      label={item.label}
                      active={isNavItemActive(item, pathname)}
                      onNavigate={close}
                    />
                  </li>
                )
              )}

              <li aria-hidden="true" className="my-2 border-t border-border" />

              {NAV_SECONDARY.map((item) => (
                <li key={item.href}>
                  <MobileLink
                    href={item.href}
                    label={item.label}
                    active={isNavItemActive(item, pathname)}
                    onNavigate={close}
                    muted
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Fuß: Aktion + Kontaktwege */}
          <div className="shrink-0 space-y-3 border-t border-border bg-muted/40 px-4 pb-4 pt-4 safe-bottom">
            <Link
              href={NAV_CTA.href}
              onClick={() => {
                trackCTAClick("contact", "header");
                close();
              }}
              className={cn(
                "flex h-12 w-full items-center justify-center rounded-lg",
                "bg-primary text-base font-bold text-primary-foreground",
                "shadow-md transition-colors hover:bg-brand-solid-hover active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {NAV_CTA.labelLong}
            </Link>

            <div className="grid grid-cols-3 gap-2">
              <ContactTile
                href={CONTACT.phoneHref}
                label="Anrufen"
                onClick={() => trackCTAClick("phone", "header")}
                icon={<Phone size={18} aria-hidden="true" />}
              />
              <ContactTile
                href={SITE_LINKS.external.whatsappChat}
                label="WhatsApp"
                external
                icon={
                  <Image
                    src="/bilder_ordner/icons/whatsapp.svg"
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="rounded-[22%]"
                    unoptimized
                  />
                }
              />
              <ContactTile
                href={CONTACT.emailHref}
                label="E-Mail"
                onClick={() => trackCTAClick("email", "header")}
                icon={<Mail size={18} aria-hidden="true" />}
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {CONTACT.hoursShort}
              </span>
              <ThemeToggleButton />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </>
  );
}

/* ---------------------------------------------------------------------- */

function MobileLink({
  href,
  label,
  active,
  onNavigate,
  muted = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
  muted?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-12 items-center rounded-md px-3 py-2.5 text-base font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-brand/10 text-brand-text"
          : muted
            ? "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            : "text-foreground hover:bg-muted"
      )}
    >
      {label}
    </Link>
  );
}

function MobileGroup({
  group,
  pathname,
  active,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  active: boolean;
  onNavigate: () => void;
}) {
  // Aktive Gruppe startet aufgeklappt: wer auf /fenster ist, sieht sofort
  // die Nachbarn /tueren und /fensterservice.
  const [expanded, setExpanded] = React.useState(active);
  const panelId = `${MOBILE_MENU_ID}-${group.href.replace(/\W/g, "")}`;

  return (
    <div>
      <div
        className={cn(
          "flex items-stretch rounded-md transition-colors",
          active ? "bg-brand/10" : "hover:bg-muted"
        )}
      >
        <Link
          href={group.href}
          onClick={onNavigate}
          aria-current={pathMatches(pathname, group.href) ? "page" : undefined}
          className={cn(
            "flex min-h-12 flex-1 items-center rounded-l-md px-3 py-2.5 text-base font-semibold",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active ? "text-brand-text" : "text-foreground"
          )}
        >
          {group.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${group.label}: Unterpunkte ${expanded ? "ausblenden" : "anzeigen"}`}
          className={cn(
            "inline-flex w-12 shrink-0 items-center justify-center rounded-r-md border-l border-border/60",
            "text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={cn("transition-transform duration-200", expanded && "rotate-180")}
          />
        </button>
      </div>

      <ul
        id={panelId}
        hidden={!expanded}
        className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2"
      >
        {group.children.map((child) => {
          const childActive = pathMatches(pathname, child.href);
          return (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                aria-current={childActive ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-start gap-3 rounded-md px-3 py-2 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  childActive ? "bg-brand/10" : "hover:bg-muted"
                )}
              >
                <NavIcon
                  name={child.icon}
                  size={18}
                  className={cn("mt-0.5 shrink-0", childActive ? "text-brand-text" : "text-muted-foreground")}
                />
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm font-semibold leading-tight",
                      childActive ? "text-brand-text" : "text-foreground"
                    )}
                  >
                    {child.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {child.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactTile({
  href,
  label,
  icon,
  external = false,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-background",
        "text-xs font-medium text-foreground transition-colors hover:border-brand hover:bg-brand/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {icon}
      {label}
    </a>
  );
}

export default MobileMenu;
