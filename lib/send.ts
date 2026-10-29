import type { ContactInput } from "./contact.ts";
import { site } from "../site.config.ts";

/**
 * Delivers a contact enquiry. Uses Resend (https://resend.com) when RESEND_API_KEY
 * is set; otherwise logs to the server console so the form works in development.
 * Swap this function out for any other provider.
 */
export async function sendEnquiry(data: ContactInput): Promise<void> {
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.eircode && `Eircode: ${data.eircode}`,
    "",
    data.message,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[contact] RESEND_API_KEY not set; enquiry logged instead of emailed:\n" + text);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `Website <noreply@${new URL(site.url).hostname.replace(/^www\./, "")}>`,
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: data.email,
      subject: `New enquiry from ${data.name.replace(/[\r\n]+/g, " ")}`,
      text, // plain text only: no HTML injection surface
    }),
  });
  if (!res.ok) throw new Error(`Email provider returned ${res.status}`);
}
