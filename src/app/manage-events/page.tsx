import DeleteEventBtn from "@/components/events/DeleteEventBtn";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { TEvent } from "@/lib/type";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
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
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white"
                >
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="text-xs font-semibold text-[#687A45]">
                      {event.eventType}
                    </span>

                    <h2 className="mt-2 line-clamp-1 text-lg font-bold text-[#30352B]">
                      {event.title}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm text-[#77766F]">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-[#C76B4A]" />
                        {event.eventDate}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#687A45]" />
                        {event.location}
                      </p>
                    </div>

                    <div className="mt-5 flex gap-3 border-t border-[#EAE5DF] pt-4">
                      <Link
                        href={`/manage-events/${event._id}/edit`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#687A45] px-3 py-2.5 text-sm font-semibold text-[#687A45] transition hover:bg-[#687A45] hover:text-white"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <DeleteEventBtn id={event._id!} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DCD6CC] bg-white px-5 py-16 text-center">
            <CalendarDays size={36} className="mx-auto text-[#687A45]" />

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