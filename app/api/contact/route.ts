import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact.ts";
import { sendEnquiry } from "@/lib/send.ts";

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
// Fine for a single small server; use a shared store (e.g. Upstash) on serverless.
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 10_000) hits.clear(); // bound memory under abuse
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, errors: { form: "Too many messages. Please try again later." } }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
    if (typeof body !== "object" || body === null || Array.isArray(body)) throw new Error();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) return NextResponse.json(result, { status: 422 });

  try {
    await sendEnquiry(result.data);
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Sorry, we couldn't send your message. Please call or email us instead." } },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
