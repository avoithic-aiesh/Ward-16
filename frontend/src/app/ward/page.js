/**
 * src/app/ward/page.js
 *
 * "Our Ward" page for Kathmandu Metropolitan City Ward No. 16.
 */

import WardPageClient from "@/components/ward/WardPageClient";

export const metadata = {
  title: "Our Ward — Ward No. 16 | Kathmandu Metropolitan City",
  description:
    "Explore the history, geography, neighborhoods, and civic heritage of Ward No. 16, Kathmandu Metropolitan City, Nepal.",
  openGraph: {
    title: "Our Ward — Ward No. 16 | Kathmandu Metropolitan City",
    description: "Discover the geography, neighborhoods, and civic heritage of Ward 16, Kathmandu.",
    url: "/ward",
    siteName: "Ward 16 Digital Heritage",
    type: "website",
  },
};

export default function WardPage() {
  return <WardPageClient />;
}
