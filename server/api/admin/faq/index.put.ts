import { db } from "~~/server/database";
import z from "zod";
import { faqTable } from '~~/server/database/schema';

const schema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty" }),
  answer: z.string().min(1, { message: "Answer cannot be empty" }),
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
    
    await db.insert(faqTable).values(data)
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
