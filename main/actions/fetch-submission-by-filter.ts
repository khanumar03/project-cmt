"use server";

import { Submission } from "@/components/conference/table/columns";
import FilterEmail from "@/components/conference/table/email-filter";
import { db } from "@/lib/db";
import { FilterValue } from "@/lib/types";
import { Status } from "@prisma/client";
import { Flag } from "lucide-react";
import { DateRange } from "react-day-picker";

export const fetchSubmissionByFiltersOrAll = async ({
  confId,
  domain,
  date,
  email,
  status,
}: {
  confId: string;
  domain: string;
  email?: string | undefined;
  date?: DateRange | undefined;
  status?: Status | undefined;
}) => {
  // if (!confId || !domain) return { error: "something went wrong" };

  try {
    const { query, count } = await db.$transaction(async (tx) => {
      
      const count = await tx.submission.count({
        where: {
          AND: {
            conferenceId: confId,
            fromDomain: domain,
          },
          email: {contains: email},
          createdAt: {
            lte: date?.to?.toISOString(),
            gte: date?.from?.toISOString(),
          },
          status: status,
        },
      });

      const submission = (await tx.submission.findMany({
        where: {
          AND: {
            conferenceId: confId,
            fromDomain: domain,
          },
          email: { contains: email },
          createdAt: {
            lte: date?.to?.toISOString(),
            gte: date?.from?.toISOString(),
          },
          status: status,
        },
        skip: 0,
        take: 2,
        select: {
          id: true,
          email: true,
          country: true,
          status: true,
          createdAt: true,
        },
      })) as Submission[];

      return { query: submission, count: count };
    });
    console.log(query);

    return { success: { query, count } };
  } catch (error) {
    console.log(error);

    return { error: "something went wrong" };
  }
};
