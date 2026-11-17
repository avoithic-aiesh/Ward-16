/**
 * src/components/layout/Navbar.js
 *
 * Site-wide navigation bar — updated for Module 2.
 *
 * Changes from Module 1:
 * - New navigation link set per Module 2 spec
 * - Language selector (नेपाली / EN) — UI-only placeholder for future bilingual support
 * - Transparent → opaque scroll behaviour delegated to NavbarShell (Client Component)
 *
 * Architecture:
 * - NavbarShell (Client) — handles scroll state, renders everything
 * - MobileMenu (Client)  — handles open/close drawer
 * - This file exports a thin Server wrapper that simply renders NavbarShell
 */

import NavbarShell from "./NavbarShell";

/* ----------------------------------------------------------
   Navigation link definitions.
   Future module pages don't exist yet — those hrefs are
   clearly commented as placeholders and will be updated
   when the corresponding pages are built.
   ---------------------------------------------------------- */
export const NAV_LINKS = [
  { key: "home",            label: "Home",                href: "/" },
  { key: "exploreHeritage", label: "Explore Heritage",    href: "/explore-map" },     // Module 3: Interactive Map
  { key: "ourWard",         label: "Our Ward",            href: "/ward" },            // Future module — placeholder
  { key: "culture",         label: "Culture & Traditions",href: "/culture" },         // Future module — placeholder
  { key: "stories",         label: "Stories",             href: "/community-archive" }, // Module 9: Community Archive
];

export default function Navbar() {
  return <NavbarShell links={NAV_LINKS} />;
}
