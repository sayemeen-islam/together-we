"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Home, ServerOff } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ServerOff size={40} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Something Went Wrong
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          We hit a snag
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
          The server is having trouble right now.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          This is not related to the content you were looking for. It&apos;s
          likely a temporary issue on our end — please try again in a moment.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Retry
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <Home size={17} />
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-muted-foreground/70">
            Error reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
