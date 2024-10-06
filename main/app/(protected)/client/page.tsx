"use client";

import { getAllConference } from "@/actions/get-All-conference";
import ConferenceCard from "@/components/conference/card-conf";
import Invite from "@/components/conference/invite";
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
        getAllConference(user.id, user.role).then((data) => {
          setConferences(data);
        });
      });
  }, [user]);

  return (
    <div>
      <div>
        <Invite />
      </div>
    </div>
  );
};

export default ClientPage;
