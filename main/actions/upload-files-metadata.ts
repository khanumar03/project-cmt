"use server";

import { db } from "@/lib/db";
import { FileType } from "@prisma/client";

export const uploadFilesMetaData = async (id: string, files: FileType[]) => {
  const upload = await db.submission.update({
    where: {
      id,
    },
    data: {
      files: files,
    },
  });

  if (!upload) return { error: "something went wrong!" };
  return { success: "submission created successfully" };
};
