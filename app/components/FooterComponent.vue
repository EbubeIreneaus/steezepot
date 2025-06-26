<template>
 <footer class="">
   <UContainer  class="py-20 ">
    <div class="flex flex-col items-center gap-y-5">
      <div class="flex gap-5 justify-center ">
        <UButton icon="fa6-brands:facebook" size="xl" variant="outline" class="rounded-full text-text-primary" />
        <UButton icon="fa6-brands:twitter" size="xl" variant="outline" class="rounded-full text-text-primary" />
        <UButton icon="fa6-brands:instagram" size="xl" variant="outline" class="rounded-full text-text-primary" />
        <UButton icon="fa6-brands:tiktok" size="xl" variant="outline" class="rounded-full text-text-primary" />
      </div>

      <ul role="navigation" class="flex flex-wrap gap-5 justify-center">
        <li class="text-text-primary font-semibold text-lg">
          <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        </li>
        <li class="text-text-primary font-semibold text-lg">
          <NuxtLink to="/menu" class="hover:text-primary">Menu</NuxtLink>
        </li>
        <li class="text-text-primary font-semibold text-lg">
          <NuxtLink to="/blog" class="hover:text-primary">Bookings</NuxtLink>
        </li>
        <li class="text-text-primary font-semibold text-lg">
          <NuxtLink to="/contact" class="hover:text-primary">Contact</NuxtLink>
        </li>
      </ul>

      <div>
        <p class="text-text-primary text-center mb-2">
          &copy; {{ new Date().getFullYear() }} <span class="font-semibold">SteezePot</span>. All rights reserved.
        </p>

        <p class="text-center">Developed by <a href="https://ebustech.vercel.app" target="__blank" rel="noopener noreferrer"
            class="font-semibold font-roboto">Ebube Ireneaus</a></p>
      </div>
    </div>
  </UContainer>
 </footer>
</template>

<script lang="ts" setup>

</script>

<style></style>