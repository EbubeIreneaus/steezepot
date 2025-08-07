<template>
  <UContainer as="div" class="overflow-x-hidden">
    <div
      class="w-full flex flex-col md:flex-row gap-y-10 items-center justify-between text-black py-10"
    >
      <div class="size-full">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-5 font-playfair">
          Delicious Homemade Meals & Private Chef Service for Your Events in
          Abuja.
        </h1>
        <p
          class="mb-5 max-w-md text-black font-roboto"
          data-aos="fade-up"
        >
          Enjoy freshly prepared, home-cooked meals delivered to your doorstep,
          or book a professional chef for your next small event. At SteezePot,
          we serve delicious Nigerian dishes made with love — perfect for
          everyday cravings, birthdays, and intimate gatherings in Abuja.
        </p>
        <div class="flex gap-x-4 items-center">
          <UButton
            label="Explore Meals"
            to="#regular-menu"
            size="xl"
            class="rounded-md font-medium bg-text-primary hover:!bg-text-body text-white px-5 py-3"
          />
          <UButton
            icon="fa6-solid:cookie"
            label="Book a Private Chef"
            class="bg-yellow-400 text-black shadow shadow-[#EAB308] font-semibold py-3"
            size="xl"
            aria-label="Book a Private Chef"
            to="#contact-me"
          />
        </div>
      </div>

      <div class="size-full">
        <div
          class="size-60 md:size-86 rounded-full bg-primary/10 flex items-center justify-center md:mx-auto"
        >
          <div class="relative flex items-center size-[90%] mx-auto">
            <div
              class="absolute left-0 size-52 md:size-74 z-0 rounded-full border border-black/20"
            ></div>
            <div
              class="absolute left-0 size-48 md:size-68 z-10 border border-black/10 rounded-full"
            ></div>
            <img
              src="/images/hero-dish.webp"
              srcset="
                /images/hero-dish.webp     280w,
                /images/hero-dish_184.webp 184w
              "
              sizes="(min-width: 768px) 280px, 184px"
              width="280"
              height="290"
              quality="90"
              densities="x1"
              format="webp"
              class="z-20 relative size-46 md:size-62 object-cover object-center hover:scale-110 hover:rotate-45 transition-all duration-300 linear"
              alt="Grilled fish with lemon, cherry tomatoes, and fresh greens on a ceramic plate"
            />

            <div class="absolute flex flex-col -right-16 sm:-right-12">
              <UButton
                v-for="(dish, index) in dishes"
                :key="dish.name"
                :aria-label="dish.name"
                variant="soft"
                size="sm"
                class="mb-3 md:mb-5 bg-surface rounded-full px-3 text-black z-30 font-semibold shadow-sm shadow-primary/50 hover:scale-125 transition-all duration-300 linear"
                :avatar="{
                  src: dish.image,
                  alt: `${dish.name}-icon`,
                }"
                data-aos="fade-up"
                :data-aos-delay="(index / 10) * 500 + 500"
              >
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
    name: "Dishes",
    image: "/images/icons/dishes.webp",
  },
  {
    name: "Dessert",
    image: "/images/icons/dessert.webp",
  },
  {
    name: "Drinks",
    image: "/images/icons/drinks.webp",
  },
  {
    name: "Platter",
    image: "/images/icons/platter.webp",
  },
  {
    name: "Snacks",
    image: "/images/icons/snacks.webp",
  },
];
</script>

<style></style>
