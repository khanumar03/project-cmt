"use client";

import { addAuthorWithEmail } from "@/actions/add-author";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ConferenceFormSchema, SubmissionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, Status } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { watch } from "fs";
import { MailCheckIcon, Plus, Trash2 } from "lucide-react";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast, { ErrorIcon } from "react-hot-toast";
import validator from "validator";
import { z } from "zod";
import Roles from "../roles";
import Domains from "../domains";
import { isUserExistAction } from "@/actions/isUserExistAction";

const Step3 = () => {
  const user = useCurrentUser();
  const [isEmail, setIsEmail] = useState<string | undefined>("");
  const [value, setValue] = useState<string>("");

  const isUserExist = async () => {
    if(!validator.isEmail(value)) {
      setIsEmail("Invalid email address");
      return;
    }
    setIsEmail("");

    const user = await isUserExistAction(value)

    if(user.error) { 
      setIsEmail(user.error)
      return
    }
  }

  return (
    <div className="h-full w-full space-y-3 mt-5 mb-5">
      <h4 className="text-2xl font-semibold text-white">
        Invite people to your conference
      </h4>
      <div className="w-full">
        <div className="w-fit flex flex-col space-y-1 justify-center items-start">
          <Label>Email</Label>
          <div className="flex space-x-2">
            <Input
              className="min-w-64"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant={"outline"} type="button" onClick={() => {}}>
              Invite
            </Button>
          </div>
          {isEmail && <p className="text-destructive text-sm">{isEmail}</p>}
        </div>
      </div>

      <div className="w-full backdrop-blur-lg items-center ring-1 ring-zinc-900 rounded-sm">
        <ul className="w-full">
          {
            <li className="flex justify-between items-center px-2 py-3">
              <span className="text-sm ">{user?.email}</span>
              <div className="flex space-x-2">
              <   Domains />
                <Roles disabled={user ? true : false} defaultRole={Role.CHAIR} />
                <Button disabled={user ? true : false} variant={"secondary"}>
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          }
          <Separator className="bg-slate-900" />
          <li className="flex justify-between items-center px-2 py-3">
            <span className="text-sm ">{user?.email}</span>
            <div className="flex space-x-2">
              <Domains />
              <Roles disabled={false} defaultRole={Role.CHAIR} />
              <Button variant={"secondary"}>
                <Trash2 size={18} />
              </Button>
            </div>
          </li>
          <Separator className="bg-slate-900" />
          <li className="flex justify-between items-center px-2 py-3">
            <span className="text-sm ">{user?.email}</span>
            <div className="flex space-x-2">
            <Domains />
              <Roles disabled={false} defaultRole={Role.CHAIR} />
              <Button variant={"secondary"}>
                <Trash2 size={18} />
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Step3;
