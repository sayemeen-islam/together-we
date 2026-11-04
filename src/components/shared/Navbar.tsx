"use client";

import Link from "next/link";
import {
  CalendarDays,
  PlusCircle,
  Settings,
  Users,
  LogIn,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ModeToggle from "./ModeToggle";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut({
        fetchOptions: {
      onSuccess: () => {
      
        toast.success("Logged out successfully!");
        
      
        router.push("/login"); 
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Failed to log out.");
      }
    },
  
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users size={21} />
          </div>

          <span className="hidden sm:flex text-xl font-bold tracking-tight text-foreground">
            Together<span className="text-primary">We</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className=" items-center gap-6 md:flex">
          <Link
            href="/events"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Authentication Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle></ModeToggle>
          {!user ? (
            <Link href="/login">
              <Button className="gap-2">
                <LogIn size={16} />
                Login
              </Button>
            </Link>
          ) : (
            <>
              {/* Profile Picture with Display Name Tooltip */}

              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Open profile menu"
                  className="group relative flex size-10 items-center justify-center rounded-full outline-none"
                >
                  <Avatar className="size-9 border-2 border-secondary">
                    <AvatarImage src={user.image as string} alt={user.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Hover Message */}
                  <span className="pointer-events-none absolute -bottom-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-white text-foreground px-3 py-1.5 text-xs opacity-0 shadow-md transition-opacity group-hover:opacity-100 dark:bg-accent dark:text-white/90">
                    {user.name}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">
                          {user.name}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                    <Link href="/create-event" >
                  <DropdownMenuItem className="flex items-center">
                      <PlusCircle className="mr-2 size-4" />
                      Create Event
                  </DropdownMenuItem>
                    </Link>

                    <Link href="/manage-events" >
                  <DropdownMenuItem className="flex items-center">
                      <Settings className="mr-2 size-4" />
                      Manage Events
                  </DropdownMenuItem>
                    </Link>

                    <Link href="/joined-events" >
                  <DropdownMenuItem className="flex items-center">
                      <CalendarDays className="mr-2 size-4" />
                      Joined Events
                  </DropdownMenuItem>
                    </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
