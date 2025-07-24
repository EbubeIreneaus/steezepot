import { eq } from 'drizzle-orm'
import {db} from '~~/server/database'
import { reviewTable } from '~~/server/database/schema'
` `
export default defineEventHandler(async (event) => {
 
  try {
    const reviews = await db.query.reviewTable.findMany()
    return reviews
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
