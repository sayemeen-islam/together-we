import DeleteEventBtn from "@/components/events/DeleteEventBtn";
import EditEventDialog from "@/components/events/EditEventDialog";
import { TEvent } from "@/lib/type";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

export default function ManageEventCard({ event }: { event: TEvent }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white">
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

        <div className="mt-5 flex gap-2 border-t border-[#EAE5DF] pt-4">
          <Link
            href={`/events/${event._id}`}
            className="flex  flex-1 items-center justify-center rounded-lg bg-[#687A45] px-2 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#536337] sm:text-sm"
          >
            View
          </Link>

          <EditEventDialog event={event} />

          <DeleteEventBtn id={event._id!} />
        </div>
      </div>
    </article>
  );
}
