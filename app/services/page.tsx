import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config.ts";

export const metadata: Metadata = {
  title: "Services",
  description: `Services from ${site.name} in ${site.address.town}: ${site.services.map((s) => s.title).join(", ")}.`,
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <h1>Services</h1>
      {site.services.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.body}</p>
        </section>
      ))}
      <p><Link className="btn" href="/contact">Ask about a job</Link></p>
    </>
  );
}
