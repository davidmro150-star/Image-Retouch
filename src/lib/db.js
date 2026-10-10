
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is missing. Check your .env.local file."
  );
}

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        cachedConnection.promise = null;
        throw error;
      });
  }

  cachedConnection.conn = await cachedConnection.promise;

  return cachedConnection.conn;
}
