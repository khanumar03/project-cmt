import React from "react";
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
import { DatePicker } from "../date-picker";
import { CountryList } from "../country-list";
import { Country, ICountry, IState, State } from "country-state-city";
import { StateList } from "../state-list";
import { conference } from "@/actions/create-conference";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  CircleCheckBigIcon,
  Globe,
  GlobeLock,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Checkbox } from "../../ui/checkbox";

const Step1 = () => {
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
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white pt-10 pl-10">
        Basic Information
      </h3>

      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    Name of the Conference
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-sm"
                      {...field}
                      disabled={isPending}
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={control}
              name="confStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    Conference Start Date
                  </FormLabel>
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
          </div>

          <div>
            <FormField
              control={control}
              name="confEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    Conference End Date
                  </FormLabel>
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
          </div>

          <div>
            <FormField
              control={control}
              name="paperSubmissionDueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    Paper Submission Due Date
                  </FormLabel>
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
          </div>

          <div>
            <FormField
              control={control}
              name="submission"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    How many submissions do you expect?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="max-w-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Country</FormLabel>
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
          </div>

          <div>
            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">State</FormLabel>
                    <FormControl>
                      <StateList setStateValue={setStateValue} data={state} />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={control}
              name="externalConfURL"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">
                    External Conference URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="max-w-sm"
                      disabled={isPending}
                      type="url"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
