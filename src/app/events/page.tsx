import EventCard from "@/components/events/EventCard";
import { TEvent } from "@/lib/type";

export default async function UpcomingEventsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming events");
  }

  const events: TEvent[] = await res.json();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        {/* Page Heading */}
        <div className="mb-9 border-b border-border pb-7 sm:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Explore & Participate
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Discover meaningful community events, connect with
            like-minded people, and find opportunities to make a
            positive difference.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {events.length > 0 ? (
            events.map((event: TEvent) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p className="col-span-full py-16 text-center text-muted-foreground">
              No upcoming events available at the moment.
            </p>
          )}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-border pt-7 text-center">
          <svg
            className="h-4 w-4 shrink-0 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Small actions create meaningful change.
          </p>
        </div>
      </section>
    </main>
  );
}