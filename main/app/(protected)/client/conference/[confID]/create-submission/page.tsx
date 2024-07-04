"use client";

import { CountryList } from "@/components/conference/country-list";
import { DatePicker } from "@/components/conference/date-picker";
import { StateList } from "@/components/conference/state-list";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { SubmissionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DataTable } from "@/components/conference/submission/data-table";
import { columns } from "@/components/conference/submission/columns";
import validator from "validator";
import { addAuthorWithEmail } from "@/actions/add-author";
import toast, { ErrorIcon } from "react-hot-toast";
import {
  CircleCheckBigIcon,
  MailCheckIcon,
  MailPlus,
  TriangleAlertIcon,
  UploadCloud,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Information } from "unitsnet-js";
import axios from "axios";
import FileCard from "@/components/conference/submission/file-card";
import { FileMetaData } from "@/lib/types";
import path from "path";
import { FileType } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createSubmission } from "@/actions/create-submission";
import { uploadFilesMetaData } from "@/actions/upload-files-metadata";

const Page = () => {
  const user = useCurrentUser();
  const params = useSearchParams();
  const { confID } = useParams();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [isEmail, setIsEmail] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [value, setValue] = useState<string>("");
  const [files, setFiles] = useState<Array<File> | null>(null);
  const router = useRouter();

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
      submission: [],
      comment: "",
    },
  });

  const submission = form.watch("submission");

  const addAuthor = (e: any) => {
    e.preventDefault();
    const check = validator.isEmail(value);
    if (!check) {
      setIsEmail("Enter a valid email");
      return;
    }
    setIsEmail("");

    if (authors.length >= 5) {
      toast.success("Atmost 5 authors are allowed", {
        duration: 2000,
        position: "top-center",
        icon: <TriangleAlertIcon className="text-red-600" size={24} />,
        style: {
          width: 300,
        },
      });
      return;
    }

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
  const uploadFile = async (e: any) => {
    e.preventDefault();
    if (!files) return;

    const data = new FormData();

    files.forEach((file) => data.append("files", file));

    const res = await axios.post("http://localhost:3003/upload", data);

    form.setValue("submission", [...submission, ...res.data.metadata]);

    setFiles(null);
    console.log("files uploaded");
  };

  const deleteFile = async (e: any, path: string) => {
    await axios
      .delete("http://localhost:3003/delete", { params: { path } })
      .then((data) => {
        if (data.data.success) {
          const newData = submission.filter(
            (metadata) => metadata.path != path
          );
          form.setValue("submission", newData);
        }
      });
  };

  useEffect(() => {
    async function handle(e: BeforeUnloadEvent) {
      e.preventDefault();
      if (submission)
        await axios.delete("http://localhost:3003/file/all", {
          data: { files: submission },
        });
      return "";
    }
    window.addEventListener("beforeunload", handle);

    return () => {
      window.removeEventListener("beforeunload", handle);
    };
  }, [submission]);

  const onSubmit = (values: z.infer<typeof SubmissionFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      if (user?.id && (params.get("domain") as string) && (confID as string))
        createSubmission(
          values,
          confID as string,
          params.get("domain") as string,
          user.id
        ).then(async (data) => {
          if (data.success) {
            const response = await axios.post(
              "http://localhost:3003/updatepath",
              {
                data: {
                  confID,
                  domain: params.get("domain") as string,
                  subID: data.success.id,
                  files: submission,
                },
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            startTransition(() => {
              uploadFilesMetaData(
                data.success.id,
                response.data.result as FileType[]
              ).then((ok) => {
                if (ok.error) setError(ok.error);
                else {
                  toast.success(ok.success as string, {
                    duration: 2000,
                    position: "top-center",
                    icon: <CircleCheckBigIcon color="green" size={23} />,
                  });
                  router.back();
                }
              });
            });
          } else setError(data.error);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center mx-auto  max-w-[1000px]  space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-[400px]">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} type="text" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-[400px]">
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-40" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-[400px]">
              <FormLabel>Contact No.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (
                      Number.isInteger(+e.key) ||
                      (field.value.length == 0 && e.key == "+") ||
                      e.key == "Backspace" ||
                      e.key == "Tab"
                    ) {
                    } else e.preventDefault();
                  }}
                  disabled={isPending}
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-[400px]">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex flex-col max-w-[400px]">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            </FormItem>
          )}
        />

        <div className="w-full space-y-4">
          <DataTable columns={columns} data={authors} />
          <div className="">
            <FormField
              name="add"
              render={({ field }) => (
                <FormItem className="flex flex-col max-w-[400px]">
                  <FormLabel>Add author with email</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        <Button
                          variant={"outline"}
                          type="button"
                          onClick={(e) => addAuthor(e)}
                        >
                          <MailPlus size={23} />
                        </Button>
                      </div>

                      {isEmail && (
                        <p className="text-destructive text-sm">{isEmail}</p>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-2 max-w-[400px]">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="file">Files submission</Label>
            <div className="flex space-x-2">
              <Input
                type="file"
                name="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Object.values(e.target.files));
                  } else setFiles(null);
                }}
              />
              <Button
                variant={"outline"}
                type="button"
                onClick={(e) => uploadFile(e)}
              >
                <UploadCloud className="mt-1 text-sky-500" size={25} />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {submission.map((metadata: FileType, idx: number) => {
            const extname = path.extname(metadata.filename);
            const filename = metadata.filename.split(extname)[0];
            let size: any = Math.round(
              new Information(metadata.size).Megabytes
            );
            if (!size) {
              size =
                Math.round(new Information(metadata.size).Kilobits).toString() +
                "KB";
            } else size = size.toString() + "MB";
            return (
              <FileCard
                key={idx}
                filename={filename}
                size={size}
                extname={extname}
                path={metadata.path}
                deletFile={deleteFile}
              />
            );
          })}
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          submit
        </Button>
        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </Form>
  );
};

export default Page;
