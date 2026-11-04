"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { TEvent } from "@/lib/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// Get today's date in local time
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Validation schema
const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  eventType: z.string().min(1, "Please select an event type"),
  thumbnail: z.string().url("Please enter a valid image URL"),
  location: z.string().min(3, "Please enter a valid location"),
  eventDate: z
    .string()
    .refine(
      (date) => date > getToday(),
      "Event date must be in the future"
    ),
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

export default function EditEventDialog({ event }: { event: TEvent }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate,
    },
  });

  const selectedType = useWatch({
    control,
    name: "eventType",
  });

  const onSubmit = async (values: EventFormValues) => {
    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Please sign in again.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      toast.success("Event updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="h-11 flex-1 w-full border-secondary text-secondary font-semibold hover:bg-secondary dark:hover:bg-secondary hover:text-secondary-foreground"
        >
          <Pencil size={15} />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-card-foreground">
            Update Event
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            Update your event information below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Event Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-card-foreground"
            >
              Event Title
            </label>

            <Input
              id="title"
              {...register("title")}
              className="h-11 border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />

            {errors.title && (
              <p className="text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-card-foreground"
            >
              Event Description
            </label>

            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              className="resize-none border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />

            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">
              Event Type
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
              <SelectTrigger className="h-11 w-full border-input bg-background text-foreground">
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
              Event Date
            </label>

            <Input
              id="eventDate"
              type="date"
              min={getToday()}
              {...register("eventDate")}
              className="h-11 border-input bg-background text-foreground focus-visible:ring-primary"
            />

            {errors.eventDate && (
              <p className="text-xs text-red-500">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-semibold text-card-foreground"
            >
              Event Location
            </label>

            <Input
              id="location"
              {...register("location")}
              className="h-11 border-input bg-background text-foreground focus-visible:ring-primary"
            />

            {errors.location && (
              <p className="text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label
              htmlFor="thumbnail"
              className="text-sm font-semibold text-card-foreground"
            >
              Thumbnail Image URL
            </label>

            <Input
              id="thumbnail"
              type="url"
              {...register("thumbnail")}
              className="h-11 border-input bg-background text-foreground focus-visible:ring-primary"
            />

            {errors.thumbnail && (
              <p className="text-xs text-red-500">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:opacity-90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={17} />
                Updating Event...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}