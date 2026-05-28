// src/components/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { Menu, X, Mail, Phone, Building, DoorOpen, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SITE_LINKS } from "@/lib/site-links";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/fensterservice", label: "Fensterservice", highlight: true },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/karriere", label: "Karriere" },
  { href: "/kontakt", label: "Kontakt" },
];

const dropdownLinks = [
  {
    href: "/fenster",
    label: "Fenster",
    description: "Moderne und energieeffiziente Fensterlösungen.",
    icon: Building,
  },
  {
    href: "/tueren",
    label: "Türen",
    description: "Sichere und stilvolle Eingangs- und Innentüren.",
    icon: DoorOpen,
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Topbar */}
      <div className="bg-zinc-100 dark:bg-zinc-900 text-sm border-b border-black/5 dark:border-white/5">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-12 px-4">
          <div className="flex gap-6">
            <a
              href="tel:+4917666825889"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">+49 176 668 25 889</span>
            </a>
            <a
              href="mailto:aergart@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={16} />
              <span className="hidden sm:inline">aergart@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@alexanderergart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center justify-center shrink-0"
            >
              <Image
                src="/bilder_ordner/icons/tiktok.webp"
                alt="TikTok Icon"
                width={20}
                height={20}
                className="w-5 h-5 object-contain dark:invert opacity-60 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </a>
            <ThemeToggleButton />
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-top">
        <div className="container flex h-24 max-w-7xl mx-auto items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/bilder_ordner/AE_logo.svg"
              alt="Logo"
              width={135}
              height={100}
              className="w-16 md:w-20 lg:w-24 h-auto transition-all"
              priority
              unoptimized
            />
            <div className="hidden lg:block">
              <span className="font-bold text-xl">Alexander Ergart</span>
              <p className="text-sm text-muted-foreground">
                Ihr Profi in Neuss
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden nav-desktop:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          link.highlight && "text-brand-blue font-semibold"
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Dropdown: Fenster & Türen */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "relative font-medium",
                      "hover:bg-muted hover:text-foreground",
                      "data-[state=open]:bg-muted data-[state=open]:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/70"
                    )}
                  >
                    Fenster &amp; Türen
                  </NavigationMenuTrigger>

                  {/* --- POPUP: maximaler Kontrast, kein „Durchscheinen“ --- */}
                  <NavigationMenuContent
                    className={cn(
                      "relative isolate z-50 rounded-xl p-0",
                      // Solider Grundhintergrund => garantiert lesbar
                      "bg-brand-blue text-white",
                      // Tiefe/Kanten
                      "ring-1 ring-border/70 shadow-2xl drop-shadow-xl overflow-hidden"
                    )}
                  >
                    {/* optionaler Kopf für Klarheit */}
                    <div className="px-4 py-3 border-b border-white/20 bg-white/10">
                      <p className="text-xs font-medium uppercase tracking-wide text-white/90">
                        Kategorien
                      </p>
                    </div>

                    <ul className="grid w-[420px] gap-1 p-2 md:w-[560px] md:grid-cols-2 lg:w-[660px]">
                      {dropdownLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <ListItem
                            key={item.href}
                            href={item.href}
                            title={item.label}
                            description={item.description}
                            icon={
                              <Icon
                                size={20}
                                className="text-white"
                                aria-hidden
                              />
                            }
                          />
                        );
                      })}
                    </ul>

                    {/* optionaler Footer-Link */}
                    <div className="px-4 py-3 border-t border-white/20 bg-white/10">
                      <Link
                        href="/leistungen"
                        className="text-sm font-medium hover:underline text-white"
                      >
                        Alle Leistungen ansehen
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <button
            className="nav-desktop:hidden z-50"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 nav-desktop:hidden bg-background/95 backdrop-blur-lg safe-top"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full"
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.12 },
                },
              }}
            >
              {[...navLinks, ...dropdownLinks].map((link) => (
                <motion.div
                  key={link.href ?? link.label}
                  variants={{
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href ?? "#"}
                    className="block py-4 text-2xl font-semibold text-center text-foreground hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/70 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="absolute bottom-16 flex gap-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <a
                  href="tel:+4917666825889"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Phone size={28} />
                </a>
                <a
                  href="mailto:aergart@gmail.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Mail size={28} />
                </a>
                <a
                  href={SITE_LINKS.external.whatsappChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Per WhatsApp schreiben"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle size={28} className="text-emerald-500" />
                </a>
                <a
                  href="https://www.tiktok.com/@alexanderergart"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/bilder_ordner/icons/tiktok.webp"
                    alt="TikTok Icon"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain dark:invert"
                    unoptimized
                  />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =================================
   Dropdown-ListItem: neu & kontraststark
================================= */
type ListItemProps = {
  href: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ href, title, description, icon, className }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            aria-label={title}
            className={cn(
              "group flex items-start gap-3 rounded-lg px-4 py-3",
              // Fundament: klarer Kontrast auf beiden Themes
              "bg-transparent text-white",
              // Hover: spürbar, aber nicht „brüllend“
              "hover:bg-white/10 focus:bg-white/10",
              // Zusätzliche visuelle Führung
              "ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              // feine Trennung bei dichtem Inhalt
              "transition-colors",
              className
            )}
          >
            {icon && (
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center">
                {icon}
              </span>
            )}
            <span className="flex-1">
              <span className="block text-sm font-semibold leading-tight">
                {title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-white/80">
                {description}
              </span>
            </span>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

/* =================================
   Trigger-Style (leicht angepasst)
================================= */
const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-10 w-max items-center justify-center rounded-md",
    "bg-background px-4 py-2 text-sm font-medium",
    "transition-colors",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/70",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:bg-muted data-[state=open]:bg-muted",
    "relative after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]",
    "after:bg-brand-blue after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
    "hover:after:scale-x-100 data-[state=open]:after:scale-x-100",
  ].join(" ")
);
