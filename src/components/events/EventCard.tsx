import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import { TEvent } from "@/lib/type";

const EventCard = ({ event }: { event: TEvent }) => {
  const {
    _id,
    title,
    location,
    eventType,
    eventDate,
    thumbnail,
  } = event;

  const formattedDate = new Date(eventDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10">
      {/* Event Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Event Type */}
        <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold tracking-wide text-secondary-foreground shadow-sm">
          {eventType}
        </span>
      </div>

      {/* Event Information */}
      <div className="p-5">
        <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <div className="space-y-3 text-sm text-muted-foreground">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-secondary" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* View Event */}
        <div className="mt-5 border-t border-border pt-4">
          <Link
            href={`/events/${_id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View Event
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;