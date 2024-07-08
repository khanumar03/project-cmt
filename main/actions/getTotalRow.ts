"use server";

import { db } from "@/lib/db";

export const getTotalRow = async () => {
  const row = await db.submission.count();
  return { row };
};
