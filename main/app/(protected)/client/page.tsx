"use client";

import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <Link href={"/client/create-conference"}>
        <Button variant={"outline"}>create conference</Button>
      </Link>
    </div>
  );
};

export default ClientPage;
