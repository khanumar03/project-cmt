"use client";

import { getAllConference } from "@/actions/get-All-conference";
import ConferenceCard from "@/components/conference/card-conf";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Conference, Role } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

const ClientPage = () => {

  return (
      <div className="w-full h-full">
      </div>

  );
};

export default ClientPage;
