"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Consent = "accepted" | "rejected" | null;
const KEY = "cookie-consent-v1";

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function loadGoogleAnalytics(id: string) {
  if (!/^G-[A-Z0-9]+$/.test(id) || document.getElementById("ga-script")) return;
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
}

/**
 * GDPR / ePrivacy-friendly banner: nothing non-essential loads until the visitor
 * clicks Accept, and Reject is as easy as Accept (Data Protection Commission guidance).
 * Visitors can change their mind via any element with data-cookie-settings.
 */
export default function CookieConsent({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>("rejected"); // hidden until we read storage
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setReady(true);
    if (c === "accepted" && gaId) loadGoogleAnalytics(gaId);

    const reopen = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cookie-settings]")) setConsent(null);
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, [gaId]);

  function choose(c: Exclude<Consent, null>) {
    try { localStorage.setItem(KEY, c); } catch { /* storage blocked: ask again next visit */ }
    setConsent(c);
    if (c === "accepted" && gaId) loadGoogleAnalytics(gaId);
    if (c === "rejected" && document.getElementById("ga-script")) location.reload();
  }

  if (!ready || consent !== null) return null;
  return (
    <section className="cookie-banner" role="dialog" aria-live="polite" aria-labelledby="cookie-title">
      <h2 id="cookie-title">Cookies</h2>
      <p>
        We use essential cookies to run this site. With your permission we'd also like to use analytics
        cookies to see how the site is used. <Link href="/cookies">Read our cookie policy</Link>.
      </p>
      <div className="cookie-actions">
        <button className="btn" onClick={() => choose("accepted")}>Accept analytics</button>
        <button className="btn" onClick={() => choose("rejected")}>Reject</button>
      </div>
    </section>
  );
}
