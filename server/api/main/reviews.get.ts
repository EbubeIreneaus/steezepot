import {db} from '~~/server/database'

export default defineEventHandler(async (event) => {
  try {
    const reviews = await db.query.reviewTable.findMany()
    return reviews
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
