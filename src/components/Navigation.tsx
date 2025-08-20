// src/components/Navigation.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ... (Typ-Definitionen und navLinks-Array bleiben unverändert) ...
type NavLinkItem = { href: string; label: string; isDropdown?: false; };
type DropdownLinkItem = { label: string; isDropdown: true; subLinks: { href: string; label: string }[]; };
type NavLink = NavLinkItem | DropdownLinkItem;

const navLinks: NavLink[] = [
    { href: '/', label: 'Startseite' },
    { href: '/leistungen', label: 'Leistungen' },
    {
        label: 'Fenster & Türen', isDropdown: true,
        subLinks: [{ href: '/fenster', label: 'Fenster' }, { href: '/tueren', label: 'Türen' }],
    },
    { href: '/referenzen', label: 'Referenzen' },
    { href: '/ueber-uns', label: 'Über Uns' },
    { href: '/kontakt', label: 'Kontakt' },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-800 dark:bg-black/50 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative"> {/* HIER wird zentriert */}
          
          {/* Desktop-Menü (im Zentrum) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              !link.isDropdown ? (
                <Link key={link.label} href={link.href} className={cn("px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200", pathname === link.href ? 'bg-accent-green text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white')}>
                  {link.label}
                </Link>
              ) : (
                <div key={link.label} className="relative group">
                  <div className="py-5 -my-5">
                    <button className="flex items-center gap-1 text-gray-300 group-hover:text-white transition-colors duration-200 focus:outline-none">
                      {link.label}
                      <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="py-1">
                      {link.subLinks.map((subLink) => (
                        <Link key={subLink.href} href={subLink.href} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700">
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Mobile Menü Button (am linken Rand für mobile Ansicht) */}
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-700 focus:outline-none"
              aria-label="Hauptmenü öffnen"
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-zinc-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* ... (Mobiler Menü-Code bleibt gleich) ... */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;