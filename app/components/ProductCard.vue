<template>
  <UCard
    class="bg-surface ring-0 rounded-lg shadow h-full"
    as="div"
  >
    <template #default>
      <div>
        <div class="size-28 sm:size-32 overflow-hidden mx-auto">
          <img
            :src="`/images/products/${product.image}`"
            :alt="product.alt || product.desc"
            format="webp"
            width="100"
            height="100"
            class="object-cover object-center"
          />
        </div>
        <h3 class="text-center font-extrabold">{{ product.name }}</h3>
        <p class="text-base font-display text-center line-clamp-2 my-3">{{ product.desc }}</p>
        <div class="flex justify-between gap-x-2 items-center">
          <p
            class="!text-sm md:text-base font-semibold"
            v-naira="product.price"
          ></p>
          <UButton
            :aria-label="`add ${product.name} to cart`"
            label="Add To Cart"
            variant="outline"
            class="text-text-primary rounded-full font-bold hidden md:block"
            size="sm"
            @click="toggleAddToCart(product)"
          />
          <UButton
            :aria-label="`add ${product.name} to cart`"
            icon="fa6-solid:cart-plus"
            variant="outline"
            class="text-text-primary rounded-full font-bold md:hidden"
            size="sm"
            @click="toggleAddToCart(product)"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Product } from "~~/types/products";
const { toggleAddToCart} = useCartStore()

defineProps<{
  product: Product;
}>();
</script>

<style></style>
