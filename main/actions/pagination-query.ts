"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { DateRange } from "react-day-picker";

export const paginationQuery = async ({
  confId,
  domain,
  date,
  email,
  status,
  skip,
  take = 2,
}: {
  confId: string;
  domain: string;
  skip: number;
  email?: string | undefined;
  date?: DateRange | undefined;
  status?: Status | undefined;
  take?: number;
}) => {
  try {
    const page = await db.submission.findMany({
      where: {
        AND: {
          conferenceId: confId,
          fromDomain: domain,
        },
        email: email,
        createdAt: {
          lte: date?.to?.toISOString(),
          gte: date?.from?.toISOString(),
        },
        status: status,
      },
      skip: skip,
      take: take,
      select: {
        id:true,
        email: true,
        country: true,
        status: true,
        createdAt: true,
      },
    });
    return { success: page };
  } catch (error) {
    return { error: "something went wrong" };
  }
};
