"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { SubmissionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
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
  CircleCheck,
  CircleCheckBigIcon,
  CircleX,
  MailCheckIcon,
  MailPlus,
  TriangleAlertIcon,
  UploadCloud,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import FileCard from "@/components/conference/submission/file-card";
import { FileType } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { createSubmission } from "@/actions/create-submission";
import { baseURL } from "@/lib/baseURL";

const SubmissionPage = () => {
  const user = useCurrentUser();
  const params = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [isEmail, setIsEmail] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [value, setValue] = useState<string>("");
  const [files, setFiles] = useState<Array<File> | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [filesMetaData, setFilesMetaData] = useState<FileType[]>([]);
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
    setDisabled(true);
    const confId = params.get("conferenceId");
    if (!files || !confId || !user) return;

    const data = new FormData();

    files.forEach((file) => data.append("files", file));

    const res = await baseURL({
      method: "post",
      url: `/upload?confID=${confId}&userID=${user?.id}`,
      data,
    });

    if (res.status == 500) {
      toast.error(res.data.msg, {
        duration: 2000,
        position: "top-center",
        icon: <CircleX color="red" size={25} />,
      });
    } else {
      setFilesMetaData([...filesMetaData, ...res.data.files]);
      console.log("files uploaded");
    }

    setFiles(null);
    setDisabled(false);
  };

  const deleteFile = async (e: any, file: FileType) => {
    e.preventDefault();

    const response = await baseURL({
      method: "patch",
      url: "/delete",
      data: {
        file,
      },
    });

    if (response.status == 201) {
      const newData = filesMetaData.filter(
        (metadata) => metadata.path != file.path
      );
      setFilesMetaData(newData);
    } else {
      toast.error("something went wrong", {
        duration: 2000,
        position: "top-center",
        icon: <CircleX color="red" size={25} />,
      });
    }
  };

  useEffect(() => {
    async function handle(e: BeforeUnloadEvent) {
      e.preventDefault();
      return "";
    }
    window.addEventListener("beforeunload", handle);

    return () => {
      window.removeEventListener("beforeunload", handle);
    };
  }, []);

  const onSubmit = (values: z.infer<typeof SubmissionFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const domain = params.get("domain");
      const confId = params.get("conferenceId");
      if (!user?.id || !user.email || !domain || !confId) return;
      createSubmission(
        values,
        filesMetaData,
        user.id,
        user.email,
        domain,
        confId as string
      ).then((ok) => {
        if (ok.success) {
          toast.success(ok.success, {
            duration: 2000,
            position: "top-center",
            icon: <CircleCheck color="green" size={25} />,
          });
          router.replace(`/client/conference/${confId}`);
        } else {
        }
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
                disabled={disabled}
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
                disabled={disabled}
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
          {filesMetaData.map((metadata: FileType, idx: number) => {
            return (
              <FileCard key={idx} file={metadata} deletFile={deleteFile} />
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

export default SubmissionPage;
