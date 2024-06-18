"use client";

import { CreateConference } from "@/components/conference/create-conference";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  // return <UserInfo label="📱 Client component" user={user} />;
  // return <CreateConference />;
};

export default ClientPage;
