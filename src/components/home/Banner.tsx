import Link from "next/link";
import { ArrowRight, Heart, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import StartInitiativeBtn from "./StartInitiativeBtn";

export default async function Banner() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Heart size={16} />
            Together, We Make a Difference
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Small Acts,
            <span className="block text-primary">
              Big Changes.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            Every community deserves a helping hand. Discover local
            initiatives, connect with passionate people, and take part
            in creating a better tomorrow.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore Events
              <ArrowRight size={17} />
            </Link>

            <StartInitiativeBtn></StartInitiativeBtn>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <Users size={22} />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              <span className="block font-semibold text-foreground">
                Stronger Together
              </span>
              One community, countless possibilities.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-secondary/15" />
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Volunteers working together in a community service activity"
            className="relative h-[350px] w-full rounded-3xl object-cover shadow-xl sm:h-[450px]"
          />

          <div className="absolute -bottom-5 -left-4 rounded-2xl border border-border bg-card p-4 shadow-lg sm:-left-8 sm:p-5">
            <p className="text-sm font-bold text-card-foreground">
              Make every action count
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Be part of something meaningful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}