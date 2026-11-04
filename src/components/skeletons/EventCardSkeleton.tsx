import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Thumbnail */}
      <Skeleton className="h-52 w-full rounded-none" />

      {/* Event Information */}
      <div className="p-5">
        <Skeleton className="mb-4 h-6 w-3/4" />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>

        {/* View Event Button */}
        <div className="mt-5 border-t border-border pt-4">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </article>
  );
};

export default EventCardSkeleton;
