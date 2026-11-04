import EventCardSkeleton from "@/components/skeletons/EventCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const RecentUpcomingEventsSkeleton = () => {
  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Skeleton className="h-5 w-40" />

            <Skeleton className="mt-3 h-9 w-72 sm:h-10" />

            <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          </div>

          <Skeleton className="h-5 w-36" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentUpcomingEventsSkeleton;
