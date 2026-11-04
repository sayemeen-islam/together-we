"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  ImagePlus,
  Leaf,
  ArrowRight,
  Loader2,
  Users,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

// Get today's date in local time (not UTC)
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Validation schema
const eventSchema = z.object({
  title: z.string().min(1, "This field is required.").min(5, "Title must be at least 5 characters"),
  description: z.string().min(1, "This field is required.").min(20, "Description must be at least 20 characters"),
  eventType: z.string().min(1, "This field is required."),
  thumbnail: z.string().min(1, "This field is required.").url("Please enter a valid image URL"),
  location: z.string().min(1, "This field is required.").min(3, "Please enter a valid location"),
  eventDate: z
    .string()
    .min(1, "This field is required.")
    .refine((date) => date > getToday(), "Event date must be in the future"),
});

type EventFormValues = z.infer<typeof eventSchema>;

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Healthcare",
  "Blood Donation",
  "Education",
  "Awareness",
  "Community Support",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "",
      thumbnail: "",
      location: "",
      eventDate: "",
    },
  });

  const selectedType = useWatch({
    control,
    name: "eventType",
  });

  const onSubmit = async (values: EventFormValues) => {
    if (!session?.user?.email) {
      toast.error("Please sign in to create an event.");
      return;
    }

    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication failed. Please sign in again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const resData = await response.json();

      if (resData.insertedId) {
        toast.success("Your event has been created successfully!");
        router.push("/events");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <Loader2 className="animate-spin text-secondary" size={30} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground md:px-8 ">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
            <Leaf className="text-secondary" size={28} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Make a Difference
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            Bring people together for a meaningful cause. Share your initiative
            and inspire your community to make a positive impact.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Card Header */}
          <div className="border-b border-border bg-muted/40 px-6 py-5 md:px-10">
            <h2 className="text-lg font-bold text-card-foreground">
              Event Information
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to publish your event.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7 p-6 md:p-10"
          >
            {/* Event Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-card-foreground"
              >
                Event Title <span className="text-primary">*</span>
              </label>

              <Input
                id="title"
                placeholder="e.g. Community Tree Plantation Drive"
                {...register("title")}
                className="h-12 border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />

              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-card-foreground"
              >
                Event Description <span className="text-primary">*</span>
              </label>

              <Textarea
                id="description"
                placeholder="Tell people about your event, its purpose and how they can participate..."
                rows={5}
                {...register("description")}
                className="resize-none border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />

              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Event Type & Date */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Event Type <span className="text-primary">*</span>
                </label>

                <Select
                  value={selectedType}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setValue("eventType", value, {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="h-12 w-full border-input bg-background text-foreground">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>

                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.eventType && (
                  <p className="text-xs text-red-500">
                    {errors.eventType.message}
                  </p>
                )}
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label
                  htmlFor="eventDate"
                  className="text-sm font-semibold text-card-foreground"
                >
                  Event Date <span className="text-primary">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    size={18}
                  />
                  <Input
                    id="eventDate"
                    type="date"
                    min={getToday()}
                    {...register("eventDate")}
                    className="h-12 border-input bg-background pl-10 text-foreground"
                  />
                </div>

                {errors.eventDate && (
                  <p className="text-xs text-red-500">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-card-foreground"
              >
                Event Location <span className="text-primary">*</span>
              </label>

              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={18}
                />
                <Input
                  id="location"
                  placeholder="e.g. Dhanmondi Lake, Dhaka"
                  {...register("location")}
                  className="h-12 border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {errors.location && (
                <p className="text-xs text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-2">
              <label
                htmlFor="thumbnail"
                className="text-sm font-semibold text-card-foreground"
              >
                Thumbnail Image URL <span className="text-primary">*</span>
              </label>

              <div className="relative">
                <ImagePlus
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={18}
                />
                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  {...register("thumbnail")}
                  className="h-12 border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {errors.thumbnail && (
                <p className="text-xs text-red-500">
                  {errors.thumbnail.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Provide a publicly accessible image URL.
              </p>
            </div>

            {/* Creator Information */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/5 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                <Users size={19} className="text-secondary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Event Organizer</p>
                <p className="truncate text-sm font-semibold text-card-foreground">
                  {session?.user.email}
                </p>
              </div>

              <span className="ml-auto shrink-0 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                Verified Session
              </span>
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-border text-foreground hover:bg-muted"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={17} />
                    Creating Event...
                  </>
                ) : (
                  <>
                    Create Event
                    <ArrowRight className="ml-2" size={17} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Together, We Make a Difference.
        </p>
      </div>
    </main>
  );
}