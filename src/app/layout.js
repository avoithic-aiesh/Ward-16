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

import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

/* ----------------------------------------------------------
   FONTS
   Cormorant Garamond → display/headings (heritage elegance)
   Inter             → body text        (legibility at scale)

   Next.js self-hosts these at build time — no request to
   Google's servers is made in production.

   The `fallback` option defines safe system fonts shown while
   the web font loads, or if the network is unavailable.
   ---------------------------------------------------------- */

const cormorant = Cormorant_Garamond({
  // CSS variable so Tailwind and CSS can reference it
  variable: "--font-cormorant",
  subsets: ["latin"],
  // Include italic and regular weights for typographic richness
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  // display=swap means text shows in fallback font while loading
  display: "swap",
  // System serif fallbacks — the layout won't break if font fails
  fallback: ["Georgia", "Times New Roman", "serif"],
  // Don't preload aggressively — reduces initial page load
  preload: true,
  adjustFontFallback: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: false,
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
      className={`${cormorant.variable} ${inter.variable} h-full`}
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
