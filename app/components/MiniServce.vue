<template>
  <UContainer as="div" class="mb-10">
    <div class="grid md:grid-cols-2 items-center py-10">
      <div>
        <NuxtImg src="/images/chef-service.png" width="500" height="500" format="webp" class="mx-auto object-cover" />
      </div>
      <div>
        <div>
          <h3 class="text-4xl md:text-5xl font-bold">We are more than just a service</h3>
          <p class="my-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nihil maxime, accusamus
            minima iusto inventore quibusdam consequatur id distinctio vitae, eos voluptatem impedit soluta nostrum
            deleniti, eaque aliquid harum odit.</p>

          <div class="grid grid-cols-2 gap-y-4 mb-10">
            <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/online-order.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">Online Order</p>
            </div>
             <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/time-management.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">Pre - Reservation</p>
            </div>

             <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/24-hours.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">24/7 Hours Service</p>
            </div>

             <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/og-foodie.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">Organized Foodie Place</p>
            </div>

             <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/kitchen.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">Clean Kitchen</p>
            </div>

             <div class="flex gap-x-3 items-center">
              <NuxtImg src="/images/icons/chef.png" width="30" height="30" class="ring ring-text-primary/20 p-1 rounded-full"/>
              <p class="font-semibold font-roboto">Super Chef</p>
            </div>

          </div>

          <UButton label="About Us" color="primary" size="lg" class="font-semibold" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>

</script>

<style></style>