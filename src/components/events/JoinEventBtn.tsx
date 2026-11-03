"use client";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { TEvent } from "@/lib/type";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const JoinEventBtn = ({ event }: { event: TEvent }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleJoinEvent = async () => {
    if (!user) {
      toast.info("Please login to join the event");
      return;
    }

    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication failed. Please sign in again.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: event._id,
          }),
        },
      );

      if (res.status === 409) {
        toast.info("You have already joined this event.");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to join event");
      }

      toast.success("You have successfully joined the event!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleJoinEvent}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C76B4A] px-5 py-3.5 font-semibold text-white transition hover:bg-[#AD583B] active:scale-[0.98]"
    >
      <Heart size={18} />
      Join Event
    </button>
  );
};

export default JoinEventBtn;
