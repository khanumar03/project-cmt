"use client";

import { addAuthorWithEmail } from "@/actions/add-author";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ConferenceFormSchema, SubmissionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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

const Step3 = () => {
  const user = useCurrentUser();
  const [isEmail, setIsEmail] = useState<string | undefined>("");
  const [value, setValue] = useState<string>("");
  const roles = ["Chair", "Author", "Reviewer"];

  const form = useForm<z.infer<typeof SubmissionFormSchema>>({
    resolver: zodResolver(SubmissionFormSchema),
    defaultValues: {
      title: "",
      abstract: "",
      authors: [
        {
          email: user?.email,
          firstname: user?.first_name,
          lastname: user?.last_name,
          org: user?.org,
        },
      ],
      contact: "",
      country: "",
      state: "",
      comment: "",
    },
  });

  const addAuthor = (e: any) => {
    e.preventDefault();
    const check = validator.isEmail(value);
    if (!check) {
      setIsEmail("Enter a valid email");
      return;
    }
    setIsEmail("");

    const isExist = authors.some((author: any) => author.email == value);

    if (isExist) {
      toast.success("Already added", {
        duration: 2000,
        position: "top-center",
        icon: <MailCheckIcon className="text-green-400" size={24} />,
        style: {
          width: 300,
        },
      });
      return;
    }

    startTransition(() => {
      addAuthorWithEmail(value).then((data) => {
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
            position: "top-center",
            icon: <ErrorIcon color="red" className="w-24 h-24" />,
          });
        } else {
          form.setValue("authors", [...authors, data.success]);
        }
      });
    });
  };

  const authors = form.watch("authors");

  const deleteAuthor = (email: string) => {
    const updatedAuthors = authors.filter(
      (author: any) => author.email !== email
    );
    form.setValue("authors", updatedAuthors);
  };

  const handleRoleChange = (email: string, newRole: string) => {
    const updatedAuthors = authors.map((author: any) =>
      author.email === email ? { ...author, role: newRole } : author
    );
    form.setValue("authors", updatedAuthors);
  };

  return (
    <div className="h-full w-full space-y-3 mt-5 mb-5">
      <h4 className="text-2xl font-semibold text-white">
        Invite People to your conference
      </h4>
      <div className="font-semibold text-1xl">
        <Label>Invite Email</Label>
      </div>
      <div className="w-full flex space-x-2 justify-start">
        <div className="min-w-64">
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Button variant={"outline"} type="button" onClick={(e) => addAuthor(e)}>
          Invite
        </Button>
        {isEmail && <p className="text-destructive text-sm">{isEmail}</p>}
      </div>

      <div className="mt-4 space-y-4">
        {authors.map((author: any) => (
          <div
            key={author.email}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div className="flex flex-col">
              <span className="block font-medium">
                {author.firstname} {author.lastname}
              </span>
              <span className="block text-gray-500">{author.email}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{author.role}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {roles.map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => handleRoleChange(author.email, role)}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="p-2 text-red-500 hover:text-red-700"
              onClick={() => deleteAuthor(author.email)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3;
