/**
 * src/app/culture/page.js
 *
 * "Culture & Traditions" dedicated page for Ward 16.
 */

import CulturePageClient from "@/components/culture/CulturePageClient";

export const metadata = {
  title: "Culture & Living Traditions | Ward 16 Digital Heritage",
  description:
    "Explore the living intangible cultural heritage of Ward 16, Kathmandu — including Guthi institutions, sacred Dafa hymns, water stewardship, and annual festivals.",
  openGraph: {
    title: "Culture & Living Traditions | Ward 16 Digital Heritage",
    description: "Living traditions, Guthi kinship, sacred Dafa hymns, and annual festivals in Ward 16, Kathmandu.",
    url: "/culture",
    siteName: "Ward 16 Digital Heritage",
    type: "website",
  },
};

export default function CulturePage() {
  return <CulturePageClient />;
}
