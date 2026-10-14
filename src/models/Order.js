
// src/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    referenceName: { type: String, required: true },
    service: { type: String, required: true },
    images: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Submitted", "In Progress", "Revision", "Completed"],
      default: "Submitted",
    },

    // Order workflow timestamps
    assignedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    notes: { type: String, required: true },
    name: { type: String, default: "Client Brand Manager" },
    email: { type: String, default: "client@company.com" },

    downloadUrls: { type: [String], default: [] }, // Holds multiple Cloudinary links
    downloadUrl: { type: String, default: "" },
  },

  {
    timestamps: true,
    collection: "orders", // Keeps the existing MongoDB collection
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
