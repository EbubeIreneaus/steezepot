<template>
  <UContainer class="py-10 mt-5 overflow-x-hidden">
    <div>
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl md:text-4xl font-extrabold">Customers Reviews</h2>
        <div class="flex items-center gap-x-3">
          <UButton
            icon="fa6-solid:arrow-left"
            variant="outline"
            color="neutral"
            class="rounded-full shadow"
            size="lg"
            @click="swipePrev()"
            :disabled="reviewSwiperInstance?.isBeginning"
            aria-label="slide prev"
          />
          <UButton
            icon="fa6-solid:arrow-right"
            variant="outline"
            color="neutral"
            class="rounded-full shadow"
            size="lg"
            @click="swipeNext()"
            :disabled="reviewSwiperInstance?.isEnd"
            aria-label="slide next"
          />
        </div>
      </div>
    </div>

    <div class="swiper-container review-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="review in reviews" :key="review.name">
          <UCard class="bg-surface ring-0 shadow">
            <template #default>
              <div>
                <p class="font-roboto mb-3 text-black">
                  {{ review.content }}
                </p>
                <p class="font-playfair font-semibold">{{ review.name }}</p>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import Swiper from "swiper";
import "swiper/css";
import type { Review } from "~~/types/review";

const props = defineProps<{ reviews: Review[] }>();

const reviewSwiperInstance = ref<Swiper | null>(null);

const swipeNext = () => {
  reviewSwiperInstance.value?.slideNext();
};

const swipePrev = () => {
  reviewSwiperInstance.value?.slidePrev();
};

onMounted(() => {
  reviewSwiperInstance.value = new Swiper(".review-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },

      992: {
        slidesPerView: 3,
      },
    },
  });
});
</script>

<style></style>
