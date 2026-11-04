import DeleteEventBtn from "@/components/events/DeleteEventBtn";
import EditEventDialog from "@/components/events/EditEventDialog";
import { TEvent } from "@/lib/type";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

export default function ManageEventCard({ event }: { event: TEvent }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="text-xs font-semibold text-secondary">
          {event.eventType}
        </span>

        <h2 className="mt-2 line-clamp-1 text-lg font-bold text-card-foreground">
          {event.title}
        </h2>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-primary" />
            {event.eventDate}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-secondary" />
            {event.location}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2  border-t border-border pt-4">
          <Link
            href={`/events/${event._id}`}
            className="flex flex-1 w-full items-center justify-center rounded-lg bg-secondary px-2 py-2.5 text-center text-xs font-semibold text-secondary-foreground transition hover:opacity-90 sm:text-sm"
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