import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section
      id="newsletter"
      className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
<div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-12 sm:px-12 sm:py-16 dark:border dark:border-border dark:bg-card">
  <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10 dark:border-secondary/10" />
  <div className="absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-white/5 dark:bg-primary/5" />

  <div className="relative mx-auto max-w-2xl text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white dark:bg-primary/10 dark:text-primary">
      <Mail size={27} />
    </div>

    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl dark:text-card-foreground">
      Stay Connected. Stay Inspired.
    </h2>

    <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base dark:text-muted-foreground">
      Get updates about upcoming community events, inspiring
      stories, and new opportunities to make a difference.
    </p>

    <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row dark:border dark:border-border dark:bg-secondary/10">
      <input
        type="email"
        placeholder="Enter your email address"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />

      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
        Subscribe
        <Send size={16} />
      </button>
    </div>

    <p className="mt-4 text-xs text-white/65 dark:text-muted-foreground">
      Be part of a community that cares.
    </p>
  </div>
</div>
      </div>
    </section>
  );
}