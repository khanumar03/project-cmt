"use client";

import React, { startTransition, useCallback, useEffect } from "react";
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
  Link,
  TriangleAlert,
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
import { Role } from "@prisma/client";
import { updateRole } from "@/actions/update-curr-user-role";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Navbar() {
  const user = useCurrentUser();
  const session = useSession();
  const [currRole, setCurrRole] = React.useState<Role | null>(null);

  useEffect(() => {
    if (user) setCurrRole(user.role);
  }, [user]);

  useEffect(() => {
    if (user && currRole != user.role)
      startTransition(() => {
        session.update({ role: currRole }).then((session) => {
          if (!session) {
            toast.success("something went wrong", {
              duration: 2000,
              position: "top-center",
              icon: <TriangleAlert color="red" size={25} />,
            });
          }
        });
      });
  }, [currRole]);
  return (
    <div className="relative w-full h-14 bg-black mt-0   z-50 flex items-center justify-between px-10 py-2">
      <h1 className="text-white text-2xl">Conferences</h1>
      <div className="flex items-center space-x-4">
        <Input placeholder="" className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{currRole}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={currRole || undefined}
              onValueChange={(value) =>
                currRole != (value as Role) && setCurrRole(value as Role)
              }
            >
              <DropdownMenuRadioItem value={Role.CHAIR}>
                Chair
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={Role.AUTHOR}>
                Author
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={Role.REVIEWER}>
                Reviewer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Name of the Selected Conference</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Conferences</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Second
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Third</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-48">
              Name of the User
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Change Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRound className="mr-2 h-4 w-4" />
                <span>Delete Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="mr-2 h-4 w-4" />
                <span>Link to Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem> */}
            <LogoutButton>
              <DropdownMenuItem>
                <ExitIcon className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
