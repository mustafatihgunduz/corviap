import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const sanitizeLine = (value: string) =>
  value.replace(/\r/g, "").replace(/\n/g, " ").trim();

const sanitizeMessage = (value: string) => value.replace(/\r/g, "").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let payload: ContactPayload | null = null;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = sanitizeLine(payload?.name ?? "");
  const email = sanitizeLine(payload?.email ?? "");
  const message = sanitizeMessage(payload?.message ?? "");

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = process.env.RESEND_TO?.trim() || "info@corviap.com";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  if (!from) {
    return NextResponse.json(
      { ok: false, error: "Sender email is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Contact Form - ${name} (${email})`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
  });

  if (error) {
    const statusCode =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    const message = error.message || "Email could not be sent.";
    console.error("Resend email send failed", {
      name: error.name,
      message,
      statusCode,
      from,
      to,
      replyTo: email,
    });

    return NextResponse.json(
      { ok: false, error: message },
      { status: statusCode }
    );
  }

  return NextResponse.json({ ok: true });
}
