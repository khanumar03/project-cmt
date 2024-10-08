"use client";

import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
// import { Button } from "./button";
// import { HeaderDropDown } from "./header-dropdown";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Mail,
  Settings,
  User,
  Lock,
  CircleUserRound,
  TriangleAlert,
  Plus,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Conference, Role } from "@prisma/client";
import { updateRole } from "@/actions/update-curr-user-role";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getAllConference } from "@/actions/get-All-conference";
import Invite from "@/components/conference/invite";
import Link from "next/link";

export function Navbar() {
  const user = useCurrentUser();
  const session = useSession();
  const [currRole, setCurrRole] = React.useState<Role | null>(null);
  const [conferences, setConferences] = useState<Array<Conference> | null>(
    null
  );
  // useEffect(() => {
  //   if (user) setCurrRole(user.role);
  // }, [user]);

  // useEffect(() => {
  //   if (user && currRole != user.role)
  //     startTransition(() => {
  //       session.update({ role: currRole }).then((session) => {
  //         if (!session) {
  //           toast.success("something went wrong", {
  //             duration: 2000,
  //             position: "top-center",
  //             icon: <TriangleAlert color="red" size={25} />,
  //           });
  //         }
  //       });
  //     });
  // }, [currRole]);

  // useEffect(() => {
  //   if (user)
  //     startTransition(() => {
  //       getAllConference(user.id, user.role).then((data) => {
  //         setConferences(data);
  //       });
  //     });
  // }, [user]);
  return (
    <div className="w-full h-full flex flex-col items-stretch space-y-2">
      <div className="w-full space-y-1">
        <Link href="/client/create-conference">
          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start text-white"
          >
            <Plus className="mr-2" size={18} strokeWidth={3} color="grey" />{" "}
            Create conference
          </Button>
        </Link>
        <Invite />
        <Separator />
      </div>

      <div className="absolute bottom-5 space-y-2 left-1 w-full">
        <Separator className="w-2/12" />
        <Button
          className="w-2/12 h-14 space-x-2 flex justify-start backdrop-blur-lg items-center ring-2 ring-zinc-900"
          variant={"ghost"}
        >
          <UserIcon size={28} color="gray" />{" "}
          <span className="text-sm font-semibold">
            {user?.first_name} {user?.last_name}
          </span>
        </Button>
      </div>
    </div>
  );
}
