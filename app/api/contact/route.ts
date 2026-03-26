import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const sanitize = (value: string) =>
  value.replace(/\r/g, "").replace(/\n/g, " ").trim();

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

  const name = sanitize(payload?.name ?? "");
  const email = sanitize(payload?.email ?? "");
  const message = sanitize(payload?.message ?? "");

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
  const to = "info@corviap.com";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `${name} <${email}>`,
    to,
    replyTo: `${name} <${email}>`,
    subject: `Contact Form - ${name} (${email})`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${message.replace(/\n/g, "<br />")}</p>`,
  });

  if (error) {
    const statusCode =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    const message = error.message || "Email could not be sent.";
    console.error("Resend email send failed", {
      name: error.name,
      message,
      statusCode,
      from: email,
      to,
    });

    return NextResponse.json(
      { ok: false, error: message },
      { status: statusCode }
    );
  }

  return NextResponse.json({ ok: true });
}
