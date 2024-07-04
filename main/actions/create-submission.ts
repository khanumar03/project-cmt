"use server";

import { db } from "@/lib/db";
import { SubmissionFormSchema } from "@/schemas";
import { FileType, Prisma, PrismaClient } from "@prisma/client";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import axios from "axios";
import { date, z } from "zod";

export const createSubmission = async (
  values: z.infer<typeof SubmissionFormSchema>,
  confID: string,
  domain: string,
  userId: string
) => {
  const validatedFields = SubmissionFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    title,
    abstract,
    authors,
    contact,
    comment,
    country,
    state,
    submission,
  } = validatedFields.data;

  const res_submission = await db.submission.create({
    data: {
      abstract,
      comment,
      country,
      currActiveMail: authors[0].email,
      fromDomain: domain,
      state,
      title,
      authors,
      conference: {
        connect: {
          id: confID,
        },
      },
      createdBy: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return { success: res_submission };
};
