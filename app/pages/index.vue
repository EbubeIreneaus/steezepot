<template>
  <main>
   <Hero />
   <PopularDishes />
   <MiniServce />
   <RegularMenuPack />
   <MiniMakeReservation />
   <ClientReviews />
   <ContactUs />
   <NewsLetter />
  </main>
</template>

<script lang="ts" setup>
defineOgImageComponent('NuxtSeo', {
  title: 'STEEZEPOT',
  description: 'Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.',
  colorMode: 'dark',
  theme: '#F4B916'
})
useSeoMeta({
  ogTitle: 'SteezePot - Food Delivery & Catering Services',
  ogDescription: 'Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.',
  ogUrl: 'https://steezepot.com.ng',
  twitterCard: 'summary_large_image',
})
</script>

<style>

</style>