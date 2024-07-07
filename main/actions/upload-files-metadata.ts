"use server";

import { db } from "@/lib/db";
import { FileType } from "@prisma/client";

export const uploadFilesMetaData = async (id: string, files: FileType[]) => {
  return { success: "submission created successfully" };
};
