"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const isAuthorized = async (
  userid: string,
  confid: string,
  role: Role
) => {
  const isA = await db.userRole.findFirst({
    where: {
      conferenceId: confid,
      userId: userid,
      role: {
        has: role,
      },
    },
  });

  if (isA) return true;
  return false;
};
