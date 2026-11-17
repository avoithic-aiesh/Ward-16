/**
 * src/app/explore-map/page.js
 *
 * Module 3: Interactive Ward 16 Heritage Map.
 *
 * This server component defines route metadata and renders the client-side
 * interactive map shell.
 */

import MapPageClient from "@/components/map/MapPageClient";

export const metadata = {
  title: "Interactive Heritage Map | Ward 16 Digital Heritage",
  description:
    "Explore historic landmarks, temples, and water heritage across Ward No. 16, Kathmandu Metropolitan City through our interactive digital atlas.",
};

export default function ExploreMapPage() {
  return <MapPageClient />;
}
