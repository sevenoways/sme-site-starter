import { site } from "../site.config.ts";

/** schema.org LocalBusiness JSON-LD built from site.config.ts. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": site.businessType,
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.town,
      addressRegion: `Co. ${site.address.county}`,
      postalCode: site.address.eircode,
      addressCountry: "IE",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: site.social,
  };
}

/** Serialises JSON-LD safely for a <script> tag (prevents "</script>" breakouts). */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
