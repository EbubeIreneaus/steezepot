import { desc, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { productTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const category = (await getRouterParam(event, "category")) as string;
    const query: any = {};

    switch (category) {
      case "recomend":
        query.where = eq(productTable.recomended, true);
        break;
      case "popular":
        query.orderBy = desc(productTable.popularity);
        break;
      case "all":
        break;
      default:
        query.where = eq(productTable.category, category.toLowerCase());
    }

    const products = await db.query.productTable.findMany({
      ...query,
      limit: 30,
    });
    return products;
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
