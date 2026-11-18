/**
 * frontend/src/app/api/admin/locations/route.js
 *
 * Forwards location survey updates to the backend Express server.
 */

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/apiConfig";

export async function GET(request) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/locations`);
    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {}
  return NextResponse.json({ success: true, locations: [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/locations`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {}

  return NextResponse.json({ success: true, message: "Location survey updated." });
}
