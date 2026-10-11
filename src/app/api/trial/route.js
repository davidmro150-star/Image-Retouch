// src/app/api/trial/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaAsset } from "@/lib/cloudinary";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, service, notes, imagesArrayBase64, uploadedUrls } = body;

    // Support both direct base64 array strings or pre-uploaded url array links configurations safely
    let finalCloudUrls = [];

    if (uploadedUrls && Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
      finalCloudUrls = uploadedUrls;
    } else if (imagesArrayBase64 && Array.isArray(imagesArrayBase64) && imagesArrayBase64.length > 0) {
      console.log(`Processing ingestion stream for ${imagesArrayBase64.length} standalone quote frames...`);
      finalCloudUrls = await Promise.all(
        imagesArrayBase64.map(async (base64String) => {
          const cloudinaryUrl = await uploadMediaAsset(base64String, "prism_bulk_quotes");
          return cloudinaryUrl;
        })
      );
    }

    if (!name || !email || !service || finalCloudUrls.length === 0) {
      return NextResponse.json({ error: "Missing required parameters or image assets stack." }, { status: 400 });
    }

    const uniqueReferenceCode = `QUOTE-${Math.floor(1000 + Math.random() * 9000)}`;

    const permanentQuoteRecord = await Order.create({
      userId: "public_unregistered_quote_lead", 
      id: uniqueReferenceCode,
      referenceName: `Bulk Quote: ${name}`,
      service: service,
      images: finalCloudUrls.length, // Automatically counts total uploaded frames
      status: "Submitted", 
      notes: `[PORTAL BULK ESTIMATE REQUEST] Notes: ${notes}`,
      name: name,
      email: email,
      downloadUrls: finalCloudUrls, // ⚡ CRITICAL FIX: Saves entire cloud string array list safely!
      downloadUrl: finalCloudUrls[0] || "" // Set first image as a standard fallback preview link
    });

    return NextResponse.json({ success: true, data: permanentQuoteRecord }, { status: 201 });

  } catch (error) {
    console.error("BULK QUOTE INGEST FAULT:", error);
    return NextResponse.json({ error: "Quote API pipeline fault: " + error.message }, { status: 500 });
  }
}
