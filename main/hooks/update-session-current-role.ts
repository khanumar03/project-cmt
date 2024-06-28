import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useUpdateSession = async (role: Role) => {
  const session = useSession();
  await session.update({
    role: role,
  });
};
