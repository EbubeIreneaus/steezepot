<template>
  <UContainer as="div">
    <div>
      <h2 class="text-4xl md:text-5xl font-extrabold text-center">Our Regular Menu Pack</h2>
      <p class="text-center text-lg md:text-xl my-3">Explore our regular menu pack, featuring a variety of delicious
        dishes that cater to all tastes.</p>
      <div class="flex justify-center gap-5 my-8">
        <UButton label="Foods" :variant="display == 'foods' ? 'solid' : 'outline'" size="lg"
          class="px-8 font-semibold" @click="display = 'foods'" />
        <UButton label="Drinks" :variant="display == 'drinks' ? 'solid' : 'outline'" size="lg"
          class="px-8 font-semibold" @click="display = 'drinks'" />
      </div>
       <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" v-auto-animate>
          <ProductCard v-for="product in sortedProduct" :product="product" :key="product.id" />
        </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { products } from '~/libs/products';
import type { Product } from '~~/types/products';


const display = ref('foods')

const sortedProduct = computed(() => {
  const pd: Product[] = []
  for (const product of products){
    if (product.category === display.value) {
        pd.unshift(product)
    }else{
      pd.push(product)
    }
  }
  return pd
})


</script>

<style></style>