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
import { useAppSelector } from "@/lib/hooks";
import { FilterStatusValue } from "@/lib/types";
import { Status } from "@prisma/client";
import { FilterIcon } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const Page = () => {
  const { conferenceId } = useParams();
  const { currDomain } = useAppSelector((state) => state.data);
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
  const [pageOps, setPageOps] = useState<string>("");


  useEffect(() => {
    startTransition(() => {
      if(conferenceId && currDomain) {
        setIsLoading(true)
        fetchSubmissionByFiltersOrAll({
          confId: conferenceId as string,
          domain: currDomain,
          date: date,
          email: emailValue,
          status: statusValue as Status || undefined,
        })
        .then((ok) => {
          if(ok.success) {
            console.log(ok.success.count);
            setActivePage(1)
            const rows = Array.from<number>({length: Math.ceil(ok.success.count / 2)}).map((_,idx) => idx + 1)
            setTotalRow(rows);
            setTableData(ok.success.query)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
      }
    })
  },[currDomain,statusValue, emailValue, date])

  useEffect(() => {
    startTransition(() => {
      if(conferenceId && currDomain) {
        paginationQuery({
          confId: conferenceId as string,
          domain: currDomain,
          date: date,
          email: emailValue,
          status: statusValue as Status || undefined,
          skip: activePage * 2 - 2,
          take: 2
        })
        .then((ok) => {
          if(ok.success) {
            setTableData(ok.success)
          }
        })
      }
    })
  },[activePage,pageOps])

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
        {currDomain ? (
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
