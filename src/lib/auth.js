// src/lib/auth.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function getCurrentUser() {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) return null;

    const cookieStore = await cookies();
    const token = cookieStore.get("prism_session_token")?.value;

    if (!token) return null;

    const session = jwt.verify(token, secret);

    if (
      typeof session === "string" ||
      !session.userId
    ) {
      return null;
    }

    await connectToDatabase();

    // Check the current database role, not only the JWT role.
    const user = await User.findById(session.userId)
      .select("_id businessName email role")
      .lean();

    if (!user) return null;

    return {
      id: user._id.toString(),
      businessName: user.businessName,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}