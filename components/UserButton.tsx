"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";

const UseButton = ({ session }: { session: Session | null }) => {
  const subscription = useSubscriptionStore((state) => state.subscription);

  // Session
  if (!session) {
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            image={session.user?.image}
            name={session.user?.name}
            classname=""
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {subscription === undefined && (
            <DropdownMenuItem>
              <LoadingSpinner />
            </DropdownMenuItem>
          )}

          {subscription?.role === "pro" && (
            <>
              <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#e935c1] animate-pulse">
                <StarIcon fill="#E935C1" />
                <p>PRO</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Manage</DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export default UseButton;
