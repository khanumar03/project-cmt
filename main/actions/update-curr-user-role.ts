"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const updateRole = async (id: string, role: Role) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        role: role,
      },
    });

    return { success: { data: user } };
  } catch (error) {
    return { error: "something went wrong" };
  }
};
