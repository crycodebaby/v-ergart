// src/components/Navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLinkItem = { href: string; label: string; isDropdown?: false };
type DropdownLinkItem = {
  label: string;
  isDropdown: true;
  subLinks: { href: string; label: string }[];
};
type NavLink = NavLinkItem | DropdownLinkItem;

const navLinks: NavLink[] = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  {
    label: "Fenster & Türen",
    isDropdown: true,
    subLinks: [
      { href: "/fenster", label: "Fenster" },
      { href: "/tueren", label: "Türen" },
    ],
  },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/kontakt", label: "Kontakt" },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          {/* Desktop-Menü (zentriert) */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) =>
              !link.isDropdown ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    pathname === link.href
                      ? "bg-muted text-foreground"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <div key={link.label} className="relative">
                  <Dropdown label={link.label} items={link.subLinks} />
                </div>
              )
            )}
          </div>

          {/* Mobile Menü Button (links) */}
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Hauptmenü umschalten"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobiles Slide-Out Menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-border/60 bg-background"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) =>
                !link.isDropdown ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-muted text-foreground"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div
                    key={link.label}
                    className="rounded-lg border border-border/60"
                  >
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">
                      {link.label}
                    </div>
                    <div className="py-1">
                      {link.subLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block w-full text-left px-4 py-2 text-sm text-foreground/90 hover:bg-muted"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

/* ------------------------------
   Dropdown (Desktop)
------------------------------ */
function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          "text-foreground/80 hover:text-foreground hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "bg-muted text-foreground"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {/* Panel: SOLID, kein Transparenz-Ghosting */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              role="menu"
              className={cn(
                "overflow-hidden rounded-xl",
                "bg-background text-foreground",
                "ring-1 ring-border/70 shadow-2xl"
              )}
            >
              <div className="py-1">
                {items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    role="menuitem"
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm",
                      "text-foreground hover:bg-muted focus:bg-muted",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
