"use client";

import { getConference } from "@/actions/get-conference";
import ConferenceCard from "@/components/conference/card-conf";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Conference, Role } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

const ClientPage = () => {
  const user = useCurrentUser();

  const [conferences, setConferences] = useState<Array<Conference> | null>(
    null
  );

  useEffect(() => {
    if (user)
      startTransition(() => {
        getConference(user.id, user.role).then((data) => {
          setConferences(data);
        });
      });
  }, [user]);

  return (
    <div>
      <div className="w-full space-x-3">
        <Link href={"/client/create-conference"}>
          <Button variant={"outline"}>create conference</Button>
        </Link>
        <Link href={"/client/join-conference"}>
          <Button variant={"outline"}>Join conference</Button>
        </Link>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {conferences &&
            conferences.map((conference, idx) => (
              <ConferenceCard key={idx} data={conference} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
