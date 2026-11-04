import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchX size={40} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Page Not Found
        </p>

        <h1 className="mt-3 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
          Oops! We can&apos;t find that page.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          The page you are looking for may have been moved, deleted, or
          never existed. Let&apos;s get you back on track!
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={17} />
            Explore Events
          </Link>
        </div>
      </div>
    </main>
  );
}