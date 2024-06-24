"use client";

import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <div className="w-full space-x-3">
        <Link href={"/client/create-conference"}>
          <Button variant={"outline"}>create conference</Button>
        </Link>
        <Link href={"/client/join-conference"}>
          <Button variant={"outline"}>Join conference</Button>
        </Link>
      </div>
    </div>
  );
};

export default ClientPage;
