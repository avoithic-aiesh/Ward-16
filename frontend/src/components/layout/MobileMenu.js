"use client";

/**
 * frontend/src/components/layout/MobileMenu.js
 *
 * Mobile hamburger menu with a slide-down drawer supporting dropdowns.
 */

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export default function MobileMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isNepali } = useLanguage();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu  = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* ---- Hamburger / Close Button ---- */}
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="p-2 rounded-full transition-colors text-charcoal hover:bg-beige/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <span className="flex flex-col gap-1.5 w-5">
          <span
            className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </span>
      </button>

      {/* ---- Drawer ---- */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed top-22 left-0 right-0 bg-[#FAF6EF] border-b border-beige shadow-elevated z-50 max-h-[85vh] overflow-y-auto animate-fade-in"
        >
          <ul className="flex flex-col py-3 px-5 divide-y divide-beige/70" role="list">
            {links.map((link) => (
              <li key={link.key || link.href} className="py-2.5">
                {link.hasDropdown ? (
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-mono tracking-widest text-burgundy font-semibold">
                      {isNepali ? (link.labelNepali || link.label) : link.label}
                    </span>
                    <div className="pl-3 border-l-2 border-gold/40 space-y-2 pt-1">
                      {link.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className="block text-sm font-body text-charcoal hover:text-burgundy py-1"
                        >
                          {isNepali ? (child.labelNepali || child.label) : child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-base font-body text-charcoal hover:text-burgundy font-medium py-1"
                  >
                    {isNepali ? (link.labelNepali || link.label) : link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Quick CTA & Language */}
          <div className="p-5 border-t border-beige/80 bg-beige/20 space-y-4">
            <Link
              href="/explore-map"
              onClick={closeMenu}
              className="w-full py-2.5 px-4 bg-burgundy text-white font-body font-medium text-center rounded-full text-sm block"
            >
              {isNepali ? "वडा १६ अन्वेषण गर्नुहोस् →" : "Explore Ward 16 →"}
            </Link>

            <div>
              <p className="text-xs text-charcoal-soft font-body mb-2 uppercase tracking-widest">
                {isNepali ? "भाषा छनोट" : "Select Language"}
              </p>
              <LanguageSwitcher variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
