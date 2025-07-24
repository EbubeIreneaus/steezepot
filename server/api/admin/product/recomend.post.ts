
import {db} from '~~/server/database'
import { productTable } from "~~/server/database/schema";
import { eq } from "drizzle-orm";


export default defineEventHandler(async (event) => {
  try {
    const {id} = getQuery(event)
    const body = await readBody(event)


    await db.update(productTable).set({recomended: body.recomend}).where(eq(productTable.id, Number(id)))
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
