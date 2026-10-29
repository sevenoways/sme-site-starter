import Link from "next/link";
import { site } from "@/site.config.ts";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>{site.tagline}</h1>
        <p className="lead">{site.description}</p>
        <div className="hero-actions">
          <Link className="btn" href="/contact">Get a quote</Link>
          <a className="btn btn-outline" href={`tel:${site.phone.replace(/\s/g, "")}`}>Call {site.phone}</a>
        </div>
      </section>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading">What we do</h2>
        <ul className="cards">
          {site.services.map((s) => (
            <li key={s.title} className="card">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="area-heading">
        <h2 id="area-heading">Areas we cover</h2>
        <p>{site.areaServed.join(", ")} and surrounding areas.</p>
      </section>
    </>
  );
}
