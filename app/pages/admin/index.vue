<template>
  <div>
    <div class="grid sm:grid-cols-2 gap-3 md:gap-2 lg:gap-0 ">
      <UCard class="md:rounded-none md:rounded-l-lg flex flex-col items-center text-center">
        <Icon name="fa6-solid:cart-shopping" class="text-text-body" />
        <p class="font-bold text-xl my-1.5">{{ data?.pendingOrders }}</p>
        <p class="text-text-body font-display text-sm ">Confirmed Order's</p>
        
      </UCard>
      <!-- <UCard class="md:rounded-none">
        <Icon name="fa6-solid:dollar-sign" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Revenue</p>
        <p class="font-semibold text-lg" v-naira="1600"></p>
      </UCard>
      <UCard class="md:rounded-none">
        <Icon name="fa6-solid:bag-shopping" class="text-green-500" />
        <p class="text-text-body font-display text-sm my-1.5">Orders</p>
        <p class="font-semibold text-lg">51</p>
      </UCard> -->
      <UCard  class="md:rounded-none md:rounded-r-lg text-center">
        <Icon  name="fa6-solid:envelopes-bulk" size="xl" class="text-text-body" />
        <p class="font-bold text-2xl my-1.5">{{ data?.unreadMessages }}</p>
        <p class="text-text-body font-display text-sm">Unread Message's</p>
        
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { $ZodNumberFormat } from 'zod/v4/core'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})
const { data, pending, error, refresh } = await useFetch<{
  pendingOrders: number,
  unreadMessages: number
}>('/api/admin/dashboard')

if(error.value) throw createError({...error.value, message: error.value.statusMessage})
</script>

<style>

</style>