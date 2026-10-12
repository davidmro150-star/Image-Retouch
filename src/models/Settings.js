// src/models/Settings.js
import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "home_hero_slider"
    value: { type: mongoose.Schema.Types.Mixed, required: true } // Stores our before/after URLs array
  },
  { timestamps: true }
);

// ⚡ SYNTAX FIX: Using export default instead of return statement
export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
