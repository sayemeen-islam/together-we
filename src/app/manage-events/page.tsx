import ManageEventCard from "@/components/events/ManageEventCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { TEvent } from "@/lib/type";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function ManageEventsPage() {
  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your events");
  }

  const events: TEvent[] = await res.json();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-9 border-b border-border pb-7 sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Your Activities
          </span>

          <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Manage Events
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Manage the events you have created. You can update or delete
            your events whenever needed.
          </p>
        </div>

        {events.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              You have created {events.length}{" "}
              {events.length === 1 ? "event" : "events"}.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <ManageEventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-secondary"
            />

            <h2 className="mt-4 text-xl font-bold text-card-foreground">
              No Events Created Yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Start an initiative and bring your community together.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Create Event
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}