
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Quote from "@/models/Quote";

export const dynamic = "force-dynamic";

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function findActiveQuote(token) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/i.test(token)
  ) {
    return null;
  }

  return Quote.findOne({
    quoteTokenHash: hashToken(token),
    quoteTokenExpiresAt: { $gt: new Date() },
    status: "Quoted",
  })
    .select(
      "fullName service imageCount instructions quotedPrice estimatedDelivery adminFeedback status createdAt"
    )
    .lean();
}

export async function GET(request, context) {
  try {
    await connectToDatabase();

    const { token } = await context.params;
    const quote = await findActiveQuote(token);

    if (!quote) {
      return NextResponse.json(
        { error: "This quote link is invalid, expired, or already used." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: quote },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("GET /api/quote/[token] error:", error);

    return NextResponse.json(
      { error: "Unable to load this quote." },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  try {
    await connectToDatabase();

    const { token } = await context.params;

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const action = body?.action;

    if (!["accept", "decline"].includes(action)) {
      return NextResponse.json(
        { error: "Choose accept or decline." },
        { status: 400 }
      );
    }

    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/i.test(token)
    ) {
      return NextResponse.json(
        { error: "Invalid quote link." },
        { status: 404 }
      );
    }

    const updatedQuote = await Quote.findOneAndUpdate(
      {
        quoteTokenHash: hashToken(token),
        quoteTokenExpiresAt: { $gt: new Date() },
        status: "Quoted",
      },
      {
        $set: {
          status: action === "accept" ? "Accepted" : "Declined",
          quoteTokenHash: null,
          quoteTokenExpiresAt: null,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id status");

    if (!updatedQuote) {
      return NextResponse.json(
        { error: "This quote link has expired or has already been used." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      status: updatedQuote.status,
      message:
        action === "accept"
          ? "You have accepted the quote."
          : "You have declined the quote.",
    });
  } catch (error) {
    console.error("POST /api/quote/[token] error:", error);

    return NextResponse.json(
      { error: "Unable to save your decision." },
      { status: 500 }
    );
  }
}
