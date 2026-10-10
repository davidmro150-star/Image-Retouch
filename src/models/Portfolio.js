// src/models/Portfolio.js
import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["Retouching", "Clipping Path", "Image Masking", "Background Removal"] },
    beforeImageUrl: { type: String, required: true }, // Will hold the Cloudinary URL
    afterImageUrl: { type: String, required: true }   // Will hold the Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
