import ManageEventCardSkeleton from "@/components/skeletons/ManageEventCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-9 border-b border-border pb-7 sm:mb-12">
          <Skeleton className="h-4 w-36" />

          <Skeleton className="mt-3 h-9 w-56 sm:h-10 sm:w-64" />

          <div className="mt-3 max-w-2xl space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ManageEventCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
