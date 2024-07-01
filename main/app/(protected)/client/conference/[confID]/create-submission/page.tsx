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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const Page = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SubmissionFormSchema>>({
    resolver: zodResolver(SubmissionFormSchema),
    defaultValues: {
      title: "",
      abstract: "",
      email: [{ email: user?.email, name: user?.name }],
      contact: "",
      country: "",
      state: "",
      submission: [],
      comment: "",
    },
  });
  return (
    <Form {...form}>
      <form
        className="max-w-[700px] mx-auto space-y-6"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                <FormItem className="flex flex-col">
                  <FormLabel>Abstract</FormLabel>
                  <FormControl>
                    <Textarea />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex flex-col">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input type="text" />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Create Conference
        </Button>
      </form>
    </Form>
  );
};

export default Page;
