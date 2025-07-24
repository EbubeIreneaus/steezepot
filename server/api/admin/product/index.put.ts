import prisma from "~~/lib/prisma";
import z, { Schema } from "zod";
import { min } from "date-fns";
import { Product } from "~~/types/products";
import { uploadBufferToCloudinary } from "~~/lib/cloudinary";
import { db } from "~~/server/database";
import { productTable } from "~~/server/database/schema";

const schema = z.object({
  name: z.string().min(1, { message: "product must contain a name" }),
  price: z.number().min(0, { message: "product must have a price" }),
  desc: z.string().min(1, { message: "description cannot be empty" }),
  alt: z.string(),
  image: z.instanceof(File, { message: "file must be instance of an image" }),
});

export default defineEventHandler(async (event) => {
  try {
    const product = {
      name: "",
      desc: "",
      image: "",
      price: '',
      category: "",
      alt: "",
    };
    const formData = await readMultipartFormData(event);
    // const {data, error} = schema.safeParse(body)
    // if (error) {
    //   return createError({statusCode: 422, message: error.issues[0].message})
    // }
    if (!formData) {
      return createError("unknown server error");
    }

    for (const body of formData) {
      if (body.name == "image") {
        if (body.filename) {
          const result = (await uploadBufferToCloudinary(
            body.data,
            "steeze-pot/products"
          )) as { secure_url: string, public_id: string };
          product.image = result.public_id;
        } else {
          return createError({statusCode:422,  statusMessage: 'Image cannot be empty'})
        }
      } else {
       if (body.name) {
         product[body.name as keyof typeof product] = body.data.toString("utf-8");
       }
       }
    }

    await db.insert(productTable).values(product)
    return { success: true };
  } catch (error: any) {
    return createError(error.message);
  }
});
