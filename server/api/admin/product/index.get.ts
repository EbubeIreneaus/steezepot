import { db } from "~~/server/database"; 
import { productTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const products = await db.query.productTable.findMany();
    return products;
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
