"use client";

/**
 * src/components/layout/NavbarShell.js
 *
 * Client Component — the actual navigation bar rendering.
 *
 * WHY "use client"?
 * The navbar needs to react to scroll position:
 *   - At top of page  → transparent / very subtle background
 *   - After scrolling → opaque ivory with shadow
 * This requires window.scrollY, which only works in the browser.
 *
 * We keep this as a Client Component and import it from the
 * Server Component Navbar.js so the architecture stays clean.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NavbarShell({ links }) {
  const { t } = useLanguage();
  /*
    scrolled = true when the user has scrolled more than 20px.
    We use this to swap from a transparent hero overlay to
    a solid ivory navbar.
  */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial state (page might already be scrolled on mount)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ---- Accessibility: Skip Navigation ---- */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                   focus:px-4 focus:py-2 focus:bg-gold focus:text-charcoal focus:rounded-sm
                   focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* ---- Main Navigation Bar ---- */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 w-full
          transition-all duration-300
          ${scrolled
            ? "bg-ivory/98 backdrop-blur-md border-b border-beige shadow-sm"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center justify-between gap-6">

            {/* ---- Logo / Brand ---- */}
            <Link
              href="/"
              className="flex flex-col leading-none group shrink-0"
              aria-label="Ward 16 Digital Heritage — go to homepage"
            >
              {/* Eyebrow */}
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-body font-medium
                            transition-colors duration-300
                            ${scrolled ? "text-gold" : "text-gold"}`}
              >
                Kathmandu · Ward 16
              </span>
              {/* Primary wordmark */}
              <span
                className={`font-display text-xl font-semibold transition-colors duration-300
                            group-hover:text-burgundy
                            ${scrolled ? "text-charcoal" : "text-ivory"}`}
              >
                Digital Heritage
              </span>
            </Link>

            {/* ---- Desktop Links ---- */}
            <ul
              className="hidden lg:flex items-center gap-0.5"
              role="list"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-body rounded-sm
                                transition-colors duration-150
                                hover:text-burgundy hover:bg-burgundy/5
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                                ${scrolled
                                  ? "text-charcoal-soft"
                                  : "text-ivory/90 hover:text-ivory hover:bg-white/10"
                                }`}
                  >
                    {link.key ? t(`nav.${link.key}`, link.label) : link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ---- Right side: Language selector + Mobile Menu ---- */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Reusable Bilingual Language Switcher */}
              <LanguageSwitcher scrolled={scrolled} className="hidden sm:flex" />

              {/* Mobile hamburger — only visible below lg breakpoint */}
              <div className="lg:hidden">
                <MobileMenu links={links} scrolled={scrolled} />
              </div>
            </div>
          </div>
        </nav>

        {/* Thin gold accent line — only visible when scrolled (subtle) */}
        {scrolled && (
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        )}
      </header>
    </>
  );
}
