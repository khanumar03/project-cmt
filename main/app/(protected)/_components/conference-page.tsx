"use client";

import { isAuthorized } from "@/actions/conference-authorize";
import { getAllSubmission } from "@/actions/get-All-Submission";
import { getConference } from "@/actions/get-conference";
import { Warning } from "@/components/_components/alert";
import { columns, Submission } from "@/components/conference/table/columns";
import { DataTable } from "@/components/conference/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Conference, Role } from "@prisma/client";
import { addDays } from "date-fns";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const ConferencePage = () => {
  const { confID } = useParams();
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, back } = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [currConference, setCurrConference] = useState<Conference | null>(null);
  const [allSubmission, setAllSubmission] = useState<Submission[]>([]);
  const [filterdata, setFilterData] = useState<Array<Submission>>([]);
  const [currDomain, setCurrDomain] = useState<string>();

  useEffect(() => {
    if (date && date.from != undefined && date.to != undefined) {
      const new_data = allSubmission.filter((x) => {
        if (!date.from || !date.to) return false;
        return (
          new Date(x.createdAt) >= date.from && new Date(x.createdAt) <= date.to
        );
      });
      setFilterData(new_data);
    }
  }, [date]);

  useEffect(() => {
    startTransition(() => {
      getConference(confID as string).then((conference) => {
        if (conference?.data) setCurrConference(conference.data);
      });
    });
  }, [confID]);

  // useEffect(() => {
  //   if (currDomain && confID) {
  //     startTransition(() => {
  //       getAllSubmission(confID as string, currDomain).then((data) => {
  //         setAllSubmission(data.data);
  //         setFilterData(data.data);
  //       });
  //     });
  //   }
  // }, [currDomain, confID]);

  return (
    <div className="container mx-auto space-y-2">
      <div className="w-full flex space-x-2">
        <Select onValueChange={setCurrDomain}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currConference &&
                currConference.domain.map((domain, idx) => (
                  <SelectItem key={idx} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {currDomain && (
          <Link
            href={`/client/conference/${confID}/create-submission?domain=${currDomain}`}
          >
            <Button variant={"outline"} type="button">
              Create Submission
            </Button>
          </Link>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {currDomain ? (
          <DataTable
            handledate={{ date, setDate }}
            columns={columns}
            data={filterdata}
          />
        ) : (
          <Warning
            className={"max-w-72 mt-10"}
            title="No domain selected!"
            description="select domain to work"
          />
        )}
      </div>
    </div>
  );
};

export default ConferencePage;
