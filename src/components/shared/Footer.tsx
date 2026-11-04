import Link from "next/link";
import { Heart, ArrowUpRight, Users } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Recent Upcoming Events", href: "#recent-upcoming-events" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Newsletter", href: "/#newsletter" },
];

const getInvolvedLinks = [
  { label: "All Upcoming Events", href: "/events" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.6V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.2V13H10v8h3.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r=".8"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.2 0h3.6v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5V21h-3.8v-6c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.5V9Z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="scale-[0.8]"
      >
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#30352B] text-white dark:border-t dark:border-border dark:bg-card dark:text-card-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 dark:border-border">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Users size={25} />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Together<span className="text-[#C76B4A] dark:text-primary">We</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65 dark:text-muted-foreground">
              Bringing people together through kindness, compassion, and
              community service. Every small action can create a meaningful
              difference.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon, label }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/75 transition hover:border-[#C76B4A] hover:bg-[#C76B4A] hover:text-white dark:border-border dark:text-muted-foreground dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
                >
                  <span className="h-[18px] w-[18px]">{icon}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-[#D88A6D] dark:text-muted-foreground dark:hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Get Involved</h3>

            <ul className="space-y-3">
              {getInvolvedLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-[#D88A6D] dark:text-muted-foreground dark:hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50 dark:text-muted-foreground">
            © {new Date().getFullYear()} Together We. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-white/60 dark:text-muted-foreground">
            Made with
            <Heart
              size={13}
              className="fill-[#C76B4A] text-[#C76B4A] dark:fill-primary dark:text-primary"
            />
            for a better community
          </p>

          <Link
            href="/events"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#D88A6D] transition hover:text-white dark:text-primary dark:hover:text-card-foreground"
          >
            Make a Difference
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}