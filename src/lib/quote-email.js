
import { Resend } from "resend";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export async function sendQuoteEmail({ quote, quoteUrl }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = escapeHtml(quote.fullName);
  const service = escapeHtml(quote.service);
  const imageCount = escapeHtml(quote.imageCount);
  const price = escapeHtml(quote.quotedPrice);
  const delivery = escapeHtml(quote.estimatedDelivery);
  const feedback = escapeHtml(quote.adminFeedback || "No additional feedback.");

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [quote.email],
    subject: "Your Prism Studio quote is ready",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#171717;line-height:1.6">
        <h1>Your quote is ready</h1>
        <p>Hello ${name},</p>
        <p>Thank you for choosing Prism Studio. Your quote has been reviewed.</p>

        <div style="border:1px solid #e5e5e5;border-radius:12px;padding:20px;margin:24px 0">
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Estimated images:</strong> ${imageCount}</p>
          <p><strong>Quoted price:</strong> ${price}</p>
          <p><strong>Estimated delivery:</strong> ${delivery}</p>
          <p><strong>Message:</strong> ${feedback}</p>
        </div>

        <p>Please review the details and choose whether to accept or decline.</p>
        <p>
          <a href="${quoteUrl}" style="display:inline-block;background:#171717;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">
            Review Your Quote
          </a>
        </p>
        <p style="font-size:13px;color:#737373">
          This private link expires in 14 days and becomes invalid after you respond.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message || "Resend could not send the email.");
  }

  return data;
}
