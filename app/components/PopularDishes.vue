<template>
  <UContainer>
    <div>
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl md:text-4xl font-extrabold">Popular Dishes</h2>
        <div class="flex items-center gap-x-3">
          <UButton icon="fa6-solid:arrow-left" variant="outline" class="text-text-primary rounded-full shadow" size="xl"
            @click="slidePrev()" :disabled="swiperInstance?.isBeginning" />
          <UButton icon="fa6-solid:arrow-right" variant="outline" class="text-text-primary rounded-full shadow "
            size="xl" @click="slideNext()" :disabled="swiperInstance?.isEnd" />
        </div>
      </div>

      <div>
        <div class="swiper-container p-dish-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="product in products" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { UContainer } from '#components';
import { products } from '~/libs/products';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import { ref } from 'vue';

const swiperInstance = ref<Swiper | null>(null);

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

onMounted(() => {
  swiperInstance.value = new Swiper('.p-dish-swiper', {
    modules: [Navigation],
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
     
      768: {
        slidesPerView: 3,
        spaceBetween: 15,

      },
      992: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
    },
  });
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  overflow-x: hidden;
}

.swiper-wrapper {
  align-items: stretch; /* ensures all slides align height-wise */
}

.swiper-slide {
  display: flex;
  height: 100%;
  min-height: 350px;
  flex: 1 0 auto;
}
</style>