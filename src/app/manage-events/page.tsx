

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
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-9 border-b border-[#EAE5DF] pb-7 sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#687A45]">
            Your Activities
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#30352B] sm:text-4xl">
            Manage Events
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77766F] sm:text-base">
            Manage the events you have created. You can update or delete
            your events whenever needed.
          </p>
        </div>

        {events.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-[#77766F]">
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
          <div className="rounded-2xl border border-dashed border-[#DCD6CC] bg-white px-5 py-16 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-[#687A45]"
            />

            <h2 className="mt-4 text-xl font-bold text-[#30352B]">
              No Events Created Yet
            </h2>

            <p className="mt-2 text-sm text-[#77766F]">
              Start an initiative and bring your community together.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-[#C76B4A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#AD583B]"
            >
              Create Event
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
