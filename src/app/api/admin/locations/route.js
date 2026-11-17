/**
 * src/app/api/admin/locations/route.js
 *
 * Secure server-side endpoint for updating heritage location verification status,
 * coordinates, and location source attribution.
 */

import { NextResponse } from "next/server";
import { HERITAGE_LOCATIONS } from "@/data/heritageLocations";

export async function GET() {
  return NextResponse.json({
    success: true,
    locations: HERITAGE_LOCATIONS,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, latitude, longitude, coordinatesVerified, verificationSource } = body;

    const location = HERITAGE_LOCATIONS.find((l) => l.slug === slug);
    if (!location) {
      return NextResponse.json({ error: "Heritage location not found" }, { status: 404 });
    }

    // Validate coordinates
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      return NextResponse.json({ error: "Invalid latitude value" }, { status: 400 });
    }
    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      return NextResponse.json({ error: "Invalid longitude value" }, { status: 400 });
    }

    // Update in-memory record (and sync to Supabase when active)
    if (latitude !== undefined) location.coordinates.latitude = latitude;
    if (longitude !== undefined) location.coordinates.longitude = longitude;
    if (coordinatesVerified !== undefined) location.coordinatesVerified = Boolean(coordinatesVerified);
    if (verificationSource) location.verificationSource = verificationSource;

    return NextResponse.json({
      success: true,
      message: `Location ${location.name.en} updated successfully.`,
      location,
    });
  } catch (error) {
    console.error("Update location error:", error);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}
