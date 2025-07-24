import { eq } from 'drizzle-orm'
import z from 'zod'
import {db} from '~~/server/database'
import { reviewTable } from '~~/server/database/schema'

const schema = z.object({
  name: z.string().min(1, { message: "name cannot be empty" }),
  content: z.string().min(1, { message: "content cannot be empty" }),
});

export default defineEventHandler(async (event) => {
  try {
    const { error, data } = await readValidatedBody(event, schema.safeParse);
    if (error) {
      return createError({
        statusCode: 422,
        statusMessage: error.issues[0].message,
      });
    }

    await db.insert(reviewTable).values(data)
    
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
