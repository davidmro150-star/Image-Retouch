// src/app/api/portfolio/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaAsset } from "@/lib/cloudinary";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all portfolio items from the database, newest first
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { title, category, beforeImageBase64, afterImageBase64 } = body;

    if (!title || !category || !beforeImageBase64 || !afterImageBase64) {
      return NextResponse.json({ error: "Missing required content parameters." }, { status: 400 });
    }

    // 1. Upload the raw images to secure Cloudinary buckets
    const uploadedBeforeUrl = await uploadMediaAsset(beforeImageBase64, "prism_portfolio_before");
    const uploadedAfterUrl = await uploadMediaAsset(afterImageBase64, "prism_portfolio_after");

    // 2. Save the metadata and Cloudinary links into MongoDB
    const newPortfolioItem = await Portfolio.create({
      title,
      category,
      beforeImageUrl: uploadedBeforeUrl,
      afterImageUrl: uploadedAfterUrl
    });

    return NextResponse.json({ success: true, data: newPortfolioItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Upload Engine Fault: " + error.message }, { status: 500 });
  }
}
