"use server";

import { Submission } from "@/components/conference/table/columns";
import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export const getAllSubmission = async (confId: string, domain: string) => {
  const all = (await db.submission.findMany({
    where: {
      conferenceId: confId,
      fromDomain: domain,
    },
    select: {
      email: true,
      country: true,
      status: true,
      createdAt: true,
    },
  })) as Submission[];

  return { data: all };
};
