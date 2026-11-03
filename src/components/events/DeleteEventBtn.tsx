"use client";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteEventBtn({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/${id}`,
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
    <button
      onClick={handleDelete}
      className="flex  flex-1 items-center justify-center gap-2 rounded-lg border border-[#E8C8BD] px-3 py-2.5 text-sm font-semibold text-[#C76B4A] transition hover:bg-[#C76B4A] hover:text-white"
    >
      <Trash2 size={15} />
      Delete
    </button>
  );
}