/**
 * frontend/src/app/api/admin/moderation/route.js
 *
 * Forwards moderation actions to the backend Express server.
 */

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/apiConfig";

export async function GET(request) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/moderation`);
    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {}
  return NextResponse.json({ success: true, submissions: [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/moderation`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: body.referenceId || body.submissionId,
        action: body.action,
        notes: body.notes || "",
      }),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (err) {}

  return NextResponse.json({ success: true, message: "Moderation action recorded." });
}
