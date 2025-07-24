import { eq } from 'drizzle-orm'
import {db} from '~~/server/database'
import {faqTable} from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string}

    await db.delete(faqTable).where(eq(faqTable.id, parseInt(id)))
    
    return {success: true}
    
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
