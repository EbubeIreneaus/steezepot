import {db} from '~~/server/database'
import {orderTable} from '~~/server/database/schema'
import {eq} from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if(body.status != 'completed'){
      return createError({statusCode: 400, statusMessage: 'Payment was unsuccessful'})
    }

    const orderId = body.tx_ref.split('-')[1]
    const order = await db.query.orderTable.findFirst({where: eq(orderTable.id, Number(orderId))})

    if(order && Number(order.totalAmount) <= body.amount){
      await db.update(orderTable).set({status: 'confirmed'}).where(eq(orderTable.id, Number(orderId)))
    }

    return {success: true}
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
})
