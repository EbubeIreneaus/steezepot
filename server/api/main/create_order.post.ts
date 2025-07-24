import { createInsertSchema, CreateInsertSchema } from "drizzle-zod";
import { orderTable } from "~~/server/database/schema";
import { db } from "~~/server/database";
import { eq } from "drizzle-orm";


const schema = createInsertSchema(orderTable);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {data, error}= schema.safeParse(body)

    if(error){
      return createError({statusCode: 422, statusMessage: error.issues[0].message})
    }
    const result = await db.insert(orderTable).values(data);
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, (result as any)[0]?.insertId)
    });
    return { success: true, data: order };
  } catch (error: any) {
    console.log(error.message);
    return createError({ statusMessage: error.message });
  }
});
