"use client";
import { fetchSubmissionByFiltersOrAll } from "@/actions/fetch-submission-by-filter";
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
import { FilterValue } from "@/lib/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, startTransition, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { conferenceId, domain } = useParams();
  const router = useRouter();
  const [_domain, setDomain] = useState<string>("");

  useEffect(() => {
    if (!domain || domain != _domain)
      router.push(`/client/conference/${conferenceId}/${_domain}`);
  }, [domain, _domain, conferenceId, router]);

  useEffect(() => {
    setDomain((domain as string) || "");
  }, [domain]);

  return (
    <div className="container mx-auto space-y-2">
      <div className="w-full flex space-x-2">
        <Select onValueChange={setDomain} value={_domain}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Ai">AI</SelectItem>
              <SelectItem value="ML">ML</SelectItem>

              {/* {currConference &&
                currConference.domain.map((domain, idx) => (
                  <SelectItem key={idx} value={domain}>
                    {domain}
                  </SelectItem>
                ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {domain ? (
          <Link
            href={`/client/create-submission?domain=${domain}&conferenceId=${conferenceId}`}
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
