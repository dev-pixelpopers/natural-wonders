import nodemailer from "nodemailer";
import { interestLabel, validateContact } from "@/lib/contact";

export const runtime = "nodejs";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return {
    user,
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    }),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { data, errors, ok } = validateContact((body ?? {}) as Record<string, unknown>);

  // Bots fill the hidden field: pretend it worked and drop the message.
  if (data.company_website) return Response.json({ ok: true });

  if (!ok) {
    return Response.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const transport = getTransport();
  if (!transport) {
    console.error("[contact] GMAIL_USER / GMAIL_APP_PASSWORD are not set in the environment.");
    return Response.json(
      { ok: false, error: "Our contact form is temporarily unavailable. Please email us directly." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || transport.user;
  const interest = interestLabel(data.interest);
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Area of interest", interest],
  ];

  try {
    await transport.transporter.sendMail({
      from: `"Natural Wunderz Website" <${transport.user}>`,
      to,
      replyTo: { name: data.name, address: data.email },
      subject: `New inquiry: ${interest} from ${data.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#404b43;max-width:600px">
          <h2 style="margin:0 0 16px">New website inquiry</h2>
          <table cellpadding="6" style="border-collapse:collapse">
            ${rows.map(([k, v]) => `<tr><td style="font-weight:bold;padding-right:16px">${k}</td><td>${escape(v)}</td></tr>`).join("")}
          </table>
          <h3 style="margin:24px 0 8px">Message</h3>
          <p style="white-space:pre-wrap;margin:0">${escape(data.message)}</p>
        </div>`,
    });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return Response.json(
      { ok: false, error: "We couldn’t send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
