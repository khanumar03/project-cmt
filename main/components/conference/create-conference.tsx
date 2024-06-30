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
import { conference } from "@/actions/create-conference";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CircleCheckBigIcon, Trash2Icon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function CreateConference() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [country, setCountry] = useState<Array<ICountry>>([]);
  const [state, setState] = useState<Array<IState> | null>(null);
  const [domainInput, setDomainInput] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [submissionDue, setSubmissionDue] = useState<Date | undefined>();
  const user = useCurrentUser();

  const [countryValue, setCountryValue] = useState<string | undefined>();
  const [stateValue, setStateValue] = useState<string | undefined>();

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
      country: countryValue,
      state: stateValue,
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

  useEffect(() => {
    setValue("country", countryValue);
  }, [countryValue]);

  useEffect(() => {
    setValue("state", stateValue);
  }, [stateValue]);

  useEffect(() => {
    setValue("confStartDate", startDate?.toString());
  }, [startDate]);

  useEffect(() => {
    setValue("confEndDate", endDate?.toString());
  }, [endDate]);

  useEffect(() => {
    setValue("paperSubmissionDueDate", submissionDue?.toString());
  }, [submissionDue]);

  const onSubmit = (values: z.infer<typeof ConferenceFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      if (user) {
        conference(values, user.id).then((data) => {
          if (data.success) {
            toast.success("Conference created successfully", {
              duration: 2000,
              position: "top-center",
              icon: <CircleCheckBigIcon color="green" size={25} />,
            });
            router.replace("/client");
          } else {
            setError(data.error);
          }
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="max-w-[700px] mx-auto space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          <div className="flex-1 space-y-4">
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
              name="submission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many submissions do you expect?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1 space-y-4">
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountryList
                      setCountryValue={setCountryValue}
                      data={country}
                      handlestate={handlestate}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex flex-col">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <StateList setStateValue={setStateValue} data={state} />
                    </FormControl>
                  </FormItem>
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
              name="domain"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Domain</FormLabel>
                  <FormItem className="flex space-x-2 justify-between items-center">
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
                  <ul className="flex flex-col space-y-1">
                    {domain &&
                      domain.map((domain: string, idx: number) => (
                        <li
                          key={idx}
                          className="w-full flex justify-between space-x-2 truncate items-center bg-white"
                        >
                          <HoverCard>
                            <HoverCardTrigger className="max-w-72 truncate ...">
                              {domain}
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit">
                              {domain}
                            </HoverCardContent>
                          </HoverCard>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={() => deleteDomain(idx)}
                            type="button"
                          >
                            <Trash2Icon size={20} />
                          </Button>
                        </li>
                      ))}
                  </ul>
                  <FormMessage />
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
}
