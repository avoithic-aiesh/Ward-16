/**
 * src/app/page.js — Homepage
 *
 * Module 2: Full homepage implementation.
 *
 * This file is intentionally simple — it only imports and
 * assembles the section components built in /components/home/.
 * All design and content logic lives in those components.
 *
 * Section order:
 *   1. HeroSection        — cinematic full-viewport hero
 *   2. WardIntroduction   — editorial two-column intro
 *   3. FeaturedHeritage   — 22 Dhara + Pyatho Ajima cards
 *   4. CulturalHighlights — four cultural category tiles
 *   5. ExploreCTA         — closing call-to-action
 *
 * The <Navbar> and <Footer> are rendered by the Root Layout
 * (src/app/layout.js) — not here.
 *
 * NOTE: The Module 1 design system showcase section has been
 * removed as planned.
 */

import HeroSection from "@/components/home/HeroSection";
import WardIntroduction from "@/components/home/WardIntroduction";
import FeaturedHeritage from "@/components/home/FeaturedHeritage";
import CulturalHighlights from "@/components/home/CulturalHighlights";
import ExploreCTA from "@/components/home/ExploreCTA";

/* Page-level metadata — overrides the layout.js defaults */
export const metadata = {
  title: "Ward 16 Digital Heritage | Kathmandu Metropolitan City",
  description:
    "Discover the living heritage of Ward No. 16, Kathmandu — including 22 Dhara (Balaju Baisdhara) and Pyatho Ajima Temple. Explore history, architecture and community traditions.",
};

export default function HomePage() {
  return (
    <>
      {/*
        The hero is full-viewport and sits behind the transparent fixed navbar.
        No top padding needed here — the navbar overlays the hero image.
      */}
      <HeroSection />

      {/* Editorial introduction to Ward 16 */}
      <WardIntroduction />

      {/* Two featured heritage landmark cards */}
      <FeaturedHeritage />

      {/* Four cultural category tiles */}
      <CulturalHighlights />

      {/* Closing call-to-action */}
      <ExploreCTA />
    </>
  );
}
