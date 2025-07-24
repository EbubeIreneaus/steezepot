import {db} from '~~/server/database'
import { newLetterEmail } from '~~/server/database/schema'
import { createInsertSchema, CreateInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(newLetterEmail)

export default defineEventHandler(async (event) => {
  try {
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (error) {
      return createError({
        statusCode: 401,
        statusMessage:error.issues[0].message
      })
    }

    await db.insert(newLetterEmail).values(data)
    return {success: true}
  } catch (error: any) {
     return createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'Internal server error'
      })
  }
})

