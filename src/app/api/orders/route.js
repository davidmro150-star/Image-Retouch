// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

async function getAuthenticatedUser(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET || "fallback_prism_studio_secret_key");
  } catch (err) {
    return null;
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    const userSession = await getAuthenticatedUser(request);
    
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized session access." }, { status: 401 });
    }

    const queryFilter = userSession.role === "admin" ? {} : { userId: userSession.userId };
    const historicalOrders = await Order.find(queryFilter).sort({ createdAt: -1 });
    return NextResponse.json(historicalOrders || []);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const userSession = await getAuthenticatedUser(request);
    
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized operation sequence." }, { status: 401 });
    }

    const body = await request.json();
    const uniqueReferenceCode = `JOB-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const permanentJobRecord = await Order.create({
      userId: userSession.userId,
      id: uniqueReferenceCode,
      referenceName: body.referenceName || "Untitled Project Batch",
      service: body.service || "Image Retouching",
      images: parseInt(body.images) || 1,
      status: "Submitted",
      notes: body.notes || "No processing briefing notes left.",
      name: userSession.businessName || "Registered Client",
      email: userSession.email
    });

    return NextResponse.json({ success: true, data: permanentJobRecord }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { id, nextStatus } = await request.json();
    const updatedRecord = await Order.findOneAndUpdate({ id }, { status: nextStatus }, { new: true });
    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ⚡ STEP 21.1: FRESH PRODUCTION DELETE HANDLER ROUTE
export async function DELETE(request) {
  try {
    await connectToDatabase();
    const userSession = await getAuthenticatedUser(request);
    
    // Strict perimeter lock: Only verified Administrators can destroy collection rows
    if (!userSession || userSession.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized clearance level access." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const orderReferenceId = searchParams.get("id");

    if (!orderReferenceId) {
      return NextResponse.json({ error: "Missing required reference document key." }, { status: 400 });
    }

    const deletedConfirmation = await Order.findOneAndDelete({ id: orderReferenceId });

    if (!deletedConfirmation) {
      return NextResponse.json({ error: "Target entry could not be found inside index schema." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order removed permanently from cluster grid tables." });
  } catch (error) {
    return NextResponse.json({ error: "Delete Engine Exception: " + error.message }, { status: 500 });
  }
}
