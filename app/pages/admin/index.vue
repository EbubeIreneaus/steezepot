<template>
  <div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2  gap-3 md:gap-2 lg:gap-0 ">
      <UCard class="md:rounded-none md:rounded-l-lg">
        <Icon name="fa6-solid:users" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Customers</p>
        <p class="font-semibold text-lg">200</p>
      </UCard>
      <UCard class="md:rounded-none">
        <Icon name="fa6-solid:dollar-sign" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Revenue</p>
        <p class="font-semibold text-lg" v-naira="1600"></p>
      </UCard>
      <UCard class="md:rounded-none">
        <Icon name="fa6-solid:bag-shopping" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Orders</p>
        <p class="font-semibold text-lg">51</p>
      </UCard>
      <UCard class="md:rounded-none md:rounded-r-lg">
        <Icon  name="fa6-solid:arrow-trend-up" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Conversion</p>
        <p class="font-semibold text-lg">200</p>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',

})
</script>

<style>

</style>