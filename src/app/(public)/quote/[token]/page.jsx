
const emailConfigured = Boolean(
  process.env.RESEND_API_KEY &&
  process.env.RESEND_FROM_EMAIL
);

// Create a new private link whenever a quote is marked Quoted.
const rawToken =
  status === "Quoted" && emailConfigured
    ? randomBytes(32).toString("hex")
    : null;

const tokenHash = rawToken
  ? createHash("sha256").update(rawToken).digest("hex")
  : null;

const updatedQuote = await Quote.findByIdAndUpdate(
  id,
  {
    $set: {
      quotedPrice,
      estimatedDelivery,
      adminFeedback,
      status,
      quoteTokenHash: tokenHash,
      quoteTokenExpiresAt: rawToken
        ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        : null,
    },
  },
  {
    new: true,
    runValidators: true,
  }
);

if (!updatedQuote) {
  return NextResponse.json(
    { error: "Quote request not found." },
    { status: 404 }
  );
}

let emailSent = false;
let emailError = "";

if (status === "Quoted") {
  if (!rawToken) {
    emailError =
      "Quote saved, but email is not configured. Check Resend environment variables.";
  } else {
    try {
      const baseUrl = (
        process.env.APP_URL || request.nextUrl.origin
      ).replace(/\/+$/, "");

      const quoteUrl =
        `${baseUrl}/quote/${rawToken}`;

      await sendQuoteEmail({
        quote: updatedQuote,
        quoteUrl,
      });

      emailSent = true;
    } catch (error) {
      console.error("Quote email failed:", error);

      emailError =
        "Quote saved, but the email could not be sent. Save the response again to generate a new link and retry.";
    }
  }
}

return NextResponse.json({
  success: true,
  data: updatedQuote,
  emailSent,
  ...(emailError ? { emailError } : {}),
});
