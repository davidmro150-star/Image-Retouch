
// src/app/api/quotes/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Quote from "@/models/Quote";
import Users from "@/models/Users";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "node:crypto";
import { sendQuoteEmail } from "@/lib/quote-email";
export const dynamic = "force-dynamic";

const ALLOWED_SERVICES = [
  "Image Retouching",
  "Clipping Path",
  "Image Masking",
  "Background Removal",
];

const ALLOWED_STATUSES = [
  "Pending",
  "Reviewed",
  "Quoted",
  "Accepted",
  "Declined",
];

// Verify the session and check the current database role.
async function getAdminUser(request) {
  try {
    const token = request.cookies.get("prism_session_token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) return null;

    const payload = jwt.verify(token, secret);

    if (
      !payload ||
      typeof payload !== "object" ||
      typeof payload.userId !== "string"
    ) {
      return null;
    }

    const account = await Users.findById(payload.userId)
      .select("_id role")
      .lean();

    if (!account) return null;

    const role = String(account.role || "").trim().toLowerCase();

    if (role !== "admin") return null;

    return account;
  } catch {
    return null;
  }
}

// GET: Admin retrieves all custom quote requests.
export async function GET(request) {
  try {
    await connectToDatabase();

    const admin = await getAdminUser(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Admin authentication required." },
        { status: 403 }
      );
    }

    const quotes = await Quote.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(quotes, {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("GET /api/quotes error:", error);

    return NextResponse.json(
      { error: "Failed to load quote requests." },
      { status: 500 }
    );
  }
}

// POST: A client submits a custom quote request.
export async function POST(request) {
  try {
    await connectToDatabase();

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const service =
      typeof body.service === "string" ? body.service.trim() : "";

    const imageCount = Number(body.imageCount);

    const instructions =
      typeof body.instructions === "string"
        ? body.instructions.trim()
        : "";

    if (!fullName || fullName.length > 120) {
      return NextResponse.json(
        { error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid business email." },
        { status: 400 }
      );
    }

    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        { error: "Please select a valid service." },
        { status: 400 }
      );
    }

    if (
      !Number.isSafeInteger(imageCount) ||
      imageCount < 1 ||
      imageCount > 1000000
    ) {
      return NextResponse.json(
        { error: "Image count must be between 1 and 1,000,000." },
        { status: 400 }
      );
    }

    if (instructions.length > 5000) {
      return NextResponse.json(
        { error: "Instructions cannot exceed 5,000 characters." },
        { status: 400 }
      );
    }

 console.log("Quote form data:", {
  fullName,
  email,
  service,
  imageCount,
});

const newQuote = await Quote.create({
  fullName,
  email,
  service,
  imageCount,
  instructions,
  status: "Pending",
});

console.log("Quote saved successfully:", newQuote._id);
    return NextResponse.json(
      { success: true, data: newQuote },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/quotes error:", error);

    return NextResponse.json(
      { error: "Failed to submit your quote request." },
      { status: 500 }
    );
  }
}

// PUT: Admin saves pricing, delivery estimate, feedback, and status.
export async function PUT(request) {
  try {
    await connectToDatabase();

    const admin = await getAdminUser(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Admin authentication required." },
        { status: 403 }
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const id = typeof body.id === "string" ? body.id.trim() : "";
    const status =
      typeof body.status === "string" ? body.status.trim() : "";

    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json(
        { error: "Invalid quote ID." },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Please select a valid quote status." },
        { status: 400 }
      );
    }

    let quotedPrice = null;

    if (body.quotedPrice !== null && body.quotedPrice !== "") {
      quotedPrice = Number(body.quotedPrice);

      if (!Number.isFinite(quotedPrice) || quotedPrice < 0) {
        return NextResponse.json(
          { error: "Quoted price must be zero or greater." },
          { status: 400 }
        );
      }
    }

    const estimatedDelivery =
      typeof body.estimatedDelivery === "string"
        ? body.estimatedDelivery.trim()
        : "";

    const adminFeedback =
      typeof body.adminFeedback === "string"
        ? body.adminFeedback.trim()
        : "";

    if (estimatedDelivery.length > 200 || adminFeedback.length > 5000) {
      return NextResponse.json(
        { error: "Delivery estimate or feedback is too long." },
        { status: 400 }
      );
    }

  
    const emailConfigured = Boolean(
      process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL
    );

    // Create a new private link whenever a quote is marked Quoted.
    const rawToken =
      status === "Quoted" && emailConfigured
        ? randomBytes(32).toString("hex")
        : null;

    const tokenHash = rawToken
      ? createHash("sha256").update(rawToken).digest("hex")
      : null;

    const updatedQuote = await Quote.findByIdAndUpdate(
      id,
      {
        $set: {
          quotedPrice,
          estimatedDelivery,
          adminFeedback,
          status,
          quoteTokenHash: tokenHash,
          quoteTokenExpiresAt: rawToken
            ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            : null,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQuote) {
      return NextResponse.json(
        { error: "Quote request not found." },
        { status: 404 }
      );
    }

    let emailSent = false;
    let emailError = "";

    if (status === "Quoted") {
      if (!rawToken) {
        emailError =
          "Quote saved, but email is not configured. Check Resend environment variables.";
      } else {
        try {
          const baseUrl = (
            process.env.APP_URL || request.nextUrl.origin
          ).replace(/\/+$/, "");

          const quoteUrl =
            `${baseUrl}/quote/${rawToken}`;

          await sendQuoteEmail({
            quote: updatedQuote,
            quoteUrl,
          });

          emailSent = true;
        } catch (error) {
          console.error("Quote email failed:", error);

          emailError =
            "Quote saved, but the email could not be sent. Save the response again to generate a new link and retry.";
        }
      }
    }




if (!updatedQuote) {
  return NextResponse.json(
    { error: "Quote request not found." },
    { status: 404 }
  );
}

return NextResponse.json({
  success: true,
  data: updatedQuote,
  emailSent,
  ...(emailError ? { emailError } : {}),
});

  } catch (error) {
    console.error("PUT /api/quotes error:", error);

    return NextResponse.json(
      { error: "Failed to save the quote response." },
      { status: 500 }
    );
  }
}
