"use server";

import { Submission } from "@/components/conference/table/columns";
import { db } from "@/lib/db";

export const fetchSubmissionByEmail = async (value: string) => {
  if (!value) return { success: [] };

  const data = (await db.submission.findMany({
    where: {
      email: {
        contains: value,
      },
    },
    select: {
      email: true,
      country: true,
      status: true,
      createdAt: true,
    },
  })) as Submission[];

  return { success: data };
};
