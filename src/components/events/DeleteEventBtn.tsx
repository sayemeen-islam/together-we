"use client";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteEventBtn({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete event");

      toast.success("Event deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="flex h-11 w-full flex-1 items-center justify-center gap-0.5 rounded-lg border border-primary/30 px-3 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
          <Trash2 size={16} className="shrink-0" />
          <span>Delete</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-border bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-card-foreground">
            Delete Event?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-border bg-background text-foreground hover:bg-muted">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}