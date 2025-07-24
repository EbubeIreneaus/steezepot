import {db} from '~~/server/database'

export default defineEventHandler(async (event) => {
  try {
    const faqs = await db.query.faqTable.findMany()
    return faqs
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
