"use client";

import { useState } from "react";
import { validateContact, type ContactResult } from "@/lib/contact.ts";

type Errors = Extract<ContactResult, { ok: false }>["errors"];

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const local = validateContact(raw);
    if (!local.ok) {
      setErrors(local.errors);
      const first = Object.keys(local.errors)[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(raw),
    }).catch(() => null);
    const json = res ? await res.json().catch(() => null) : null;
    if (json?.ok) return setStatus("sent");
    setErrors(json?.errors ?? { form: "Something went wrong. Please try again." });
    setStatus("idle");
  }

  if (status === "sent") {
    return <p role="status" className="notice">Thanks, we've got your message and will be in touch soon.</p>;
  }

  const field = (id: "name" | "email" | "phone" | "eircode", label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="field">
      <label htmlFor={`f-${id}`}>{label}</label>
      <input
        id={`f-${id}`}
        name={id}
        aria-invalid={errors[id] ? true : undefined}
        aria-describedby={errors[id] ? `e-${id}` : undefined}
        {...props}
      />
      {errors[id] && <p id={`e-${id}`} className="error">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors.form && <p role="alert" className="error">{errors.form}</p>}
      {field("name", "Name", { autoComplete: "name", required: true })}
      {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
      {field("phone", "Phone (optional)", { type: "tel", autoComplete: "tel", placeholder: "087 123 4567" })}
      {field("eircode", "Eircode (optional)", { autoComplete: "postal-code", placeholder: "F91 X2Y3" })}
      <div className="field">
        <label htmlFor="f-message">How can we help?</label>
        <textarea
          id="f-message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "e-message" : undefined}
        />
        {errors.message && <p id="e-message" className="error">{errors.message}</p>}
      </div>
      {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="small">We only use your details to reply to you. See our <a href="/privacy">privacy notice</a>.</p>
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
