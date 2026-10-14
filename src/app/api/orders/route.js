
// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

async function getAuthenticatedUser(request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    return jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_prism_studio_secret_key"
    );
  } catch (err) {
    return null;
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const userSession = await getAuthenticatedUser(request);

    if (!userSession) {
      return NextResponse.json(
        { error: "Unauthorized session access." },
        { status: 401 }
      );
    }

    const queryFilter =
      userSession.role === "admin"
        ? {}
        : { userId: userSession.userId };

    const historicalOrders = await Order.find(queryFilter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(historicalOrders || []);
  } catch (error) {
    console.error("GET orders error:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const userSession = await getAuthenticatedUser(request);

    if (!userSession) {
      return NextResponse.json(
        { error: "Unauthorized operation sequence." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const uniqueReferenceCode = `JOB-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const incomingUrlsArray = Array.isArray(body.downloadUrls)
      ? body.downloadUrls
      : [];

    const permanentJobRecord = await Order.create({
      userId: userSession.userId,
      id: uniqueReferenceCode,
      referenceName: body.referenceName || "Untitled Project Batch",
      service: body.service || "Image Retouching",
      images: incomingUrlsArray.length || 1,
      status: "Submitted",
      notes: body.notes || "No custom briefing details left.",
      name: userSession.businessName || "Registered Client",
      email: userSession.email,
      downloadUrls: incomingUrlsArray,
      downloadUrl: incomingUrlsArray[0] || "",
    });

    return NextResponse.json(
      { success: true, data: permanentJobRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST orders error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();

    // Only admins can update order status.
    const userSession = await getAuthenticatedUser(request);

    if (!userSession || userSession.role !== "admin") {
      return NextResponse.json(
        { error: "Only administrators can update orders." },
        { status: 403 }
      );
    }

    const { id, nextStatus } = await request.json();

    if (!id || !["In Progress", "Completed"].includes(nextStatus)) {
      return NextResponse.json(
        { error: "Invalid order ID or status." },
        { status: 400 }
      );
    }

    const updatedRecord = await Order.findOne({ id });

    if (!updatedRecord) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    // Record the assignment time only once.
    if (nextStatus === "In Progress" && !updatedRecord.assignedAt) {
      updatedRecord.assignedAt = new Date();
    }

    // Record the completion time only once.
    if (nextStatus === "Completed" && !updatedRecord.completedAt) {
      updatedRecord.completedAt = new Date();
    }

    updatedRecord.status = nextStatus;

    await updatedRecord.save();

    return NextResponse.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    console.error("PUT orders error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();

    const userSession = await getAuthenticatedUser(request);

    if (!userSession || userSession.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const orderReferenceId = searchParams.get("id");

    if (!orderReferenceId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findOneAndDelete({
      id: orderReferenceId,
    });

    if (!deletedOrder) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order removed permanently.",
    });
  } catch (error) {
    console.error("DELETE orders error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
