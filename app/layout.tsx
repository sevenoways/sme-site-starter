import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config.ts";
import { localBusinessJsonLd, jsonLdScript } from "@/lib/schema.ts";
import CookieConsent from "@/components/CookieConsent.tsx";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.address.town}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: site.locale, siteName: site.name, url: site.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { legal, address } = site;
  return (
    <html lang="en-IE">
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">{site.name}</Link>
            <nav aria-label="Main">
              <ul>
                {site.nav.map((n) => (
                  <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
                ))}
              </ul>
            </nav>
            <a className="btn btn-small" href={`tel:${site.phone.replace(/\s/g, "")}`}>Call {site.phone}</a>
          </div>
        </header>

        <main id="main" className="container">{children}</main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <address>
              <strong>{site.name}</strong><br />
              {address.street}, {address.town}, Co. {address.county}, {address.eircode}<br />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
            <p className="legal">
              {legal.companyName}. Registered in Ireland, CRO no. {legal.croNumber}. Registered office: {legal.registeredOffice}. VAT no. {legal.vatNumber}.
            </p>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </footer>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd()) }} />
        <CookieConsent gaId={site.gaMeasurementId} />
      </body>
    </html>
  );
}
