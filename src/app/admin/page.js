/**
 * src/app/admin/page.js
 *
 * Module 10: Administrative Content Management System (CMS) Portal.
 *
 * Provides authorized administrators, editors, and reviewers with access to:
 * - Heritage content and metadata
 * - GPS coordinate field verification
 * - Community submission moderation pipeline
 * - AI knowledge base ingestion
 * - Storage asset management
 */

import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Administrative CMS & Moderation | Ward 16 Digital Heritage",
  description:
    "Secure administrative content management system and community moderation portal for Ward No. 16, Kathmandu Metropolitan City.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
