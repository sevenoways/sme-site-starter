import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "../lib/contact.ts";
import { jsonLdScript } from "../lib/schema.ts";

const good = { name: "Aoife", email: "Aoife@Example.ie", message: "Boiler is making a noise." };

test("accepts a minimal valid enquiry and normalises fields", () => {
  const r = validateContact({ ...good, phone: "087 123 4567", eircode: "f91x2y3" });
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.data.email, "aoife@example.ie");
    assert.equal(r.data.phone, "+353871234567");
    assert.equal(r.data.eircode, "F91 X2Y3");
  }
});

test("rejects bad phone, eircode, email and short message", () => {
  const r = validateContact({ name: "", email: "nope", phone: "12345", eircode: "ZZZ", message: "hi" });
  assert.ok(!r.ok);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["eircode", "email", "message", "name", "phone"]);
});

test("honeypot rejects bots", () => {
  assert.ok(!validateContact({ ...good, website: "http://spam" }).ok);
});

test("ignores non-string input types", () => {
  const r = validateContact({ name: { $ne: 1 }, email: ["a@b.ie"], message: 42 });
  assert.ok(!r.ok);
});

test("JSON-LD cannot break out of its script tag", () => {
  assert.ok(!jsonLdScript({ x: "</script><script>alert(1)</script>" }).includes("</script>"));
});
