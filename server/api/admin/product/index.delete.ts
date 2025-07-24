import prisma from "~~/lib/prisma"
import {db} from '~~/server/database'
import { productTable } from "~~/server/database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string}

    await db.delete(productTable).where(eq(productTable.id, Number(id)))

    return {success: true}
    
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
