import type { Metadata } from "next";
import { site } from "@/site.config.ts";

export const metadata: Metadata = { title: "Privacy notice", alternates: { canonical: "/privacy" } };

// TEMPLATE: review this with your own data practices before going live.
export default function Privacy() {
  return (
    <article className="prose">
      <h1>Privacy notice</h1>
      <p><em>Template only. Adapt it to how your business actually handles personal data.</em></p>

      <h2>Who we are</h2>
      <p>
        {site.legal.companyName} ({site.name}), {site.legal.registeredOffice}, is the data controller for
        personal data collected through this website. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li><strong>Contact form</strong>: your name, email, and optionally phone and Eircode, so we can reply to your enquiry. Legal basis: steps taken at your request before entering a contract, or our legitimate interest in answering enquiries.</li>
        <li><strong>Analytics</strong>: only if you accept analytics cookies. Legal basis: consent, which you can withdraw at any time.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>Enquiries that don't lead to work are deleted after 12 months. Customer records are kept as long as Irish tax law requires.</p>

      <h2>Who we share it with</h2>
      <p>Our email and hosting providers process data on our behalf. We don't sell your data.</p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your data, or object to how we use it, by emailing us.
        You can also complain to the <a href="https://www.dataprotection.ie/">Data Protection Commission</a>.
      </p>
    </article>
  );
}
