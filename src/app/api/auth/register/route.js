// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Inline explicit model compilation block to isolate Turbopack build crashes
const UserSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client"], default: "client" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(request) {
  try {
    // 1. Establish database pipeline pool connection
    await connectToDatabase();
    
    const body = await request.json();
    const { businessName, email, password } = body;

    if (!businessName || !email || !password) {
      return NextResponse.json({ error: "Please populate all inputs." }, { status: 400 });
    }

    // 2. Check for duplicate profiles inside the database collection
    const accountExists = await User.findOne({ email: email.toLowerCase() });
    if (accountExists) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // 3. Encrypt the password safely
    const saltWorkload = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, saltWorkload);

    // 4. Save record document permanently into MongoDB Compass
    const freshClient = await User.create({
      businessName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: "client"
    });

    return NextResponse.json({ 
      success: true, 
      message: "Client profile provisioned successfully." 
    }, { status: 201 });

  } catch (error) {
    console.error("CRITICAL AUTH ENGINE FAULT:", error);
    return NextResponse.json({ error: "Internal Auth Failure: " + error.message }, { status: 500 });
  }
}
