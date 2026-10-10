// src/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    referenceName: { type: String, required: true },
    service: { type: String, required: true },
    images: { type: Number, required: true }, // Unifies with your form's "images" tag
    status: { 
      type: String, 
      enum: ["Submitted", "In Progress", "Revision", "Completed"], 
      default: "Submitted" 
    },
    notes: { type: String, required: true },
    name: { type: String, default: "Client Brand Manager" },
    email: { type: String, default: "client@company.com" },
    downloadUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
