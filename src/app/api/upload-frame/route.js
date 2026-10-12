// src/app/api/upload-frame/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaAsset } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { singleImageBase64 } = body;

    if (!singleImageBase64) {
      return NextResponse.json({ error: "Missing frame payload string." }, { status: 400 });
    }

    const secureCloudUrl = await uploadMediaAsset(singleImageBase64, "prism_bulk_intake");
    return NextResponse.json({ success: true, url: secureCloudUrl }, { status: 200 });
  } catch (error) {
    console.error("Frame Stream Failure:", error);
    return NextResponse.json({ error: "Upload crash: " + error.message }, { status: 500 });
  }
}
