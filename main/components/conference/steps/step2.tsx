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
  Ghost,
  Globe,
  GlobeLock,
  Plus,
  PlusIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Checkbox } from "../../ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Step2 = () => {
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
    console.log("Sds");
    
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
    <div className="h-full w-full space-y-3 mt-5 mb-5">
      <h4 className="text-2xl font-semibold text-white">Add domain</h4>

      <div className="w-full flex space-x-2 justify-start">
        <div className="min-w-64">
          <Input disabled={isPending} onChange={(e) => setDomainInput(e.target.value)} value={domainInput} />
        </div>
        <Button
          variant={"outline"}
          className="flex justify-center items-center"
          onClick={addDomain}
        >
          <Plus size={22} />
        </Button>
      </div>

      <ScrollArea className="w-80">
      <ul className="max-h-[500px] w-full flex space-y-2 flex-col">
        {
          domain.map((_domain: string, i: number) => (
            <Button
              variant={"ghost"}
              onClick={() => deleteDomain(i)}
              key={i}
              className="max-w-80 cursor-pointer flex space-x-1 justify-start items-center text-white"
            >
              <X size={14} strokeWidth={3} color="gray" />
              <span>{_domain}</span>
            </Button>
          ))}
      </ul>
      </ScrollArea>

      {/* <Form {...form}>
        <form className="w-full h-full gap-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="domain"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-white">Domain</FormLabel>
                <FormItem>
                  <div className="flex space-x-2 items-center">
                    <Input
                      className="max-w-md"
                      onChange={(e) => setDomainInput(e.target.value)}
                      disabled={isPending}
                      type="text"
                      value={domainInput}
                    />
                    <Button type="button" onClick={addDomain}>
                      <PlusIcon strokeWidth={3} size={20} />
                    </Button>
                  </div>
                </FormItem>
                <ul className="flex flex-col space-y-1">
                  {domain &&
                    domain.map((domain: string, idx: number) => (
                      <li
                        key={idx}
                        className="max-w-72 h-12 flex rounded-md pl-2 justify-between space-x-2 truncate items-center bg-white"
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
                          className="mr-2"
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

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="w-full h-fit flex justify-center items-center">
          <Button
            disabled={isPending}
            type="submit"
            variant={"outline"}
            size={"lg"}
            className="text-white"
          >
            Create
          </Button>
          </div>
        </form>
      </Form> */}
    </div>
  );
};

export default Step2;
