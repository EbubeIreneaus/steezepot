<template>
  <UCard class="bg-surface ring-0 rounded-lg shadow shadow-primary/50 h-full" as="div">
    <template #default>
      <div>
        <NuxtImg :src="`/images/food/${product.image}`" format="webp" class="mx-auto size-20 sm:size-32 object-cover" />
        <h4 class=" text-center font-extrabold">{{ product.name }}</h4>
        <p class="text-xs text-center line-clamp-2 my-3">{{ product.desc }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm md:text-base font-semibold" v-naira="product.price"></span>
          <UButton  label="Add To Cart" variant="outline" class="text-text-primary rounded-full font-bold hidden md:block" size="sm" />
          <UButton icon="fa6-solid:cart-plus" variant="outline" class="text-text-primary rounded-full font-bold md:hidden" size="sm" />

        </div>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Product } from '~~/types/products';

defineProps<{
  product: Product;
}>();
</script>

<style>

</style>