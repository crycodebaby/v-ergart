// src/components/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { Menu, X, Mail, Phone, Building, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "./ThemeToggleButton";
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
            >
              <Image
                src="/bilder_ordner/icons/tiktok.webp"
                alt="TikTok Icon"
                width={20}
                height={20}
                className="dark:invert opacity-60 hover:opacity-100 transition-opacity"
              />
            </a>
            <ThemeToggleButton />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-24 max-w-7xl mx-auto items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/bilder_ordner/logo/ergart-hausmeister-logo.webp"
              alt="Logo"
              width={90}
              height={68}
              priority
            />
            <div className="hidden lg:block">
              <span className="font-bold text-xl">Alexander Ergart</span>
              <p className="text-sm text-muted-foreground">
                Ihr Profi in Neuss
              </p>
            </div>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Fenster & Türen</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {dropdownLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <ListItem
                            key={item.label}
                            href={item.href}
                            title={item.label}
                          >
                            <Icon size={20} className="mr-2 text-brand-blue" />{" "}
                            {item.description}
                          </ListItem>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <button
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full"
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
            >
              {[...navLinks, ...dropdownLinks].map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 text-2xl font-semibold text-center text-foreground hover:text-brand-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="absolute bottom-16 flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
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
                  href="https://www.tiktok.com/@alexanderergart"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <Image
                    src="/bilder_ordner/icons/tiktok.webp"
                    alt="TikTok Icon"
                    width={28}
                    height={28}
                    className="dark:invert"
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

// ==================================================================
// KORREKTUR: Die Helfer-Komponente ist jetzt wieder vollständig
// ==================================================================
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex select-none items-center rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground flex items-center mt-1">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-brand-blue after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100'
);
