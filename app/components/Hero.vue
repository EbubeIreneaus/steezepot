<template>
  <UContainer as="div">
    <div class="w-full flex flex-col md:flex-row gap-y-10 items-center justify-between text-text-primary py-10">
      <div class="size-full">
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-5">We Serve The Taste You Love 😍</h1>
        <p class="mb-5 max-w-md">
          This is a type of restaurant which typically serves food and drinks, in addition to light refreshments such as
          baked goods or snacks.
          The term comes from the French word meaning food. </p>
        <div class="flex gap-x-4 items-center">
          <UButton label="Explore food" color="primary" class="rounded-md" />
          <UButton icon="fa6-solid:magnifying-glass" label="Search" variant="outline" class="text-text-primary" />
        </div>
      </div>


      <div class="size-full ">
        <div class="size-60 md:size-86 rounded-full bg-primary/10 flex items-center justify-center md:mx-auto">
          <div class="relative flex items-center size-[90%] mx-auto">
            <div class="absolute left-0 size-52 md:size-74 z-0 rounded-full border border-black/20"></div>
            <div class="absolute left-0  size-48 md:size-68 z-10 border border-black/10 rounded-full"></div>
            <NuxtImg src="/images/hero-dish.png" width="280" height="290" format="webp"
              class="z-20 relative size-46 md:size-62 object-cover object-center" />

            <div class="absolute flex flex-col -right-16 sm:-right-12 ">
              <UButton v-for="dish in dishes" :key="dish.name" variant="soft" size="sm"
                class="mb-3 md:mb-5 bg-surface rounded-full px-3 text-text-primary z-30 font-semibold shadow-sm shadow-primary/50"
                :avatar="{
                  src: dish.image
                }">
                {{ dish.name }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const dishes = [
  {
    name: 'Dishes',
    image: '/images/icons/dishes.png',
  },
  {
    name: 'Dessert',
    image: '/images/icons/dessert.png',
  },
  {
    name: 'Drinks',
    image: '/images/icons/drinks.png',
  },
  {
    name: 'Platter',
    image: '/images/icons/platter.png',
  },
  {
    name: 'Snacks',
    image: '/images/icons/snacks.png',
  },

];
</script>

<style></style>