"use client";

import { fetchSubmissionByFiltersOrAll } from "@/actions/fetch-submission-by-filter";
import { paginationQuery } from "@/actions/pagination-query";
import { Warning } from "@/components/_components/alert";
import { columns, Submission } from "@/components/conference/table/columns";
import { DataTable } from "@/components/conference/table/data-table";
import { DateRangePickerEnhanced } from "@/components/conference/table/date-picker-advance";
import FilterEmail from "@/components/conference/table/email-filter";
import { FilterStatus } from "@/components/conference/table/filter-status";
import { Button } from "@/components/ui/button";
import { FilterStatusValue } from "@/lib/types";
import { Status } from "@prisma/client";
import { FilterIcon } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const Page = () => {
  const { conferenceId, domain } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [statusValue, setStatusValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string | undefined>(undefined);
  const [tableData, setTableData] = useState<Submission[]>([]);
  const [totalrow, setTotalRow] = useState<Array<number>>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const ok = await fetchSubmissionByFiltersOrAll({
      confId: conferenceId as string,
      domain: domain as string,
      date: date,
      email: emailValue,
      status: Status[statusValue as Status] || undefined,
    });
    if (ok.success) {
      const arr: Array<number> = Array.from<number>({
        length: Math.round(ok.success.count / 2),
      });
      setActivePage(1);
      setTotalRow(arr);
      setTableData(ok.success.query);
    }
    setIsLoading(false);
  }, [conferenceId, domain, emailValue, statusValue, date]);

  const setParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (date && date.from && date.to) {
      params.set("start", date.from.toISOString());
      params.set("end", date.to.toISOString());
    } else {
      params.delete("start");
      params.delete("end");
    }
    if (statusValue) params.set("status", statusValue);
    else params.delete("status");
    if (emailValue) params.set("email", emailValue);
    else params.delete("email");

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, date, emailValue, statusValue, pathname, router]);

  useEffect(() => {
    setParams();
  }, [setParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prev = () => {
    if (activePage - 1 <= 0) return;
    setActivePage(activePage - 1);
  };
  const next = () => {
    if (activePage + 1 > totalrow.length) return;
    setActivePage(activePage + 1);
  };

  const onPage = (idx: number) => {
    setActivePage(idx);
  };

  const pagination = useCallback(async () => {
    const page = await paginationQuery({
      confId: conferenceId as string,
      domain: domain as string,
      skip: activePage * 2 - 2,
      date: date,
      email: emailValue,
      status: Status[statusValue as Status] || undefined,
    });
    if (page.success) setTableData(page.success);
  }, [activePage, conferenceId, domain, date, emailValue, statusValue]);

  useEffect(() => {
    pagination();
  }, [activePage, pagination]);

  return (
    <div className="w-full space-y-2">
      <div className="w-full flex space-x-2 items-center">
        <Button
          variant={"ghost"}
          className="pointer-events-none "
          size={"icon"}
        >
          <FilterIcon size={23} />
        </Button>
        <FilterStatus value={statusValue} setValue={setStatusValue} />
        <DateRangePickerEnhanced
          numberOfMonths={1}
          showInternalPresets
          handledata={{ date, setDate }}
        />
        <FilterEmail state={{ emailValue, setEmailValue, isLoading }} />
      </div>
      <div className="w-full flex justify-center items-center">
        {domain ? (
          <DataTable
            columns={columns}
            data={tableData}
            totalrow={totalrow}
            activePage={activePage}
            next={next}
            prev={prev}
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

export default Page;
