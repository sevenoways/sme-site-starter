import type { Metadata } from "next";
import { site } from "@/site.config.ts";

export const metadata: Metadata = { title: "Accessibility", alternates: { canonical: "/accessibility" } };

export default function Accessibility() {
  return (
    <article className="prose">
      <h1>Accessibility statement</h1>
      <p>
        We want everyone to be able to use this website. It aims to meet WCAG 2.2 level AA: you can navigate
        it with a keyboard, use it with a screen reader, zoom it to 400%, and it respects your device&apos;s
        reduced-motion and dark-mode settings.
      </p>
      <h2>Problems?</h2>
      <p>
        If anything is hard to use, tell us at <a href={`mailto:${site.email}`}>{site.email}</a> or
        call <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> and we&apos;ll help directly.
      </p>
    </article>
  );
}
