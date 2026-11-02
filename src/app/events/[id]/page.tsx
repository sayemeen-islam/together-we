import { TEvent } from "@/lib/type";
import {
  CalendarDays,
  MapPin,
  Tag,
  User,
  
  Heart,
  ArrowLeft,
  HandHeart,
} from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({ params }: {params:Promise<{id:string}>}) {
   const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/event/${id}`);
  // if (!res.ok) notFound();
  const event:TEvent = await res.json();
  console.log(event,'res in detail pg');
  
  // Sample event data for UI design
  // const event = {
  //   title: "Donate Blood, Save Lives",
  //   description:
  //     "Every drop of blood can make a difference. Join our voluntary blood donation campaign and help provide life-saving support to patients in need. Together, we can build a healthier and more caring community.",
  //   eventType: "Blood Donation",
  //   location: "Farmgate, Dhaka",
  //   eventDate: "November 25, 2026",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1400&q=80",
  //   organizer: "Community Care Team",
  // };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        {/* Back Navigation */}
        <Link
          href="/events"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#687A45] transition hover:text-[#C76B4A]"
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

              <span className="absolute left-5 top-5 rounded-full bg-[#687A45] px-4 py-2 text-xs font-semibold text-white shadow-sm">
                {event.eventType}
              </span>
            </div>

            {/* Event Heading */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#687A45]">
                <Heart size={17} />
                Make a difference in your community
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#30352B] sm:text-4xl">
                {event.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#77766F] sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-[#30352B]">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-[#EAE5DF] bg-white p-5">
                  <div className="rounded-lg bg-[#F8EAE5] p-3 text-[#C76B4A]">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-[#929087]">Event Date</p>
                    <p className="mt-1 font-semibold text-[#30352B]">
                      {event.eventDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#EAE5DF] bg-white p-5">
                  <div className="rounded-lg bg-[#EEF0E7] p-3 text-[#687A45]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-[#929087]">Location</p>
                    <p className="mt-1 font-semibold text-[#30352B]">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#EAE5DF] bg-white p-5">
                  <div className="rounded-lg bg-[#EEF0E7] p-3 text-[#687A45]">
                    <Tag size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-[#929087]">Event Category</p>
                    <p className="mt-1 font-semibold text-[#30352B]">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#EAE5DF] bg-white p-5">
                  <div className="rounded-lg bg-[#F8EAE5] p-3 text-[#C76B4A]">
                    <User size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-[#929087]">Organized By</p>
                    <p className="mt-1 font-semibold text-[#30352B]">
                      {event.userName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Event */}
            <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-[#30352B]">
                Let&apos;s Get Together for One More Smile
              </h2>

              <p className="text-sm leading-7 text-[#77766F]">
                Every event brings an opportunity to contribute to a better
                community. Take part, share your effort, and help turn positive
                intentions into meaningful action.
              </p>
            </div>
          </div>

          {/* Join Event Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#EAE5DF] bg-white p-6 shadow-sm lg:sticky lg:top-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8EAE5] text-[#C76B4A]">
              <HandHeart size={25} />
            </div>

            <h2 className="text-xl font-bold text-[#30352B]">
              Be Part of the Change
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#77766F]">
              Your time and support can create a meaningful impact. Join this
              event and make a difference together.
            </p>

            <div className="my-6 space-y-4 border-y border-[#EAE5DF] py-5">
              <div className="flex items-center gap-3 text-sm text-[#77766F]">
                <CalendarDays size={18} className="text-[#C76B4A]" />
                <span>{event.eventDate}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#77766F]">
                <MapPin size={18} className="text-[#687A45]" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* UI only: Join functionality not implemented */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C76B4A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#AD583B] active:scale-[0.98]"
            >
              <Heart size={18} />
              Join Event
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#929087]">
              Be a part of something meaningful. Every contribution counts!
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
