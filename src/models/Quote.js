
import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: true,
      enum: [
        "Image Retouching",
        "Clipping Path",
        "Image Masking",
        "Background Removal",
      ],
    },
    imageCount: {
      type: Number,
      required: true,
      min: 1,
    },
    instructions: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Quoted", "Accepted", "Declined"],
      default: "Pending",
    },
    quotedPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    estimatedDelivery: {
      type: String,
      default: "",
      trim: true,
    },
    adminFeedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Quote =
  mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);

export default Quote;
