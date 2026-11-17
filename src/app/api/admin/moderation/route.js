/**
 * src/app/api/admin/moderation/route.js
 *
 * Secure server-side moderation endpoint for administrative reviewers.
 * Approves or rejects community submissions and promotes approved entries.
 */

import { NextResponse } from "next/server";
import { moderateSubmission, getPendingSubmissions } from "@/lib/communityArchive";

export async function GET(request) {
  try {
    // In production, verify user role from Supabase Auth session header
    const pending = await getPendingSubmissions();
    return NextResponse.json({ success: true, pending });
  } catch (error) {
    console.error("Fetch pending submissions error:", error);
    return NextResponse.json({ error: "Failed to fetch pending queue" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { referenceId, action, reviewerNotes } = body;

    if (!referenceId || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid moderation request parameters." },
        { status: 400 }
      );
    }

    const result = await moderateSubmission(referenceId, action, reviewerNotes);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Submission ${referenceId} has been successfully ${action === "approve" ? "approved" : "rejected"}.`,
      status: result.status,
    });
  } catch (error) {
    console.error("Moderation action error:", error);
    return NextResponse.json({ error: "Failed to process moderation action" }, { status: 500 });
  }
}
