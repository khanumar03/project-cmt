"use server";

import { db } from "@/lib/db";

export const deleteSubmissionOnEvent = async (id: string) => {
  if (!id) return { error: "something went wrong" };
  const ok = await db.submission.delete({
    where: {
      id: id,
    },
  });

  if (!ok) return { error: "something went wrong" };

  return { success: "ok" };
};
