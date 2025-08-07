<template>
  <main>
    <Hero />
    <!-- rename popular dish to recommend -->
    <PopularDishes  :products="product ?? []" />
    <MiniServce />
    <RegularMenuPack :products="product ?? []" />
    <MiniMakeReservation />
    <ClientReviews :reviews="reviews ?? []" />
    <ContactUs />
    <FAQ :faqs="faqs ?? []" />
    <NewsLetter />
  </main>
</template>

<script lang="ts" setup>
// import type { Faq } from "~~/types/faq";
// import type { Review } from "~~/types/review";
// import type { Product } from "~~/types/products";
// import { useSchemaOrg, defineProduct, defineQuestion, defineComment } from "#imports";
import { product } from "~/libs/products";
import { faqs } from "~/libs/faq";
import { reviews } from "~/libs/review";

defineOgImageComponent("NuxtSeo", {
  title: "STEEZEPOT",
  description:
    "Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.",
  colorMode: "dark",
  theme: "#F4B916",
});

useSeoMeta({
  ogTitle: "SteezePot - Food Delivery & Catering Services",
  ogDescription:
    "Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.",
  ogUrl: "https://steezepot.com.ng",
  twitterCard: "summary_large_image",
  twitterTitle: 'SteezePot - Food Delivery & Catering Services',
  twitterDescription: 
        "Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.",
  ogType: 'website',
  
});


// const { data, error } = await useAsyncData("homeData", async () => {
//     const [recomend, popular, reviews, faqs] = await Promise.all([
//       $fetch("/api/main/product/recomend") as unknown as Product[],
//       $fetch("/api/main/product/popular") as unknown as Product[],
//       $fetch("/api/main/reviews") as unknown as Review[],
//       $fetch("/api/main/faq") as unknown as Faq[],
//     ]);
//     return { recomend, popular, reviews, faqs };
//   });

// if (error.value) {
//   throw createError(error.value.message);
// }

// useSchemaOrg([
//   ...(data.value?.popular ?? []).map((product: Product) =>
//     defineProduct({
//       "@id": `#menu-${product.id}`,
//       "@type": "Product",
//       name: product.name,
//       description: product.desc,
//       image: `https://res.cloudinary.com/dx0f23f3t/image/upload/${product.image}`,
//       offers: {
//         "@type": "Offer",
//         price: product.price,
//         priceCurrency: "NGN",
//       },
//     })
//   ),

//   ...(data.value?.faqs ?? []).map((faq) => {
//     defineQuestion({
//       "@type": 'Faq',
//       "@id": `#faq-${faq.id}`,
//       acceptedQuestion: faq.question,
//       acceptedAnswer: faq.answer
//     })
//   }),
//    ...(data.value?.reviews ?? []).map((review) => {
//     defineComment({
//       "@type": 'Comment',
//       "@id": `#comment-${review.id}`,
//       text: review.content,
//       author:{
//         name: review.name
//       }
//     })
//   })
// ]);

useHead({
  link: [
    {rel: 'canonical', href: 'https://steezepot.com.ng'}
  ]
})
</script>

<style></style>
