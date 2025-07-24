import {db} from '~~/server/database'
import { contactTable } from '~~/server/database/schema'
import { createInsertSchema, CreateInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(contactTable)

export default defineEventHandler(async (event) => {
  try {
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (error) {
      return createError({
        statusCode: 401,
        statusMessage:error.issues[0].message
      })
    }

    await db.insert(contactTable).values(data)
    return {success: true}
  } catch (error: any) {
     return createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'Internal server error'
      })
  }
})

