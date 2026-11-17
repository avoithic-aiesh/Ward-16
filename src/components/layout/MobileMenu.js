"use client";

/**
 * src/components/layout/MobileMenu.js
 *
 * Mobile hamburger menu with a slide-down drawer.
 * Updated in Module 2 to accept a `scrolled` prop so the
 * hamburger icon colour adapts to the navbar background state
 * (white icon on transparent hero, charcoal icon on ivory navbar).
 */

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export default function MobileMenu({ links, scrolled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu  = () => setIsOpen(false);

  /* Icon colour adapts to scroll state and open state */
  const iconColor = isOpen || scrolled ? "text-charcoal" : "text-ivory";

  return (
    <div className="relative">

      {/* ---- Hamburger / Close Button ---- */}
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`p-2 rounded-sm transition-colors duration-150
                   hover:bg-white/10
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                   ${iconColor}`}
      >
        {/* Animated icon: 3 bars → X */}
        <span className="flex flex-col gap-1.5 w-5">
          <span
            className={`block h-px bg-current transition-all duration-300 origin-center
                       ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
          />
          <span
            className={`block h-px bg-current transition-all duration-300
                       ${isOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block h-px bg-current transition-all duration-300 origin-center
                       ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
          />
        </span>
      </button>

      {/* ---- Drawer — fixed below the header ---- */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed top-16 left-0 right-0 bg-ivory border-b border-beige shadow-elevated z-50"
        >
          <ul className="flex flex-col py-2 px-4" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-3.5 text-base font-body text-charcoal
                             border-b border-beige/60 last:border-0
                             hover:text-burgundy hover:pl-2
                             transition-all duration-150"
                >
                  {link.key ? t(`nav.${link.key}`, link.label) : link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language selector inside mobile menu */}
          <div className="px-4 py-4 border-t border-beige">
            <p className="text-xs text-charcoal-soft font-body mb-2 uppercase tracking-widest">
              {t('nav.language', 'Language')}
            </p>
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      )}
    </div>
  );
}
