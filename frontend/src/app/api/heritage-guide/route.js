/**
 * frontend/src/app/api/heritage-guide/route.js
 *
 * Next.js proxy route for the AI Heritage Guide chatbot.
 * Forwards requests to the backend Express server with CORS & text document grounding.
 */

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/apiConfig";
import { AI_HERITAGE_KNOWLEDGE, UNVERIFIED_FALLBACK } from "@/data/aiKnowledgeData";

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Forward to traditional backend Express server
    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/heritage-guide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": request.headers.get("x-forwarded-for") || "127.0.0.1",
        },
        body: JSON.stringify(body),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch (backendErr) {
      // Backend temporarily offline; use local grounded knowledge fallback
    }

    // 2. Local fallback if backend is offline
    const query = (body.query || "").trim().toLowerCase();
    const siteSlug = body.siteSlug;
    const locale = body.locale === "ne" ? "ne" : "en";

    if (siteSlug === "22-dhara" && (query.includes("pyatho") || query.includes("प्याठो"))) {
      return NextResponse.json({
        answer:
          locale === "ne"
            ? "म २२ धाराको समर्पित डिजिटल सहायक हुँ। प्याठो अजिमा मन्दिरबारे जान्न कृपया प्याठो अजिमा पृष्ठको सहायकलाई सोध्नुहोस्।"
            : "I am the dedicated guide for 22 Dhara (Balaju). For inquiries about Pyatho Ajima Temple, please visit the Pyatho Ajima Heritage Guide.",
        sources: ["Ward 16 Digital Heritage Directory"],
        isCrossSiteRedirect: true,
      });
    }

    if (
      siteSlug === "pyatho-ajima" &&
      (query.includes("22 dhara") || query.includes("baisdhara") || query.includes("बाइसधारा") || query.includes("बालाजु"))
    ) {
      return NextResponse.json({
        answer:
          locale === "ne"
            ? "म प्याठो अजिमा मन्दिरको समर्पित सहायक हुँ। २२ धाराबारे जान्न कृपया २२ धारा पृष्ठको सहायकसँग परामर्श गर्नुहोस्।"
            : "I am the dedicated guide for Pyatho Ajima Temple. For inquiries regarding 22 Dhara, please explore the 22 Dhara Heritage Guide.",
        sources: ["Ward 16 Digital Heritage Directory"],
        isCrossSiteRedirect: true,
      });
    }

    const siteKnowledge = AI_HERITAGE_KNOWLEDGE[siteSlug] || [];
    let bestMatch = null;
    let highestScore = 0;

    for (const chunk of siteKnowledge) {
      let score = 0;
      for (const kw of chunk.keywords) {
        if (query.includes(kw.toLowerCase())) score += 2;
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = chunk;
      }
    }

    if (bestMatch && highestScore >= 2) {
      return NextResponse.json({
        answer: locale === "ne" ? bestMatch.answer.ne : bestMatch.answer.en,
        sources: bestMatch.sources,
        verified: true,
        topic: bestMatch.topic,
      });
    }

    return NextResponse.json({
      answer: locale === "ne" ? UNVERIFIED_FALLBACK.ne : UNVERIFIED_FALLBACK.en,
      sources: ["Ward 16 Digital Heritage Archive Policy"],
      verified: false,
      isFallback: true,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat query" }, { status: 500 });
  }
}
