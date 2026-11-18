'use client';

/**
 * src/components/layout/Footer.js
 *
 * Site-wide footer with full bilingual (EN/NE) support.
 */

import Link from "next/link";
import FooterBackToTop from "./FooterBackToTop";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, dict, isNepali } = useLanguage();

  const footerNav = [
    {
      heading: t("footer.exploreCol", "Explore"),
      links: [
        { label: t("nav.home", "Home"), href: "/" },
        { label: t("nav.exploreHeritage", "Explore Heritage"), href: "/explore-map" },
        { label: t("nav.ourWard", "Our Ward"), href: "/ward" },
        { label: t("nav.culture", "Culture & Traditions"), href: "/culture" },
        { label: t("nav.stories", "Stories"), href: "/community-archive" },
      ],
    },
    {
      heading: t("footer.heritageSitesCol", "Heritage Sites"),
      links: [
        {
          label: isNepali ? "२२ धारा (बालाजु बाइसधारा)" : "22 Dhara (Balaju Baisdhara)",
          href: "/heritage/22-dhara",
        },
        {
          label: isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple",
          href: "/heritage/pyatho-ajima",
        },
        {
          label: isNepali ? "सबै सम्पदा स्थलहरू" : "All Heritage Sites",
          href: "/explore-map",
        },
      ],
    },
  ];

  return (
    <footer className="bg-charcoal text-ivory/80" aria-label="Site footer">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* ---- Brand Column (wider) ---- */}
          <div className="lg:col-span-2">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
              {t("common.municipality", "Kathmandu Metropolitan City")}
            </span>
            <Link
              href="/"
              className="inline-block font-display text-2xl font-semibold text-ivory hover:text-gold transition-colors duration-200"
              aria-label="Ward 16 Digital Heritage home"
            >
              {t("common.siteTitle", "Ward 16 Digital Heritage")}
            </Link>
            <p className="mt-4 text-sm font-body text-ivory/55 max-w-sm leading-relaxed">
              {t(
                "footer.brandDescription",
                "A community-led digital heritage initiative documenting the history, monuments, sacred spaces, and living cultural traditions of Ward No. 16, Kathmandu Metropolitan City."
              )}
            </p>

            {/* Location block */}
            <address className="mt-6 not-italic text-xs font-body text-ivory/35 space-y-0.5">
              <p>{isNepali ? "वडा नं. १६" : "Ward No. 16"}</p>
              <p>{t("common.municipality", "Kathmandu Metropolitan City")}</p>
              <p>{isNepali ? "नेपाल" : "Nepal"}</p>
            </address>

            <div className="mt-6 w-10 h-px bg-gold/40" />
          </div>

          {/* ---- Link Columns ---- */}
          {footerNav.map((section) => (
            <div key={section.heading} className="lg:col-span-1">
              <h3 className="text-xs uppercase tracking-[0.15em] text-gold font-body font-semibold mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body text-ivory/55 hover:text-gold transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ---- Project Info Column ---- */}
          <div className="lg:col-span-1">
            <h3 className="text-xs uppercase tracking-[0.15em] text-gold font-body font-semibold mb-4">
              {t("footer.wardInfoCol", "Ward Information")}
            </h3>
            <p className="text-sm font-body text-ivory/55 leading-relaxed">
              {t(
                "footer.rights",
                "All documented cultural heritage content preserved for civic and educational use."
              )}
            </p>
            <p className="mt-4 text-xs font-body text-ivory/35 leading-relaxed">
              {t(
                "footer.credits",
                "Built with respect for Kathmandu's living heritage."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <p className="text-xs text-ivory/35 font-body">
              © {currentYear} {t("footer.copyright", "Ward 16 Digital Heritage. Kathmandu Metropolitan City.")}
            </p>
            <span className="text-ivory/20">·</span>
            <Link
              href="/admin"
              className="text-xs text-ivory/35 hover:text-gold font-body transition-colors"
            >
              {isNepali ? "प्रशासनिक सीएमएस" : "Staff CMS"}
            </Link>
          </div>

          {/* Back to top — Client Component for smooth scroll */}
          <FooterBackToTop />
        </div>
      </div>
    </footer>
  );
}
