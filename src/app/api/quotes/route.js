// src/app/api/quotes/route.js
import { connectToDatabase } from "@/lib/db";
import Quote from "@/models/Quote";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const { fullName, email, service, imageCount, instructions } = body;

    // Simple backend data safety check
    if (!fullName || !email || !service || !imageCount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newQuote = await Quote.create({
      fullName,
      email,
      service,
      imageCount,
      instructions,
    });

    return new Response(JSON.stringify({ success: true, data: newQuote }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
