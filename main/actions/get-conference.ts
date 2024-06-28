"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const getConference = async (id: string, role: Role) => {
  const data = await db.conference.findMany({
    where: {
      participants: {
        some: {
          id,
        },
      },
      roles: {
        some: {
          role: {
            has: role,
          },
        },
      },
    },
  });

  return data;
};
