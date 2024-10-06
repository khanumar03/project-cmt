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

  return (
<<<<<<< HEAD
    <div>
      <div>
        <Invite />
=======
      <div className="w-full h-full">
>>>>>>> a7a94cf7a2ecd5f7b9ddac81436cd1f3cd9d2012
      </div>

  );
};

export default ClientPage;
