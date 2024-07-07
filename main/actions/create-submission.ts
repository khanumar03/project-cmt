"use server";

import { db } from "@/lib/db";
import { SubmissionFormSchema } from "@/schemas";
import { FileType, Prisma, PrismaClient } from "@prisma/client";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import axios from "axios";
import { date, z } from "zod";

export const createSubmission = async (
  values: z.infer<typeof SubmissionFormSchema>,
  files: FileType[],
  userID: string,
  email: string,
  domain: string,
  confID: string
) => {
  const validatedFields = SubmissionFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, abstract, authors, contact, comment, country, state } =
    validatedFields.data;

  try {
    await db.$transaction(async (tx) => {
      const result = await tx.submission.create({
        data: {
          abstract: abstract,
          authors: authors,
          comment: comment || "",
          country: country,
          currActiveMail: email,
          fromDomain: domain,
          state: state,
          contact: contact,
          title: title,
          conference: {
            connect: {
              id: confID,
            },
          },
          createdBy: {
            connect: {
              id: userID,
            },
          },
        },
      });
      if (!result) throw new Error("something went wrong, creating submission");

      for (const file of files as FileType[]) {
        const id = await tx.files.create({
          data: {
            userID: userID,
            metadata: file,
            submission: {
              connect: {
                id: result.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!id) throw new Error("something went wrong, creating files");
      }

      return result;
    });
    return { success: "created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};
