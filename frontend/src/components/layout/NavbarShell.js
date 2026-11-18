"use client";

/**
 * frontend/src/components/layout/NavbarShell.js
 *
 * Header navigation component modeled directly after the user's homepage design:
 * - Traditional Pagoda Temple Logo icon with 3-tier Newari architecture
 * - Multi-line brand wordmark ("Ward 16", "Digital Heritage", "Kathmandu Metropolitan City")
 * - Navigation pills ("Home" active rounded pill, "Heritage ▾" dropdown, Map, Stories, Gallery, About)
 * - Globe icon language selector ("EN | नेपाली")
 * - Rounded burgundy CTA button ("Explore Ward 16 →")
 * - Traditional decorative Newari patterned bottom border ribbon
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import PagodaLogo from "@/components/ui/PagodaLogo";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NavbarShell({ links }) {
  const { isNepali, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [heritageDropdownOpen, setHeritageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHeritageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Skip Navigation for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                   focus:px-4 focus:py-2 focus:bg-gold focus:text-charcoal focus:rounded-sm
                   focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF6EF] shadow-xs">
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-20 items-center justify-between gap-4">

            {/* ---- Left: Pagoda Temple Logo & Brand ---- */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Ward 16 Digital Heritage — Homepage"
            >
              <div className="relative">
                <PagodaLogo className="w-11 h-11 text-burgundy transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl sm:text-2xl font-bold text-charcoal tracking-tight group-hover:text-burgundy transition-colors">
                  {isNepali ? "वडा १६" : "Ward 16"}
                </span>
                <span className="font-display text-lg sm:text-xl font-semibold text-charcoal -mt-0.5">
                  {isNepali ? "डिजिटल सम्पदा" : "Digital Heritage"}
                </span>
                <span className="text-[10.5px] text-burgundy-light font-medium tracking-wide">
                  {isNepali ? "काठमाडौँ महानगरपालिका" : "Kathmandu Metropolitan City"}
                </span>
              </div>
            </Link>

            {/* ---- Center: Navigation Links ---- */}
            <ul className="hidden xl:flex items-center gap-1.5" role="list">
              {links.map((link) => {
                const isActive = pathname === link.href;

                // Heritage Dropdown Link
                if (link.hasDropdown) {
                  return (
                    <li key={link.key} className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setHeritageDropdownOpen((prev) => !prev)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-body font-medium rounded-full transition-colors ${
                          pathname.startsWith("/heritage")
                            ? "bg-burgundy text-white shadow-xs"
                            : "text-charcoal-soft hover:text-burgundy hover:bg-beige/40"
                        }`}
                        aria-expanded={heritageDropdownOpen}
                      >
                        <span>{isNepali ? (link.labelNepali || link.label) : link.label}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            heritageDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {heritageDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-ivory border border-beige/80 rounded-sm shadow-card py-2 z-50 animate-fade-in">
                          {link.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setHeritageDropdownOpen(false)}
                              className={`block px-4 py-2.5 text-xs sm:text-sm font-body transition-colors ${
                                pathname === child.href
                                  ? "bg-burgundy/10 text-burgundy font-semibold"
                                  : "text-charcoal hover:bg-beige/30 hover:text-burgundy"
                              }`}
                            >
                              {isNepali ? (child.labelNepali || child.label) : child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                // Standard Nav Links
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`inline-block px-4 py-1.5 text-sm font-body font-medium rounded-full transition-colors ${
                        isActive
                          ? "bg-burgundy text-white shadow-xs"
                          : "text-charcoal-soft hover:text-burgundy hover:bg-beige/40"
                      }`}
                    >
                      {isNepali ? (link.labelNepali || link.label) : link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ---- Right: Language Toggle & CTA Button ---- */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Globe Icon + Bilingual Language Switcher */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-charcoal-soft font-medium">
                <svg
                  className="w-4 h-4 text-charcoal/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="1.75" />
                  <path strokeWidth="1.75" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <div className="inline-flex items-center gap-1 font-mono">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`transition-colors ${language === "en" ? "font-bold text-burgundy" : "text-charcoal/60 hover:text-charcoal"}`}
                  >
                    EN
                  </button>
                  <span className="text-gold/60">|</span>
                  <button
                    type="button"
                    onClick={() => setLanguage("ne")}
                    className={`font-serif transition-colors ${language === "ne" ? "font-bold text-burgundy" : "text-charcoal/60 hover:text-charcoal"}`}
                  >
                    नेपाली
                  </button>
                </div>
              </div>

              {/* Red Pill CTA Button: "Explore Ward 16 →" */}
              <Link
                href="/explore-map"
                className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-burgundy hover:bg-burgundy-light text-white font-body font-medium text-xs sm:text-sm rounded-full transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <span>{isNepali ? "वडा १६ अन्वेषण गर्नुहोस्" : "Explore Ward 16"}</span>
                <span>→</span>
              </Link>

              {/* Mobile Drawer Hamburger */}
              <div className="xl:hidden">
                <MobileMenu links={links} scrolled={true} />
              </div>
            </div>

          </div>
        </nav>

        {/* Decorative Traditional Newari Patterned Ribbon Border */}
        <div
          className="h-2 w-full border-t border-b border-[#E3D7C5]"
          style={{
            backgroundImage: `
              radial-gradient(circle, #702C38 1.2px, transparent 1.2px),
              radial-gradient(circle, #B89555 1.2px, transparent 1.2px)
            `,
            backgroundSize: "16px 8px",
            backgroundPosition: "0 0, 8px 4px",
            backgroundColor: "#F4EBDC",
          }}
          aria-hidden="true"
        />
      </header>
    </>
  );
}
