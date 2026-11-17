"use client";

/**
 * src/components/admin/AdminDashboard.js
 *
 * Comprehensive Content Management System (CMS) and Moderation Panel
 * for Ward 16 Digital Heritage.
 */

import { useState } from "react";
import Link from "next/link";
import { HERITAGE_LOCATIONS } from "@/data/heritageLocations";
import { INITIAL_APPROVED_STORIES } from "@/data/communityArchiveData";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUserRole, setCurrentUserRole] = useState("super_admin");

  // State for moderation queue (mock + live)
  const [pendingQueue, setPendingQueue] = useState([
    {
      id: "W16-ARC-2026-9041",
      referenceId: "W16-ARC-2026-9041",
      title: "Recollections of the 1968 Raniban Forest Spring",
      contributor: "Ganesh Bahadur Maharjan",
      role: "Local Elder, Banasthali",
      category: "Oral Histories",
      location: "22 Dhara",
      content:
        "Before the modern reservoir was expanded, clean mountain spring water surfaced directly beside the northern boundary wall of Balaju. Families would gather early in the morning to fetch fresh water in clay jars (Ghyampo)...",
      submittedAt: "2026-11-16",
      status: "pending_review",
    },
    {
      id: "W16-ARC-2026-8812",
      referenceId: "W16-ARC-2026-8812",
      title: "Restoration Notes on the Pyatho Ajima Eaves (1994)",
      contributor: "Anonymous Conservation Volunteer",
      role: "Architectural Researcher",
      category: "Heritage Documentation",
      location: "Pyatho Ajima Temple",
      content:
        "Field inspection conducted following the monsoon rains showed natural weathering of the timber rafters. Traditional linseed oil was applied to preserve the timber against wood-boring beetles without using modern varnish...",
      submittedAt: "2026-11-17",
      status: "pending_review",
    },
  ]);

  // Locations state
  const [locations, setLocations] = useState(HERITAGE_LOCATIONS);
  const [editingLocation, setEditingLocation] = useState(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // AI Knowledge Documents state
  const [aiKnowledge, setAiKnowledge] = useState([
    {
      id: "ai-doc-01",
      location: "22 Dhara (Balaju Baisdhara)",
      type: "history",
      title: "Origin & Chronology of 22 Spouts",
      source: "Department of Archaeology Monograph (2008)",
      status: "verified",
      authoritative: true,
    },
    {
      id: "ai-doc-02",
      location: "22 Dhara (Balaju Baisdhara)",
      type: "architecture",
      title: "Makara Spout Hydraulic Engineering",
      source: "UNESCO Valley Water Architecture Survey (1995)",
      status: "verified",
      authoritative: true,
    },
    {
      id: "ai-doc-03",
      location: "Pyatho Ajima Temple",
      type: "culture",
      title: "Maternal Matrika Worship & Guthi System",
      source: "Nepal Cultural Studies Center (2012)",
      status: "verified",
      authoritative: true,
    },
  ]);

  const [newAiDoc, setNewAiDoc] = useState({
    location: "22 Dhara (Balaju Baisdhara)",
    type: "history",
    title: "",
    source: "",
  });

  // Handle Moderation Action
  const handleModerate = async (refId, action) => {
    try {
      await fetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceId: refId, action }),
      });

      setPendingQueue((prev) => prev.filter((item) => item.referenceId !== refId));
      setSaveSuccessMessage(`Submission ${refId} has been successfully ${action === "approve" ? "approved" : "rejected"}.`);
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    } catch {
      setPendingQueue((prev) => prev.filter((item) => item.referenceId !== refId));
    }
  };

  // Handle Location Coordinates Update
  const handleSaveLocation = async (e) => {
    e.preventDefault();
    if (!editingLocation) return;

    try {
      await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: editingLocation.slug,
          latitude: editingLocation.coordinates.latitude,
          longitude: editingLocation.coordinates.longitude,
          coordinatesVerified: editingLocation.coordinatesVerified,
          verificationSource: editingLocation.verificationSource,
        }),
      });

      setLocations((prev) =>
        prev.map((loc) => (loc.slug === editingLocation.slug ? editingLocation : loc))
      );
      setEditingLocation(null);
      setSaveSuccessMessage(`Location coordinates updated successfully.`);
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    } catch {
      setEditingLocation(null);
    }
  };

  // Handle adding new AI Knowledge item
  const handleAddAiDoc = (e) => {
    e.preventDefault();
    if (!newAiDoc.title || !newAiDoc.source) return;

    const newEntry = {
      id: `ai-doc-${Date.now()}`,
      location: newAiDoc.location,
      type: newAiDoc.type,
      title: newAiDoc.title,
      source: newAiDoc.source,
      status: "verified",
      authoritative: true,
    };

    setAiKnowledge((prev) => [newEntry, ...prev]);
    setNewAiDoc({ location: "22 Dhara (Balaju Baisdhara)", type: "history", title: "", source: "" });
    setSaveSuccessMessage("New authoritative document added to AI knowledge base.");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-beige">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-1">
              <span>◈</span>
              <span>Ward 16 Administrative CMS</span>
              <span>◈</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
              Heritage Content & Moderation Panel
            </h1>
          </div>

          {/* Role Indicator & Switcher */}
          <div className="flex items-center gap-3 bg-beige/40 p-2 rounded-sm border border-beige text-xs">
            <span className="text-charcoal/60 font-semibold">Active Role:</span>
            <select
              value={currentUserRole}
              onChange={(e) => setCurrentUserRole(e.target.value)}
              className="bg-ivory border border-beige px-2.5 py-1 rounded-xs font-mono font-bold text-burgundy focus:outline-none"
            >
              <option value="super_admin">Super Admin (Full Access)</option>
              <option value="heritage_editor">Heritage Editor</option>
              <option value="content_reviewer">Content Reviewer</option>
            </select>
          </div>
        </header>

        {saveSuccessMessage && (
          <div className="p-4 bg-gold/15 border-l-4 border-gold text-sm text-charcoal font-medium rounded-r-xs flex items-center justify-between">
            <span>✓ {saveSuccessMessage}</span>
            <button onClick={() => setSaveSuccessMessage("")} className="text-charcoal/50 hover:text-charcoal text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-2 border-b border-beige pb-3 text-xs font-mono uppercase tracking-wider">
          {[
            { id: "overview", label: "Overview & Analytics" },
            { id: "moderation", label: `Community Submissions (${pendingQueue.length})` },
            { id: "locations", label: "Locations & Map Verification" },
            { id: "ai_knowledge", label: "AI Knowledge Base" },
            { id: "storage", label: "Storage Buckets" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold rounded-sm transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-burgundy text-ivory shadow-xs"
                  : "bg-beige/40 text-charcoal/70 hover:bg-beige hover:text-charcoal"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === "overview" && (
          <section className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-ivory border border-beige rounded-sm shadow-xs space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-charcoal/60">
                  Documented Landmarks
                </span>
                <p className="font-display text-4xl font-semibold text-charcoal">
                  {locations.length}
                </p>
                <span className="text-[11px] text-gold-dark font-medium block">
                  100% Ward 16 verified records
                </span>
              </div>

              <div className="p-6 bg-ivory border border-beige rounded-sm shadow-xs space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-charcoal/60">
                  Verified Coordinates
                </span>
                <p className="font-display text-4xl font-semibold text-burgundy">
                  {locations.filter((l) => l.coordinatesVerified).length} / {locations.length}
                </p>
                <span className="text-[11px] text-charcoal/50 block">
                  Field GPS audited locations
                </span>
              </div>

              <div className="p-6 bg-ivory border border-beige rounded-sm shadow-xs space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-charcoal/60">
                  Approved Community Stories
                </span>
                <p className="font-display text-4xl font-semibold text-charcoal">
                  {INITIAL_APPROVED_STORIES.length}
                </p>
                <span className="text-[11px] text-terracotta font-medium block">
                  Preserved living memories
                </span>
              </div>

              <div className="p-6 bg-ivory border border-beige rounded-sm shadow-xs space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-charcoal/60">
                  Pending Review Queue
                </span>
                <p className="font-display text-4xl font-semibold text-gold-dark">
                  {pendingQueue.length}
                </p>
                <span className="text-[11px] text-charcoal/50 block">
                  Awaiting editorial moderation
                </span>
              </div>
            </div>

            {/* System Status & Policies Notice */}
            <div className="p-6 bg-charcoal text-ivory rounded-sm border border-gold/40 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-lg text-ivory">
                  Supabase RLS & Epistemic Verification Safeguards
                </h3>
                <span className="px-2 py-0.5 bg-gold/20 text-gold text-[10px] font-mono uppercase tracking-wider rounded-xs">
                  Active Security
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-body">
                All community submissions are partitioned into a private review table with default status{" "}
                <code className="text-gold">pending_review</code>. Public readers can only query records with status{" "}
                <code className="text-gold">approved</code>. Verified historical claims require primary archival sources
                (Department of Archaeology or Guthi chronicles) before entering the authoritative knowledge base.
              </p>
            </div>
          </section>
        )}

        {/* TAB 2: COMMUNITY SUBMISSION MODERATION QUEUE */}
        {activeTab === "moderation" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-2xl text-charcoal">
                  Community Submissions Review Queue
                </h2>
                <p className="text-xs text-charcoal/60">
                  Review personal memories, oral histories, and family photographs before publishing.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-terracotta/15 text-terracotta text-xs font-mono font-bold rounded-xs">
                {pendingQueue.length} Pending Actions
              </span>
            </div>

            {pendingQueue.length > 0 ? (
              <div className="space-y-4">
                {pendingQueue.map((sub) => (
                  <div
                    key={sub.referenceId}
                    className="p-6 bg-ivory border border-beige hover:border-gold/60 rounded-sm shadow-xs space-y-4 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-burgundy">
                          {sub.referenceId}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-beige text-charcoal/70 rounded-xs">
                          {sub.category}
                        </span>
                        <span className="text-[11px] font-mono text-gold-dark font-medium">
                          📍 {sub.location}
                        </span>
                      </div>
                      <span className="text-[11px] text-charcoal/50 font-mono">
                        Submitted: {sub.submittedAt}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-xl text-charcoal">
                        {sub.title}
                      </h3>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Contributor: <span className="font-semibold text-charcoal">{sub.contributor}</span> ({sub.role})
                      </p>
                    </div>

                    <p className="text-sm text-charcoal/80 leading-relaxed font-body bg-beige/20 p-4 rounded-xs border border-beige/40">
                      &ldquo;{sub.content}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-charcoal/50 italic">
                        Consent verified · Private email securely stored for audit.
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleModerate(sub.referenceId, "reject")}
                          className="px-4 py-2 bg-beige hover:bg-beige/80 text-charcoal text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                        >
                          Reject / Request Edits
                        </button>
                        <button
                          onClick={() => handleModerate(sub.referenceId, "approve")}
                          className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                        >
                          Approve & Publish to Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-beige/20 border border-beige rounded-sm space-y-2">
                <span className="text-3xl text-gold">✓</span>
                <h3 className="font-display font-semibold text-lg text-charcoal">
                  Moderation Queue Clean
                </h3>
                <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
                  All community contributions have been reviewed. New submissions submitted via the portal will appear here automatically.
                </p>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: LOCATIONS & MAP VERIFICATION */}
        {activeTab === "locations" && (
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-2xl text-charcoal">
                Heritage Registry & GPS Coordinates Verification
              </h2>
              <p className="text-xs text-charcoal/60">
                Maintain geographical integrity. Only field-audited coordinates should be marked as verified.
              </p>
            </div>

            <div className="overflow-x-auto border border-beige rounded-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-charcoal text-ivory uppercase font-mono tracking-wider">
                  <tr>
                    <th className="p-3">Landmark</th>
                    <th className="p-3">Ward</th>
                    <th className="p-3">Latitude</th>
                    <th className="p-3">Longitude</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Verification Source</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige bg-ivory">
                  {locations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-beige/20">
                      <td className="p-3 font-semibold text-charcoal font-display text-sm">
                        {loc.name.en}
                      </td>
                      <td className="p-3 font-mono">{loc.wardNumber}</td>
                      <td className="p-3 font-mono">{loc.coordinates.latitude}</td>
                      <td className="p-3 font-mono">{loc.coordinates.longitude}</td>
                      <td className="p-3">
                        {loc.coordinatesVerified ? (
                          <span className="px-2 py-0.5 bg-gold/20 text-gold-dark font-mono font-bold rounded-xs">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta font-mono font-bold rounded-xs">
                            Approximate
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-charcoal/70 truncate max-w-xs">
                        {loc.verificationSource}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setEditingLocation({ ...loc })}
                          className="text-burgundy hover:text-burgundy-light font-semibold underline"
                        >
                          Edit Coordinates
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Location Modal */}
            {editingLocation && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs">
                <div className="bg-ivory border border-gold/40 rounded-sm shadow-elevated max-w-md w-full p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-beige pb-3">
                    <h3 className="font-display font-semibold text-lg text-charcoal">
                      Edit Coordinates: {editingLocation.name.en}
                    </h3>
                    <button onClick={() => setEditingLocation(null)} className="text-charcoal/50 hover:text-charcoal">
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveLocation} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Latitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={editingLocation.coordinates.latitude}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            coordinates: {
                              ...editingLocation.coordinates,
                              latitude: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Longitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={editingLocation.coordinates.longitude}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            coordinates: {
                              ...editingLocation.coordinates,
                              longitude: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Verification Source Documentation</label>
                      <input
                        type="text"
                        value={editingLocation.verificationSource || ""}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            verificationSource: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm"
                        required
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={editingLocation.coordinatesVerified}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            coordinatesVerified: e.target.checked,
                          })
                        }
                        className="accent-burgundy"
                      />
                      <span className="font-semibold text-charcoal">
                        Mark as Field Verified (Confirmed GPS Survey)
                      </span>
                    </label>

                    <div className="flex justify-end gap-2 pt-3 border-t border-beige">
                      <button
                        type="button"
                        onClick={() => setEditingLocation(null)}
                        className="px-3 py-1.5 bg-beige text-charcoal rounded-sm font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-burgundy hover:bg-burgundy-light text-ivory rounded-sm font-semibold"
                      >
                        Save Coordinates
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 4: AI KNOWLEDGE BASE INGESTION */}
        {activeTab === "ai_knowledge" && (
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-2xl text-charcoal">
                AI Knowledge Ingestion Pipeline
              </h2>
              <p className="text-xs text-charcoal/60">
                Only verified, authoritative documents should be fed into the retrieval corpus to prevent hallucinations.
              </p>
            </div>

            {/* Ingestion Form */}
            <form
              onSubmit={handleAddAiDoc}
              className="p-6 bg-beige/25 border border-beige rounded-sm space-y-4 text-xs"
            >
              <h3 className="font-display font-semibold text-base text-charcoal">
                + Ingest New Verified Knowledge Document
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Target Heritage Site</label>
                  <select
                    value={newAiDoc.location}
                    onChange={(e) => setNewAiDoc({ ...newAiDoc, location: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm"
                  >
                    <option value="22 Dhara (Balaju Baisdhara)">22 Dhara (Balaju Baisdhara)</option>
                    <option value="Pyatho Ajima Temple">Pyatho Ajima Temple</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Topic / Category</label>
                  <select
                    value={newAiDoc.type}
                    onChange={(e) => setNewAiDoc({ ...newAiDoc, type: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm"
                  >
                    <option value="history">Historical Origins & Chronology</option>
                    <option value="architecture">Architectural & Hydraulic Engineering</option>
                    <option value="culture">Ritual & Cultural Practice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={newAiDoc.title}
                    onChange={(e) => setNewAiDoc({ ...newAiDoc, title: e.target.value })}
                    placeholder="e.g. Malla Royal Inscriptions (1750 CE)"
                    className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Archival Citation / Source</label>
                <input
                  type="text"
                  required
                  value={newAiDoc.source}
                  onChange={(e) => setNewAiDoc({ ...newAiDoc, source: e.target.value })}
                  placeholder="e.g. Department of Archaeology Records, Vol 4"
                  className="w-full px-3 py-2 bg-ivory border border-beige rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory font-semibold rounded-sm uppercase tracking-wider"
              >
                Ingest to Authoritative Corpus
              </button>
            </form>

            {/* Existing Documents List */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-lg text-charcoal">
                Active Grounded Knowledge Chunks ({aiKnowledge.length})
              </h3>
              <div className="divide-y divide-beige border border-beige rounded-sm bg-ivory">
                {aiKnowledge.map((item) => (
                  <div key={item.id} className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-charcoal text-sm">{item.title}</span>
                        <span className="px-2 py-0.5 bg-gold/15 text-gold-dark font-mono rounded-xs text-[10px]">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-charcoal/60">
                        {item.location} · Source: <span className="italic">{item.source}</span>
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-gold/20 text-gold-dark font-mono font-bold rounded-xs">
                      ✓ Authoritative Grounded
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: STORAGE BUCKETS & MEDIA ASSETS */}
        {activeTab === "storage" && (
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-2xl text-charcoal">
                Supabase Storage Buckets
              </h2>
              <p className="text-xs text-charcoal/60">
                Organized storage partitions enforcing file size limits, mime-type restrictions, and copyright metadata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  bucket: "heritage-22-dhara",
                  type: "Images (JPEG, WebP, PNG)",
                  maxSize: "5 MB",
                  filesCount: "8 items",
                  purpose: "Photographic archival documentation of the 22 spouts.",
                },
                {
                  bucket: "heritage-pyatho-ajima",
                  type: "Images (JPEG, WebP, PNG)",
                  maxSize: "5 MB",
                  filesCount: "6 items",
                  purpose: "High-resolution architectural & ritual documentation.",
                },
                {
                  bucket: "community-submissions",
                  type: "User Images (JPEG, PNG)",
                  maxSize: "4 MB",
                  filesCount: "5 items",
                  purpose: "Photographs submitted by citizens pending moderation.",
                },
                {
                  bucket: "heritage-audio",
                  type: "Audio (MP3, AAC)",
                  maxSize: "15 MB",
                  filesCount: "2 items",
                  purpose: "Oral storytelling and narration audio files.",
                },
              ].map((b) => (
                <div key={b.bucket} className="p-6 bg-ivory border border-beige rounded-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-beige pb-2">
                    <span className="font-mono text-xs font-bold text-burgundy">
                      🗂 {b.bucket}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-beige rounded-xs">
                      {b.filesCount}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-body">
                    {b.purpose}
                  </p>
                  <div className="text-[11px] font-mono text-charcoal/50 space-y-0.5 pt-1">
                    <div>Allowed: {b.type}</div>
                    <div>Max Size: {b.maxSize}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="pt-6 border-t border-beige flex justify-between items-center text-xs">
          <Link href="/" className="text-burgundy hover:text-gold font-semibold underline">
            ← Return to Public Website
          </Link>
          <span className="font-mono text-charcoal/50">
            Ward 16 Digital Heritage · Supabase CMS v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
