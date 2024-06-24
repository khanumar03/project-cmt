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
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConferenceFormSchema } from "@/schemas";
import { DatePicker } from "./date-picker";
import { CountryList } from "./country-list";
import { Country, ICountry, IState, State } from "country-state-city";
import { StateList } from "./state-list";

export function CreateConference() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [country, setCountry] = useState<Array<ICountry>>([]);
  const [state, setState] = useState<Array<IState> | null>(null);
  const [domainInput, setDomainInput] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [submissionDue, setSubmissionDue] = useState<Date | undefined>();

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);

  const handlestate = (st: string | null) => {
    setState(st ? State.getStatesOfCountry(st) : null);
  };

  const form = useForm<z.infer<typeof ConferenceFormSchema>>({
    resolver: zodResolver(ConferenceFormSchema),
    defaultValues: {
      name: "",
      country: undefined,
      state: undefined,
      confStartDate: undefined,
      confEndDate: undefined,
      paperSubmissionDueDate: undefined,
      externalConfURL: "",
      domain: [],
      submission: 1,
    },
  });
  const { control, handleSubmit, watch, setValue }: any = form;
  const domain = watch("domain");

  const addDomain = () => {
    if (domainInput.length <= 0) return;
    setValue("domain", [...domain, domainInput]);
    setDomainInput("");
  };

  const deleteDomain = (idx: number) => {
    const updateDomain = domain.filter((_: string, i: number) => idx !== i);
    setValue("domain", updateDomain);
  };

  const handleCountryState = () => {};

  const onSubmit = (values: z.infer<typeof ConferenceFormSchema>) => {
    setError("");
    setSuccess("");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col max-w-[350px] space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name of the Conference</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormItem className="flex justify-between items-center">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountryList data={country} handlestate={handlestate} />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormItem className="flex justify-between items-center">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <StateList data={state} />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    isDisabled={false}
                    from={new Date()}
                    handledata={setStartDate}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    isDisabled={startDate ? false : true}
                    from={startDate}
                    handledata={setEndDate}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="paperSubmissionDueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Submission Due Date</FormLabel>
                <FormControl>
                  <DatePicker
                    isDisabled={endDate ? false : true}
                    from={startDate}
                    to={endDate}
                    handledata={setSubmissionDue}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="externalConfURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>External Conference URL</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="url" />
                </FormControl>
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

          <FormField
            control={control}
            name="domain"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel>Domain</FormLabel>
                <FormItem className="flex space-x-2 -space-y-0.2 justify-between items-center">
                  <FormControl>
                    <Input
                      onChange={(e) => setDomainInput(e.target.value)}
                      disabled={isPending}
                      type="text"
                      value={domainInput}
                    />
                  </FormControl>
                  <Button type="button" onClick={addDomain}>
                    add Domain
                  </Button>
                </FormItem>
                {domain &&
                  domain.map((domain: string, idx: number) => (
                    <Button
                      onClick={() => deleteDomain(idx)}
                      type="button"
                      key={idx}
                      variant={"outline"}
                    >
                      {domain}
                    </Button>
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
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
