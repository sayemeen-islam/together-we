'use client'
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
    <button className="bg-none rounded-xl border border-[#687A45] px-6 py-3.5 text-sm font-semibold text-[#687A45] transition hover:bg-[#687A45] hover:text-white" onClick={handleInitiative}>
      Start an Initiative
    </button>
  );
};

export default StartInitiativeBtn;
