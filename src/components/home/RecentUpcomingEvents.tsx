import EventCard from "@/components/events/EventCard";
import { TEvent } from "@/lib/type";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export default async function RecentUpcomingEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/recent`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recent events");
  }

  const events: TEvent[] = await res.json();

  return (
    <section className="bg-[#FAF8F5] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#687A45]">
              <CalendarDays size={17} />
              Get Involved
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#30352B] sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#77766F] sm:text-base">
              Find your next opportunity to contribute and make a
              difference in your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C76B4A] transition hover:text-[#AD583B]"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DCD6CC] bg-white px-5 py-14 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-[#687A45]"
            />
            <h3 className="mt-4 text-xl font-bold text-[#30352B]">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-sm text-[#77766F]">
              New community events will appear here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}