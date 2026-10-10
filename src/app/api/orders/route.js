
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

// Verify the session cookie and normalize the role.
function getAuthenticatedUser(request) {
  try {
    const token = request.cookies.get("prism_session_token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return null;
    }

    const payload = jwt.verify(token, secret);

    if (!payload || typeof payload !== "object") {
      return null;
    }

    const userId =
      typeof payload.userId === "string" ? payload.userId : "";

    const role = String(payload.role || "")
      .trim()
      .toLowerCase();

    if (!userId || !["admin", "client"].includes(role)) {
      return null;
    }

    return {
      ...payload,
      userId,
      role,
    };
  } catch {
    return null;
  }
}

// GET: Admin sees all orders; clients see only their own.
export async function GET(request) {
  try {
    await connectToDatabase();

    const user = getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in again." },
        { status: 401 }
      );
    }

    const filter =
      user.role === "admin"
        ? {}
        : { userId: user.userId };

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);

    return NextResponse.json(
      { error: "Failed to load orders." },
      { status: 500 }
    );
  }
}

// POST: Create an order for an authenticated client.
export async function POST(request) {
  try {
    await connectToDatabase();

    const user = getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in again." },
        { status: 401 }
      );
    }

    if (user.role !== "client") {
      return NextResponse.json(
        { error: "Only authenticated clients can create orders." },
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

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const images =
      typeof body.images === "number"
        ? body.images
        : Number(body.images);

    if (
      !Number.isInteger(images) ||
      images < 1 ||
      images > 10000
    ) {
      return NextResponse.json(
        { error: "Please provide a valid image count." },
        { status: 400 }
      );
    }

    const referenceName =
      typeof body.referenceName === "string"
        ? body.referenceName.trim()
        : "";

    const service =
      typeof body.service === "string" && body.service.trim()
        ? body.service.trim()
        : "Image Retouching";

    const notes =
      typeof body.notes === "string"
        ? body.notes.trim()
        : "";

    if (!referenceName) {
      return NextResponse.json(
        { error: "Project reference name is required." },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: user.userId,
      id: `JOB-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      referenceName,
      service,
      images,
      status: "Submitted",
      notes,
      name: user.businessName || "Registered Client",
      email: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);

    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    );
  }
}

// PUT: Only admins can update order status.
export async function PUT(request) {
  try {
    await connectToDatabase();

    const user = getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in again." },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Only administrators can update orders." },
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

    const { id, nextStatus } = body || {};

    const allowedStatuses = [
      "Submitted",
      "In Progress",
      "Revision",
      "Completed",
    ];

    if (
      typeof id !== "string" ||
      !id.trim() ||
      !allowedStatuses.includes(nextStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid order ID or status." },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { id: id.trim() },
      { $set: { status: nextStatus } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("PUT /api/orders error:", error);

    return NextResponse.json(
      { error: "Failed to update order status." },
      { status: 500 }
    );
  }
}
