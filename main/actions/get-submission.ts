"use server";

import { db } from "@/lib/db";

export const getSubmission = async () => {
  const data = await db.submission.create({
    data: {
      filePath: "",
      fileType: "",
      fromDomain: "",
      conferenceId: "",
      createdById: "",
    },
  });
};
