// Edit this file to make the site yours. Everything else reads from it.
export const site = {
  name: "Murphy's Plumbing & Heating",
  tagline: "Reliable plumbing and heating across Sligo and Leitrim",
  description:
    "Family-run plumbers in Sligo. Boiler servicing, heat pump installs, emergency repairs. SEAI-registered, fully insured.",
  url: "https://www.example.ie", // no trailing slash
  locale: "en_IE",

  // Used for LocalBusiness structured data. Pick the most specific type from
  // https://schema.org/LocalBusiness#subtypes, e.g. "Plumber", "Dentist", "Restaurant".
  businessType: "Plumber",
  phone: "+353 71 912 3456",
  email: "hello@example.ie",
  address: {
    street: "1 Main Street",
    town: "Sligo",
    county: "Sligo",
    eircode: "F91 X2Y3",
  },
  geo: { lat: 54.2766, lng: -8.4761 },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
    { days: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  areaServed: ["Sligo", "Leitrim", "Roscommon"],
  priceRange: "€€",
  social: [
    "https://www.facebook.com/example",
    "https://www.instagram.com/example",
  ],

  // Legal footer details. Irish companies must show these on their website.
  legal: {
    companyName: "Murphy Plumbing Limited",
    croNumber: "123456",
    vatNumber: "IE1234567T",
    registeredOffice: "1 Main Street, Sligo, F91 X2Y3",
  },

  services: [
    { title: "Boiler servicing", body: "Annual oil and gas boiler services with a written safety report." },
    { title: "Heat pump installation", body: "Air-to-water heat pumps, with help applying for SEAI grants." },
    { title: "Emergency repairs", body: "Burst pipes and leaks, same-day call-outs where we can." },
  ],

  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],

  // Optional. Analytics only load after the visitor accepts cookies.
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
