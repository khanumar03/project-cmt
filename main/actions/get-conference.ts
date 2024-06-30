"use server";

import { db } from "@/lib/db";

export const getConference = async (id: string) => {
  const conference = await db.conference.findFirst({
    where: {
      id: id,
    },
  });

  if (conference) return { data: conference };
  return { data: null };
};
