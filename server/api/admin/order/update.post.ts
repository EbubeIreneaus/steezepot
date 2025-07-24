
import {db} from '~~/server/database'
import { orderTable } from "~~/server/database/schema";
import { eq } from "drizzle-orm";
import {createUpdateSchema} from 'drizzle-zod'

const schema = createUpdateSchema(orderTable)
export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event)
    const {data, error}= await readValidatedBody(event, schema.safeParse)
    if(error){
      return createError({statusCode: 401, statusMessage: error.issues[0].message})
    }
    await db.update(orderTable).set(data).where(eq(orderTable.id, Number(id)))
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
