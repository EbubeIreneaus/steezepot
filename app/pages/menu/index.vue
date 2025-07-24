<template>
  <div
    class="h-42 bg-surface bg-[url('/images/category-bg.webp')] bg-cover bg-center relative"
  >
    <div class="size-full bg-black/80 z-[50] absolute top-0"></div>
    <div
      class="size-full absolute z-[80] flex justify-center items-center top-0"
    >
      <h1 class="text-3xl font-extrabold font-roboto uppercase text-secondary">
        Homemade {{ category || "Dishe" }}s
      </h1>
    </div>
  </div>
  <u-container class="py-10">
    <div>
      <div class="mb-3 bg-surface p-3 flex items-center justify-end gap-x-5">
        <div class="flex items-center gap-x-3">
          <span class="text-smfont-semibold">Category:</span>
          <u-dropdown-menu :items="menuLinks" :ui="{ content: 'w-28' }">
            <UButton
              :label="categoryLabel"
              variant="soft"
              class="bg-slate-300 text-black"
            />
          </u-dropdown-menu>
        </div>

        <div class="flex items-center gap-x-3">
          <span class="text-sm font-semibold">Order By:</span>
          <u-select
            variant="none"
            :items="['Price low', 'Price High']"
            size="sm"
            class="w-28 bg-slate-300 text-black"
          />
        </div>
      </div>

      <div class="grid lg:grid-cols-5 gap-5">
        <div v-for="product in Products" :key="product.id">
          <product-card :product="product" />
        </div>
      </div>
    </div>
  </u-container>
</template>

<script lang="ts" setup>
import { products } from "~/libs/products";
import type { DropdownMenuItem } from "@nuxt/ui";
import { CATEGORIES } from "~/libs/categories";
import type { Product } from "~~/types/products";
import { useSchemaOrg, defineProduct } from "#imports";

const route = useRoute();
const { category } = route.params;
const categoryLabel = Array.isArray(category) ? category[0] : category || "all";

const menuLinks = [
  {
    type: "link" as const,
    label: "all",
    to: "/menu",
    exactActiveClass: "secondary",
  },
].concat(
  CATEGORIES.map(({ title, value }) => ({
    type: "link" as const,
    label: title,
    to: `/menu/${value.toLowerCase()}`,
    exactActiveClass: "secondary",
  }))
);

const { data: Products, error } = await useFetch<Product[]>(
  () => `/api/main/product/popular`
);

if (error.value) {
  throw createError({ ...error.value, message: error.value.statusMessage });
}

useSchemaOrg(
  Products.value?.slice(20).map((product) => {
    defineProduct({
      "@id": `product-${product.id}`,
      "@type": "Product",
      name: product.name,
      image: `https://res.cloudinary.com/dx0f23f3t/image/upload/${product.image}`,
      description: product.desc,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "NGN",
      },
    });
  })
);

useSeoMeta({
  title: 'SteezePot Kitchen Menu — Order Delicious Homemade Meals Online',
  ogTitle: 'SteezePot Kitchen Menu — Order Delicious Homemade Meals Online',
  twitterTitle: 'SteezePot Kitchen Menu',
  description: 'Order freshly made food from a variety of categories and enjoy fast home delivery to your doorstep in Abuja.',
  ogDescription: 'Order delicious Nigerian dishes from SteezePot, delivered fresh and fast in Abuja.',
  twitterDescription: 'Explore our kitchen menu and order food online.',
  ogUrl: 'https://steezepot.com.ng/menu',
})

useHead({
  link: [{ rel: "canonical", href: "https://steezepot.com.ng/menu" }],
});
</script>

<style></style>
