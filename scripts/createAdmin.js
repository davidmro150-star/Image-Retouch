
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Users from "../src/models/Users.js";

async function createAdmin() {
  try {
    const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in .env.local"
      );
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully.");

    const email = ADMIN_EMAIL.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    let admin = await Users.findOne({ email });

    if (admin) {
      admin.role = "admin";
      admin.password = hashedPassword;
      admin.businessName ||= "Prism Studio Admin";

      await admin.save();

      console.log("Existing account updated to admin successfully.");
    } else {
      await Users.create({
        businessName: "Prism Studio Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created successfully.");
    }

    console.log("Admin email:", email);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

createAdmin();
