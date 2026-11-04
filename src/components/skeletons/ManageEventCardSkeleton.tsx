import { Skeleton } from "@/components/ui/skeleton";

const ManageEventCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Thumbnail */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-5">
        <Skeleton className="h-3 w-16" />

        <Skeleton className="mt-2 h-6 w-3/4" />

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </article>
  );
};

export default ManageEventCardSkeleton;
