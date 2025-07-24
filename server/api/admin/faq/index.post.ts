import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '~~/server/database'
import { faqTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event) as {id: string}
    const {error, data} = await readValidatedBody(event, schema.safeParse)
    if(error) return createError({statusCode: 422, statusMessage: error.issues[0].message})
    
    await db.update(faqTable).set(data).where(eq(faqTable.id, parseInt(id)))
    
    return {success: true}
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})

const schema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty" }),
  answer: z.string().min(1, { message: "Answer cannot be empty" }),
});

