"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const StartInitiativeBtn = () => {
  const { data: session } = authClient.useSession();

  const handleInitiative = () => {
    if (!session?.user) {
      toast.info("Please login to continue");
    }
    if (session?.user) {
      redirect("/create-event");
    }
  };

  return (
    <button
      className="rounded-xl border border-secondary px-6 py-3.5 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-secondary-foreground"
      onClick={handleInitiative}
    >
      Start an Initiative
    </button>
  );
};

export default StartInitiativeBtn;