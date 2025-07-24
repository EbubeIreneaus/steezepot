import { eq } from "drizzle-orm";
import prisma from "~~/lib/prisma";
import { db } from "~~/server/database";
import { productTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const id = getQuery(event).id ;
    if (!id || isNaN(Number(id))) {
      return createError({
        statusCode: 422,
        statusMessage: "Invalid id parameter",
      });
    }
    const product = await db.query.productTable.findFirst({
      where: eq(productTable.id, Number(id))
    })
    return product
  } catch (error: any) {
     return createError({
        statusCode: 500,
        statusMessage: error.message,
      });
  }
});
