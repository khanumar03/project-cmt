"use client";

import React from "react";
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

export function Navbar() {
  const [position, setPosition] = React.useState("bottom");
  return (
    <div className="relative w-full h-14 bg-black mt-0   z-50 flex items-center justify-between px-10 py-2">
      <h1 className="text-white text-2xl">Conferences</h1>
      <div className="flex items-center space-x-4">
        <Input placeholder="Filter emails..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select your Role</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">Author</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Chair Man
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                Reviewer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
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
        </DropdownMenu>
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
