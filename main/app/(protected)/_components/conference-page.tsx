"use client";

import { isAuthorized } from "@/actions/conference-authorize";
import { fetchSubmissionByEmail } from "@/actions/fetch-submission-by-email";
import { getAllSubmission } from "@/actions/get-All-Submission";
import { getConference } from "@/actions/get-conference";
import { getTotalRow } from "@/actions/getTotalRow";
import { Warning } from "@/components/_components/alert";
import { columns, Submission } from "@/components/conference/table/columns";
import { DataTable } from "@/components/conference/table/data-table";
import FilterDataTable from "@/components/conference/table/filter-by";
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
import { FilterValue } from "@/lib/types";
import { Conference, Role } from "@prisma/client";
import { addDays } from "date-fns";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

const ConferencePage = () => {
  const { confID } = useParams();
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currFilter, setCurrFilter] = useState<FilterValue | null>(null);

  const [currConference, setCurrConference] = useState<Conference | null>(null);
  const [allSubmission, setAllSubmission] = useState<Submission[]>([]);
  const [currDomain, setCurrDomain] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [debouncing, setDebouncing] = useState<NodeJS.Timeout | null>(null);
  const [totalrow, setTotalRow] = useState<Array<number>>([]);
  const [activeRowSet, setActiveRowSet] = useState<number>(1);
  // useEffect(() => {
  //   // if (date && date.from != undefined && date.to != undefined) {
  //   //   const new_data = allSubmission.filter((x) => {
  //   //     if (!date.from || !date.to) return false;
  //   //     return (
  //   //       new Date(x.createdAt) >= date.from && new Date(x.createdAt) <= date.to
  //   //     );
  //   //   });
  //   //   setFilterData(new_data);
  //   // }
  // }, [date]);

  const getConf = useCallback(() => {
    startTransition(() => {
      getConference(confID as string).then((conference) => {
        if (conference?.data) setCurrConference(conference.data);
      });
    });
  }, [confID]);
  const getSub = useCallback(() => {
    if (currDomain && confID)
      startTransition(() => {
        getAllSubmission(
          confID as string,
          currDomain,
          activeRowSet * 2 - 2
        ).then((data) => {
          setAllSubmission(data.data);
        });
      });
  }, [confID, currDomain]);
  useEffect(() => {
    getConf();
  }, [confID, getConf]);

  useEffect(() => {
    getSub();
    return () => {};
  }, [currDomain, confID]);

  useEffect(() => {
    if (debouncing) clearTimeout(debouncing);
    setIsLoading(true);
    setDebouncing(
      setTimeout(() => {
        startTransition(() => {
          if (!filterEmail) {
            getSub();
            setIsLoading(false);
            return;
          }
          fetchSubmissionByEmail(filterEmail).then((ok) => {
            if (ok.success) setAllSubmission(ok.success);
            setIsLoading(false);
          });
        });
      }, 1000)
    );
    // return () => {};
  }, [filterEmail]);

  useEffect(() => {
    startTransition(() => {
      getTotalRow().then((row) => {
        console.log(row);
        const arr: Array<number> = Array.from<number>({
          length: Math.round(row.row / 2),
        });
        setTotalRow(arr);
      });
    });
  }, []);

  const prev = () => {
    if (activeRowSet - 1 <= 0) return;
    setActiveRowSet(activeRowSet - 1);
  };
  const next = () => {
    if (activeRowSet + 1 > totalrow.length) return;
    setActiveRowSet(activeRowSet + 1);
  };

  const onPage = (idx: number) => {
    setActiveRowSet(idx);
  };

  useEffect(() => {
    if (currDomain && confID) {
      startTransition(() => {
        getAllSubmission(
          confID as string,
          currDomain,
          activeRowSet * 2 - 2
        ).then((data) => {
          setAllSubmission(data.data);
        });
      });
    }
  }, [activeRowSet]);

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
      </div>
      {currDomain && (
        <div className="w-full flex space-x-2">
          <FilterDataTable
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
          />
          <Link
            href={`/client/conference/${confID}/create-submission?domain=${currDomain}`}
          >
            <Button variant={"outline"} type="button">
              Create Submission
            </Button>
          </Link>
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        {currDomain ? (
          <DataTable
            handledate={{ date, setDate }}
            columns={columns}
            data={allSubmission}
            filterby={currFilter}
            filterEmail={{ filterEmail, setFilterEmail }}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            totalrow={totalrow}
            activeRowSet={activeRowSet}
            prev={prev}
            next={next}
            onPage={onPage}
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
