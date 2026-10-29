# sme-site-starter

A Next.js starter for **Irish small-business websites**. Edit one config file and you have a fast site that's ready for local SEO, GDPR-friendly and accessible.

- **Local SEO built in**: schema.org `LocalBusiness` JSON-LD (address, Eircode, opening hours, areas served), sitemap, robots.txt, canonical URLs and Open Graph.
- **GDPR / ePrivacy cookie consent**: analytics only load after the visitor clicks *Accept*. *Reject* is just as prominent, and visitors can change their choice later.
- **Irish contact form**: validates Eircodes and Irish phone numbers with [irish-validators](https://github.com/sevenoways/irish-validators), normalises them (`F91 X2Y3`, `+353871234567`), and blocks spam with a honeypot field and rate limiting.
- **Accessible by default**: skip link, visible focus, labelled fields with announced errors, good colour contrast, and support for reduced motion and dark mode.
- **Company law footer**: company name, CRO number, registered office and VAT number, as Irish companies must show on their websites.
- **Template legal pages**: privacy notice, cookie policy and accessibility statement.
- No CSS framework and no UI libraries: just Next.js, React and one small validation package.

## Don't want to set it up yourself?

**Sevenoways Innovations Limited will set up this website on your server for a one-off €200 (or $250).**

That includes:
- Filling in `site.config.ts` with your business details, services, hours and company info
- Deploying it to your server or hosting (VPS, Vercel, Netlify and similar)
- Connecting your domain and setting up HTTPS
- Connecting the contact form to your email
- Checking your Google structured data passes the Rich Results Test

Not included: hosting or domain fees, custom design, or writing your page copy. Ask us about these if you need them.

👉 **[Request a setup](https://github.com/sevenoways/sme-site-starter/issues/new?template=setup-request.yml)**

## Quick start

```bash
git clone https://github.com/sevenoways/sme-site-starter my-site
cd my-site
npm install
npm run dev
```

Open http://localhost:3000, then edit **[`site.config.ts`](site.config.ts)** with your business name, address, Eircode, hours, services and company details. Every page, the schema and the footer update automatically.

## Contact form email

Enquiries are logged to the server console until you add an email provider. To send them with [Resend](https://resend.com), set:

```bash
RESEND_API_KEY=re_...
CONTACT_TO=you@yourbusiness.ie      # defaults to site.email
CONTACT_FROM="Website <noreply@yourbusiness.ie>"   # must be a domain verified in Resend
```

To use another provider, edit `lib/send.ts`.

## Analytics (optional)

Set `NEXT_PUBLIC_GA_ID=G-XXXXXXX`. Google Analytics only loads after the visitor accepts cookies.

## Before you go live

- [ ] Fill in every field in `site.config.ts` (the example business is fictional)
- [ ] Rewrite the privacy notice in `app/privacy/page.tsx` to match how you actually handle data
- [ ] Test your structured data in [Google's Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Add your logo, photos and real copy
- [ ] On serverless hosting, swap the in-memory rate limiter in `app/api/contact/route.ts` for a shared store

## Project structure

```
site.config.ts             ← your business details
app/                       ← pages, sitemap, robots, contact API
components/                ← CookieConsent, ContactForm
lib/contact.ts             ← form validation (shared by browser and server)
lib/schema.ts              ← LocalBusiness JSON-LD
lib/send.ts                ← email delivery
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm test` | Form validation and schema tests |
| `npm run typecheck` | TypeScript check |

## License

MIT © Sevenoways Innovations Limited. The legal page templates are a starting point, not legal advice.
