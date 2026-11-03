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
    <AlertDialogTrigger >
      <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-[#E8C8BD] px-3 py-2.5 text-sm font-semibold text-[#C76B4A] transition hover:bg-[#C76B4A] hover:text-white">
        <Trash2 size={15} />
        Delete
      </button>
    </AlertDialogTrigger>

    <AlertDialogContent className="border-[#EAE5DF] bg-[#FAF8F5]">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-[#30352B]">
          Delete Event?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-[#77766F]">
          Are you sure you want to delete this event? This action cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel className="border-[#DCD6CC]">
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          onClick={handleDelete}
          className="bg-[#C76B4A] text-white hover:bg-[#AD583B]"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
  
}