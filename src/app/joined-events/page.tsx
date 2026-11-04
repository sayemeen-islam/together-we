import EventCard from "@/components/events/EventCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { TEvent } from "@/lib/type";
import { Heart, CalendarDays } from "lucide-react";
import Link from "next/link";

type TJoinedEvent = {
  _id: string;
  event: TEvent;
};

export default async function JoinedEventsPage() {
  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/joined-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch joined events");
  }

  const joinedEvents: TJoinedEvent[] = await res.json();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        {/* Page Heading */}
        <div className="mb-9 border-b border-border pb-7 sm:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Your Contributions
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Keep track of the community events you have joined.
            Every small contribution helps create a better tomorrow.
          </p>
        </div>

        {/* Events Grid */}
        {joinedEvents.length > 0 ? (
          <>
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={17} className="text-primary" />
              <span>
                You have joined {joinedEvents.length}{" "}
                {joinedEvents.length === 1 ? "event" : "events"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {joinedEvents.map((item) => (
                <EventCard key={item._id} event={item.event} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays size={30} />
            </div>

            <h2 className="text-xl font-bold text-card-foreground">
              No Joined Events Yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You haven&apos;t joined any events yet. Explore upcoming
              events and find an opportunity to make a difference.
            </p>

            <Link
              href="/events"
              className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore Events
            </Link>
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-border pt-7 text-center">
          <Heart size={16} className="shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Thank you for being part of the change.
          </p>
        </div>
      </section>
    </main>
  );
}