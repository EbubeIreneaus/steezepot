import { count, eq } from 'drizzle-orm'
import {db} from '~~/server/database'
import {orderTable, contactTable} from '~~/server/database/schema'


export default defineEventHandler(async (event) => {
 try {
   const orderCount = await db.select({count: count()}).from(orderTable).where(eq(orderTable.status,'confirmed'))
   const contactCount = await db.select({count: count()}).from(contactTable).where(eq(contactTable.unread, true))

   return {
      pendingOrders: orderCount[0]?.count ?? 0,
      unreadMessages: contactCount[0]?.count ?? 0
   }
   
 } catch (error: any) {
  return createError({
      statusCode: error.statusCode|| 500 ,
      statusMessage: error.message || 'Internal server error'
  })
 }
})
