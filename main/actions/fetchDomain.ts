"use server"

import { db } from "@/lib/db"

export const fetchDomain = async (confId: string) => {
    const data = await db.conference.findUnique({
        where: {
            id: confId
        },
        select: {domain: true}
    })

    if(!data) return {error: "something went wrong"};
    return {success: data.domain}
}