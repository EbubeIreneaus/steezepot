
import { uploadBufferToCloudinary } from "~~/lib/cloudinary";
import {db} from '~~/server/database'
import { productTable } from "~~/server/database/schema";
import { eq } from "drizzle-orm";


export default defineEventHandler(async (event) => {
  try {
    const product: any = {};
    const {id} = getQuery(event)
    const formData = await readMultipartFormData(event);

    if (!formData) {
      return createError("unknown server error");
    }

    for (const body of formData) {
      if (body.name == "image" && body.filename) {
        const result = (await uploadBufferToCloudinary(
          body.data,
          "steeze-pot/products"
        )) as { secure_url: string };
        product.image = result.secure_url;
      } else {
        if (body.name) {
          product[body.name] = body.data.toString("utf-8");
        }
      }
    }

    await db.update(productTable).set(product).where(eq(productTable.id, Number(id)))
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
