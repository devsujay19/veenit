import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().optional(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0),
});

// ─── Rate limiting — simple in-memory (per Node process) ─────────────
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Validate
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please fill in all required fields correctly." },
      { status: 422 }
    );
  }

  const { name, email, phone, subject, message } = result.data;

  // ─── Email delivery via Resend ────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

  if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
    // Configuration not set — return a clear server error (do NOT fake success)
    console.error(
      "[Contact API] Email environment variables not configured. " +
        "Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL in .env.local"
    );
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured on this server. " +
          "Please contact via WhatsApp or check back later.",
      },
      { status: 503 }
    );
  }

  const htmlBody = `
<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0D; color: #F5F2EC; padding: 40px; border: 1px solid rgba(197,164,109,0.2);">
  <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #C5A46D; margin-bottom: 24px;">New Contact Form Submission</p>
  <h2 style="font-family: Georgia, serif; font-size: 28px; font-weight: 400; color: #F5F2EC; margin-bottom: 32px;">Portfolio Enquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #A5A19A; width: 120px;">From</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #F5F2EC;">${name}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #A5A19A;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #F5F2EC;"><a href="mailto:${email}" style="color: #C5A46D;">${email}</a></td></tr>
    ${phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #A5A19A;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #F5F2EC;">${phone}</td></tr>` : ""}
    <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #A5A19A;">Subject</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #F5F2EC;">${subject}</td></tr>
  </table>
  <div style="margin-top: 28px;">
    <p style="font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #A5A19A; margin-bottom: 12px;">Message</p>
    <p style="color: #F5F2EC; line-height: 1.75; white-space: pre-wrap;">${message}</p>
  </div>
  <p style="margin-top: 40px; font-size: 11px; color: rgba(165,161,154,0.5);">Sent from veenitdeshmukh.com contact form</p>
</div>`;

  const textBody = `
New Contact Form Submission - Portfolio Enquiry
-----------------------------------------------
From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}Subject: ${subject}

Message:
${message}
-----------------------------------------------
Sent from Veenit Deshmukh Portfolio contact form.
`;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL.includes("<")
          ? FROM_EMAIL
          : `Veenit Portfolio <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("[Contact API] Resend error:", resendRes.status, errText);
      return NextResponse.json(
        {
          error:
            "Failed to send your message. Please try again or use WhatsApp.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
