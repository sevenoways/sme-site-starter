import type { Metadata } from "next";
import { site } from "@/site.config.ts";
import ContactForm from "@/components/ContactForm.tsx";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} in ${site.address.town}. Call ${site.phone} or send us a message.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const { address } = site;
  return (
    <div className="two-col">
      <section>
        <h1>Contact us</h1>
        <ContactForm />
      </section>
      <aside aria-label="Contact details">
        <h2>Find us</h2>
        <address>
          {address.street}<br />{address.town}<br />Co. {address.county}<br />{address.eircode}
        </address>
        <p>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a><br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Opening hours</h2>
        <dl className="hours">
          {site.openingHours.map((h) => (
            <div key={h.days.join()}>
              <dt>{h.days.length > 1 ? `${h.days[0]} to ${h.days[h.days.length - 1]}` : h.days[0]}</dt>
              <dd>{h.opens} to {h.closes}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
