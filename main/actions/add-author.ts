"use server";

import { db } from "@/lib/db";

export const addAuthorWithEmail = async (email: string) => {
  const author = await db.user.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      first_name: true,
      last_name: true,
      organization_name: true,
    },
  });

  if (!author) return { error: "user with this email not exist" };
  return {
    success: {
      email: author.email,
      firstname: author.first_name,
      lastname: author.last_name,
      org: author.organization_name,
    },
  };
};
