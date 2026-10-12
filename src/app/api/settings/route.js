// src/app/api/settings/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Settings from "@/models/Settings";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

async function verifyAdminSession(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
    const token = authHeader.split(" ");
    const session = jwt.verify(token, process.env.JWT_SECRET || "fallback_prism_studio_secret_key");
    return session && session.role === "admin";
  } catch (err) {
    return false;
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const heroConfig = await Settings.findOne({ key: "home_hero_slider" });
    
    // ⚡ PRO-GUARD FALLBACK: High-performance inline graphics bypass external HTTP dependencies entirely
    const offlineDefaultShowcase = {
      beforeImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTcxNzE3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM0MDQwNDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QcmlzbSBTdHVkaW8gT3JpZ2luYWwgKEJlZm9yZSk8L3RleHQ+PC9zdmc+",
      afterImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjYyNjI2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNhM2EzYTMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QcmlzbSBTdHVkaW8gUmV0b3VjaGVkIChBZnRlcik8L3RleHQ+PC9zdmc+"
    };

    return NextResponse.json(heroConfig ? heroConfig.value : offlineDefaultShowcase);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    if (!(await verifyAdminSession(request))) {
      return NextResponse.json({ error: "Unauthorized access clearance level." }, { status: 403 });
    }
    const body = await request.json();
    const { beforeImage, afterImage } = body;
    if (!beforeImage || !afterImage) {
      return NextResponse.json({ error: "Missing required image links properties." }, { status: 400 });
    }
    const updatedSettings = await Settings.findOneAndUpdate(
      { key: "home_hero_slider" },
      { value: { beforeImage, afterImage } },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
