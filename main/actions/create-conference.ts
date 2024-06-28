"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ConferenceFormSchema } from "@/schemas";
import { Role } from "@prisma/client";

export const conference = async (
  values: z.infer<typeof ConferenceFormSchema>,
  id: string
) => {
  const validatedFields = ConferenceFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    name,
    country,
    state,
    confStartDate,
    confEndDate,
    paperSubmissionDueDate,
    externalConfURL,
    domain,
    submission,
  } = validatedFields.data;

  const conference = await db.conference.create({
    data: {
      name,
      country,
      state,
      startDate: new Date(confStartDate),
      endDate: new Date(confEndDate),
      paperSubmissionDueDate: new Date(paperSubmissionDueDate),
      externalConfURL,
      nos: submission,
      domain,
      createdBy: id,
      participants: {
        connect: {
          id: id,
        },
      },
    },
  });

  const userrole = await db.userRole.create({
    data: {
      conferenceId: conference.id,
      userId: conference.createdBy,
      role: {
        set: [Role.AUTHOR, Role.CHAIR, Role.REVIEWER],
      },
    },
  });

  await db.conference.update({
    where: {
      id: conference.id,
    },
    data: {
      roles: {
        connect: {
          userId_conferenceId: {
            conferenceId: userrole.conferenceId,
            userId: userrole.userId,
          },
        },
      },
    },
  });

  return { success: "Conference Created Successfully" };
};
