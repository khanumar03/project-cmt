"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ConferenceFormSchema } from "@/schemas";

export const conference = async (
  values: z.infer<typeof ConferenceFormSchema>
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

  await db.conference.create({
    data: {
      name,
      country,
      state,
      startDate: confStartDate,
      endDate: confEndDate,
      paperSubmissionDueDate,
      externalConfURL,
      domain,
      //   submission,
    },
  });

  return { success: "Conference Created Successfully" };
};
