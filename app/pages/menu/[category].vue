<template>
  <div class=" h-42 bg-surface bg-[url('/images/category-bg.webp')] bg-cover bg-center relative">
    <div class="size-full bg-black/80 z-[50] absolute top-0"></div>
    <div class="size-full absolute z-[80] flex justify-center items-center top-0">
      <h1 class="text-3xl font-extrabold font-roboto uppercase text-secondary">Homemade {{ category }}s</h1>
    </div>
  </div>
  <u-container class="py-10">
    <div>
      <div class="mb-3 bg-surface p-3 flex flex-wrap items-center justify-end gap-5">
        <div class="flex items-center gap-x-3">
          <span class="text-smfont-semibold">Category:</span>
          <u-dropdown-menu :items="menuLinks"  :ui="{ content: 'w-28' }" size="xl">
            <UButton :label="category as string" variant="soft"  class="bg-slate-300 text-black capitalize" />
          </u-dropdown-menu>
        </div>

        <div class="flex items-center gap-x-3">
          <span class="text-sm font-semibold">Order By:</span>
          <u-select variant="none" :items="['Price low', 'Price High']" size="sm"
            class="w-28 bg-slate-300 text-black" />
        </div>
      </div>

      <div class="grid lg:grid-cols-5 gap-5" v-if="Products && Products.length > 0">
        <div v-for="product in Products" :key="product.id">
          <product-card :product="product" />
        </div>
      </div>
      <div v-else class="h-42 flex items-center justify-center">
        <p>No Record Found</p>
      </div>
    </div>
  </u-container>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { CATEGORIES } from "~/libs/categories";
import type { Product } from '~~/types/products';
import { useSchemaOrg, defineProduct } from '#imports';
import { product as Products } from "~/libs/products";


const route = useRoute()
const {category} = route.params as {category: string}

const menuLinks: DropdownMenuItem[] = [
  { type: "link", label: "all", to: "/menu", exactActiveClass: "secondary" },
  ...CATEGORIES.map(({ title, value }) => ({
    type: "link" as const,
    label: title,
    to: `/menu/${value.toLowerCase()}`,
    exactActiveClass: "secondary",
  }))
];

// const {data: Products, error} = await useFetch<Product[]>(()=>`/api/main/product/${category.toLowerCase()}`)

// if(error.value){
//   throw createError({...error.value, message: error.value.statusMessage})
// }

// useSchemaOrg(
//   Products.value?.slice(20).map((product) => {
//     defineProduct({
//       "@id": `product-${product.id}`,
//       "@type": 'Product',
//       name: product.name,
//       image: `https://res.cloudinary.com/dx0f23f3t/image/upload/${product.image}`,
//       description: product.desc,
//       offers: {
//         "@type": 'Offer',
//         price: product.price,
//         priceCurrency: 'NGN'
//       }
//     })
//   })
// )

const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
useSeoMeta({
  title: `SteezePot Kitchen Menu — Order Delicious Homemade ${capitalizedCategory}s Online`,
  ogTitle:`SteezePot Kitchen Menu — Order Delicious Homemade ${capitalizedCategory}s Online`,
  twitterTitle:`Order Delicious Homemade ${capitalizedCategory}s Online`,
  description: `Order freshly made ${category}s and enjoy fast home delivery to your doorstep in Abuja.`,
  ogDescription: `Order freshly made ${category}s and enjoy fast home delivery to your doorstep in Abuja.`,
  twitterDescription:`Order freshly made ${category}s and enjoy fast home delivery to your doorstep in Abuja.`,
  ogUrl:` https://steezepot.com.ng/menu/${category}`,
})

useHead({
  link: [{ rel: "canonical", href: `https://steezepot.com.ng/menu/${category}` }],
});
</script>

<style></style>
