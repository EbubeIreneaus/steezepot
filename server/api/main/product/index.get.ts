import {db} from '~~/server/database'

export default defineEventHandler(async (event) => {
  try {
    const products = await db.query.productTable.findMany()
    return products
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
