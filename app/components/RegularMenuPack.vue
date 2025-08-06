<template>
  <UContainer as="div">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-center md:max-w-xl mx-auto">
        Order Freshly Made Nigerian Dishes Delivered Anywhere in Abuja
      </h2>
      <p class="text-center md:text-lg my-3">
        Explore our wide selection of freshly made Nigerian meals, prepared
        daily with premium ingredients and delivered hot across Abuja. From
        jollof rice to small chops, each dish is crafted to satisfy your
        cravings and leave a lasting impression.
      </p>
      <div class="flex justify-center gap-5 mb-8">
        <UButton
          label="see all"
          variant="outline"
          color="neutral"
          size="lg"
          class="px-8 font-semibold"
          to="/menu"
          aria-label="see all"
        />
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-5"
        v-auto-animate
      >
        <ProductCard
          v-for="product in sortedProduct"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { Product } from '~~/types/products';


const props = defineProps<{products: Product[]}>()

const display = ref("foods");

const sortedProduct = computed(() => {
  const pd: Product[] = [];
  for (const product of props.products) {
    if (product.category === display.value) {
      pd.unshift(product);
    } else {
      pd.push(product);
    }
  }
  return pd;
});
</script>

<style></style>
