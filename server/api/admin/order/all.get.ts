import { db } from "~~/server/database";
import { orderTable } from "~~/server/database/schema";
import { asc, desc, eq } from "drizzle-orm";
import type { Order } from "~~/types/order";

export default defineEventHandler(async (event) => {
  try {
    let orders = [];
    const { orderid, status, orderby } = (await getQuery(event)) as any;
    const query: any = {};

    if (orderid && orderid !== "") {
      const id = orderid.split("-")[1];
      query.where = eq(orderTable.id, Number(id));
    } else if (status && status !== "" && status !=='all') {
      query.where = eq(orderTable.status, status);
    }

    if (orderby === 'newer') {
      query.orderBy = [desc(orderTable.id)]
    }

    orders = await db.query.orderTable.findMany(query)
    return orders;
  } catch (error: any) {
    return createError({ statusMessage: error.message });
  }
});
