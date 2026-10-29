import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie policy", alternates: { canonical: "/cookies" } };

export default function Cookies() {
  return (
    <article className="prose">
      <h1>Cookie policy</h1>
      <p>This site uses two kinds of storage:</p>
      <table>
        <thead>
          <tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Type</th><th scope="col">Duration</th></tr>
        </thead>
        <tbody>
          <tr><td>cookie-consent-v1</td><td>Remembers your cookie choice</td><td>Essential (local storage)</td><td>Until cleared</td></tr>
          <tr><td>_ga, _ga_*</td><td>Google Analytics: anonymous usage statistics</td><td>Analytics, only with consent</td><td>Up to 2 years</td></tr>
        </tbody>
      </table>
      <p>Analytics cookies are never set unless you click &ldquo;Accept analytics&rdquo;.</p>
      <p><button className="btn" data-cookie-settings>Change cookie settings</button></p>
    </article>
  );
}
