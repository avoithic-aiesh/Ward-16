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
  { key: "home", label: "Home", labelNepali: "गृहपृष्ठ", href: "/" },
  {
    key: "heritage",
    label: "Heritage",
    labelNepali: "सम्पदा",
    href: "/explore-map",
    hasDropdown: true,
    children: [
      { key: "22Dhara", label: "22 Dhara (Balaju Baisdhara)", labelNepali: "२२ धारा (बालाजु बाइसधारा)", href: "/heritage/22-dhara" },
      { key: "pyathoAjima", label: "Pyatho Ajima Temple", labelNepali: "प्याठो अजिमा मन्दिर", href: "/heritage/pyatho-ajima" },
    ],
  },
  { key: "map", label: "Map", labelNepali: "नक्सा", href: "/explore-map" },
  { key: "stories", label: "Stories", labelNepali: "कथा संस्मरण", href: "/community-archive" },
  { key: "gallery", label: "Gallery", labelNepali: "तस्बिरहरू", href: "/heritage/22-dhara#gallery" },
  { key: "about", label: "About", labelNepali: "हाम्रो वडा", href: "/ward" },
];

export default function Navbar() {
  return <NavbarShell links={NAV_LINKS} />;
}
