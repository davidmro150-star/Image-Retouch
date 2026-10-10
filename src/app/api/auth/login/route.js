
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "@/models/Users";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = await Users.findOne({
      email: normalizedEmail,
    });

    // Check whether the account exists before accessing its password.
    if (!matchedUser) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      matchedUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is missing from the environment.");
      return NextResponse.json(
        { success: false, error: "Server authentication is not configured." },
        { status: 500 }
      );
    }

    const customSessionToken = jwt.sign(
      {
        userId: matchedUser._id.toString(),
        role: matchedUser.role,
        email: matchedUser.email,
        businessName: matchedUser.businessName,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      role: matchedUser.role,
      token: customSessionToken,
      userId: matchedUser._id.toString(),
      businessName: matchedUser.businessName,
      email: matchedUser.email,
    });

    response.cookies.set("prism_session_token", customSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      { success: false, error: "An internal authentication error occurred." },
      { status: 500 }
    );
  }
}
