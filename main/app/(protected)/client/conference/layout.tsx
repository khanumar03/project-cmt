"use client";
import { fetchDomain } from "@/actions/fetchDomain";
import FilterDataTable from "@/components/conference/table/filter-by";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateCurrDomain } from "@/lib/features/Slices";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FilterValue } from "@/lib/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, startTransition, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { conferenceId } = useParams();
  const { currDomain } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch()
  const [currDomains, setCurrDomains] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      fetchDomain(conferenceId as string).then((ok) => {
        if (ok.success) setCurrDomains(ok.success);
      });
    });
  }, [conferenceId]);

  return (
    <div className="container mx-auto space-y-2">
      <div className="w-full flex space-x-2">
        <Select onValueChange={(value) => {
          dispatch(updateCurrDomain(value))
        }} value={currDomain}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currDomains &&
                currDomains.map((domain, idx) => (
                  <SelectItem key={idx} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {currDomain ? (
          <Link
            href={`/client/create-submission?domain=${currDomain}&conferenceId=${conferenceId}`}
          >
            <Button variant={"outline"} type="button">
              Create Submission
            </Button>
          </Link>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
