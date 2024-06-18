"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConferenceFormSchema } from "@/schemas";

export function CreateConference() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ConferenceFormSchema>>({
    resolver: zodResolver(ConferenceFormSchema),
    defaultValues: {
      name: "",
      country: "",
      state: "",
      confStartDate: new Date(),
      confEndDate: new Date(),
      paperSubmissionDueDate: new Date(),
      externalConfURL: "",
      domain: [],
      submission: 1,
    },
  });
  const { control, handleSubmit, setValue, watch } = form;
  const domainFields = watch("domain");

  const addDomainField = () => {
    setValue("domain", [...domainFields, ""]);
  };

  const removeDomainField = (index: number) => {
    const updatedDomains = domainFields.filter((_, i) => i !== index);
    setValue("domain", updatedDomains);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the Conference</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="john.doe@example.com"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="******"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="First name"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference Start Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference End Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paperSubmissionDueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Submission Due Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="externalConfURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>External Conference URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // placeholder="Organization name"
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="submission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many submissions do you expect?</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="number"
                    // min="1"
                    // max="20000"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {domainFields.map((_, index) => (
            <FormField
              key={index}
              control={control}
              name={`domain.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => removeDomainField(index)}
                  >
                    Remove
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="button" onClick={addDomainField}>
            Add Domain
          </Button>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Create Conference
        </Button>
      </form>
    </Form>
  );
}
