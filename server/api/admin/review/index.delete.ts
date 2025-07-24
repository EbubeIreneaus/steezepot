import { eq } from 'drizzle-orm'
import {db} from '~~/server/database'
import { reviewTable } from '~~/server/database/schema'


export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string}

    await db.delete(reviewTable).where(eq(reviewTable.id, Number(id)))

    return {success: true}
    
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
