import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectToDatabase();

    const token = request.cookies.get("prism_session_token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Please sign in again." },
        { status: 401 }
      );
    }

    let user;

    try {
      user = jwt.verify(token, secret);
    } catch {
      return NextResponse.json(
        { error: "Invalid session. Please sign in again." },
        { status: 401 }
      );
    }

    // This endpoint is exclusively for client accounts.
    if (user.role !== "client") {
      return NextResponse.json(
        { error: "Client account required." },
        { status: 403 }
      );
    }

    // Return only orders belonging to this authenticated client.
    const orders = await Order.find({
      userId: user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Client orders error:", error);

    return NextResponse.json(
      { error: "Failed to load client orders." },
      { status: 500 }
    );
  }
}