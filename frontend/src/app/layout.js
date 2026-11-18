/**
 * src/app/layout.js  — Root Layout
 *
 * This is the top-level shell that wraps every page on the site.
 * It loads fonts, sets site-wide metadata, and renders the
 * shared <Navbar> and <Footer> around page content.
 *
 * Next.js App Router rule: the root layout MUST include <html>
 * and <body> tags — no other component does this.
 */

import { Yatra_One, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

/* ----------------------------------------------------------
   FONTS
   Yatra One            → display/headings (Devanagari-native display)
   Noto Sans            → body text (high-legibility Latin & multi-script)
   Noto Sans Devanagari → body text (optimized native Devanagari typography)

   Next.js self-hosts these at build time — no request to
   Google's servers is made in production.
   ---------------------------------------------------------- */

const yatraOne = Yatra_One({
  variable: "--font-yatra",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["Georgia", "serif"],
  preload: true,
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  preload: true,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  preload: true,
});

/* ----------------------------------------------------------
   METADATA
   Next.js reads this export and injects it into <head>.
   Each page can override or extend these defaults.
   ---------------------------------------------------------- */
export const metadata = {
  title: {
    // "Ward 16 — Specific Page" pattern for all inner pages
    template: "%s — Ward 16 Digital Heritage",
    // Fallback for the root route
    default: "Ward 16 Digital Heritage | Kathmandu Metropolitan City",
  },
  description:
    "Discover the living heritage of Ward No. 16, Kathmandu — including 22 Dhara (Balaju Baisdhara) and Pyatho Ajima Temple. Explore history, architecture, and culture.",
  keywords: [
    "Ward 16",
    "Kathmandu",
    "heritage",
    "22 Dhara",
    "Balaju Baisdhara",
    "Pyatho Ajima",
    "Nepal culture",
    "digital museum",
  ],
  authors: [{ name: "Ward 16 Community Heritage Project" }],
  // Open Graph (social sharing previews)
  openGraph: {
    type: "website",
    locale: "en_NP",
    siteName: "Ward 16 Digital Heritage",
  },
};

/* ----------------------------------------------------------
   ROOT LAYOUT COMPONENT
   ---------------------------------------------------------- */
export default function RootLayout({ children }) {
  return (
    /*
      lang="en" — primary language is English.
      "ne" (Nepali) can be added per-page when bilingual
      support is introduced in a future module.
    */
    <html
      lang="en"
      className={`${yatraOne.variable} ${notoSans.variable} ${notoSansDevanagari.variable} h-full`}
    >
      {/*
        min-h-full + flex-col ensures the footer sticks to the
        bottom even on short pages (no empty white space below).
      */}
      <body className="min-h-full flex flex-col bg-ivory text-charcoal antialiased">
        {/* Skip to Main Content Link for Accessibility (WCAG 2.2 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-gold focus:text-charcoal focus:font-semibold focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-charcoal"
        >
          Skip to main content / मुख्य सामग्रीमा जानुहोस्
        </a>

        <LanguageProvider>
          {/* Shared navigation — appears on every page */}
          <Navbar />

          {/*
            <main> is the page content slot.
            flex-1 makes it grow and push the footer down.
            The id allows screen-reader skip-link to jump here.
          */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Shared footer — appears on every page */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
