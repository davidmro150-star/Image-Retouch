// src/lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// Whitelist and load tokens directly from process environment maps
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Encapsulates multi-layer image stream uploads to secure Cloudinary buckets
 * @param {string} fileBase64String - Base64 data string from frontend intake
 * @param {string} targetFolder - Subfolder destination ('portfolio', 'orders', etc)
 */
export async function uploadMediaAsset(fileBase64String, targetFolder = "prism_studio") {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileBase64String, {
      folder: targetFolder,
      resource_type: "auto", 
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Engine Ingestion Failure:", error);
    throw new Error("Media asset cloud upload failed.");
  }
}
