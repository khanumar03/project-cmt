"use server"

import { db } from "@/lib/db"

export const isUserExistAction = async (email: string) => {
    const user = await db.user.findFirst({ where: { email }, select: {  email : true} })

    if(user) return {success: user}
    return {error: "user with this email does not exist"}
}