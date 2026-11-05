import JoinEventBtn from "@/components/events/JoinEventBtn";
import { TEvent } from "@/lib/type";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Tag,
  User,
  Heart,
  ArrowLeft,
  HandHeart,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/event/${id}`
  );

  if (!res.ok) {

    if (res.status === 404) {
      notFound();
    }

    throw new Error("Failed to fetch event details");
  }

  const event: TEvent = await res.json();
   const formattedDate = new Date(event?.eventDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  return (
    <main className="min-h-screen bg-background text-foreground mb-15">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        {/* Back Navigation */}
        <Link
          href="/events"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-secondary transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to Upcoming Events
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Event Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-64 w-full object-cover sm:h-96"
              />

              <span className="absolute left-5 top-5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground shadow-sm">
                {event.eventType}
              </span>
            </div>

            {/* Event Heading */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-secondary">
                <Heart size={17} />
                Make a difference in your community
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                {event.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-foreground">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Event Date
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                    <Tag size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Event Category
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <User size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Organized By
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      {event.userName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Event */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-card-foreground">
                Let&apos;s Get Together for One More Smile
              </h2>

              <p className="text-sm leading-7 text-muted-foreground">
                Every event brings an opportunity to contribute to a better
                community. Take part, share your effort, and help turn positive
                intentions into meaningful action.
              </p>
            </div>
          </div>

          {/* Join Event Sidebar */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HandHeart size={25} />
            </div>

            <h2 className="text-xl font-bold text-card-foreground">
              Be Part of the Change
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your time and support can create a meaningful impact. Join this
              event and make a difference together.
            </p>

            <div className="my-6 space-y-4 border-y border-border py-5">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CalendarDays size={18} className="text-primary" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-secondary" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users size={18} className="text-secondary" />
                <span>{event.participantCount ?? 0} people joined</span>
              </div>
            </div>

            <JoinEventBtn event={event} />

            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              Be a part of something meaningful. Every contribution counts!
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}