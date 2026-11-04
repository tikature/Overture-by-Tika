import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = parsed.data;

    // Honeypot check
    if (website) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // If Resend not configured, return 503 for fallback
    if (!process.env.RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      return NextResponse.json(
        { error: "Email service not configured", fallback: true },
        { status: 503 }
      );
    }

    // Dynamically import Resend
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email via Resend
    await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #1B0509; color: #EFE2C6;">
          <h2 style="font-family: 'Playfair Display', serif; color: #FFF5E1; font-size: 24px; margin-bottom: 16px;">New Dispatch Received</h2>
          <p style="color: #E6D7B9; font-size: 14px; line-height: 1.6;">A new message has arrived at the Maestro's backstage.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #DCC8A3; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
              <td style="padding: 8px 0; color: #EFE2C6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #DCC8A3; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 8px 0; color: #EFE2C6;"><a href="mailto:${email}" style="color: #F7ECD4;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #DCC8A3; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Subject</td>
              <td style="padding: 8px 0; color: #EFE2C6;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #24070D; border: 1px solid rgba(220,200,163,0.2); border-radius: 8px;">
            <p style="color: #DCC8A3; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Message</p>
            <p style="color: #EFE2C6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}