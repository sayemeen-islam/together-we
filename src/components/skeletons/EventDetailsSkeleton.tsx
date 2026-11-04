import { Skeleton } from "@/components/ui/skeleton";

const EventDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-background text-foreground mb-15">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        {/* Back Navigation */}
        <Skeleton className="mb-7 h-5 w-48" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Event Image */}
            <Skeleton className="h-64 w-full rounded-2xl sm:h-96" />

            {/* Event Heading */}
            <div>
              <Skeleton className="mb-3 h-4 w-64" />

              <Skeleton className="h-9 w-3/4 sm:h-10" />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            {/* Event Information */}
            <div>
              <Skeleton className="mb-5 h-6 w-44" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
                  >
                    <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />

                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Event */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <Skeleton className="mb-4 h-6 w-64" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          {/* Join Event Sidebar */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-8">
            <Skeleton className="mb-5 h-12 w-12 rounded-xl" />

            <Skeleton className="h-6 w-40" />

            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="my-6 space-y-4 border-y border-border py-5">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>

            {/* Join Button */}
            <Skeleton className="h-13 w-full rounded-xl" />

            <Skeleton className="mx-auto mt-4 h-3 w-3/4" />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default EventDetailsSkeleton;
