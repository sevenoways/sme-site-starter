import { isValidEircode, formatEircode, isValidIrishPhone, toE164 } from "irish-validators";

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  eircode?: string;
  message: string;
}

export type ContactResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: Partial<Record<keyof ContactInput | "form", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, phone: 30, eircode: 10, message: 5000 };

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Validates and normalises a contact form submission. Pure function so it can be
 * used both in the browser (instant feedback) and on the server (the real check).
 * `website` is a honeypot field: real visitors never see or fill it.
 */
export function validateContact(raw: Record<string, unknown>): ContactResult {
  if (str(raw.website)) return { ok: false, errors: { form: "Submission rejected." } };

  const name = str(raw.name);
  const email = str(raw.email).toLowerCase();
  const phone = str(raw.phone);
  const eircode = str(raw.eircode);
  const message = str(raw.message);
  const errors: Partial<Record<keyof ContactInput | "form", string>> = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "Please enter a valid email address.";

  if (phone && (phone.length > LIMITS.phone || !isValidIrishPhone(phone)))
    errors.phone = "Please enter a valid Irish phone number, e.g. 087 123 4567.";

  if (eircode && (eircode.length > LIMITS.eircode || !isValidEircode(eircode)))
    errors.eircode = "Please enter a valid Eircode, e.g. F91 X2Y3.";

  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone ? toE164(phone)! : undefined,
      eircode: eircode ? formatEircode(eircode)! : undefined,
      message,
    },
  };
}
