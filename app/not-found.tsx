import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>Sorry, that page doesn&apos;t exist. <Link href="/">Go to the home page</Link>.</p>
    </>
  );
}
