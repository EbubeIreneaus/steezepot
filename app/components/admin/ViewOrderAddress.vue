<template>
  <UModal :dismissible="false" :close="{icon: 'fa6-solid:xmark',color: 'error'}">
    <template #title>
      <p class="font-roboto text-secondary ">Delivery Address</p>
    </template>
    <template #body>
      <div class="flex flex-col gap-1 text-neutral-300">
        <div>
          <span class="block font-display text-sm text-neutral-700">phone 1</span>
          <p>08061982520</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">City</span>
          <p>{{ address.city }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Street</span>
          <p>{{ address.street }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Address</span>
          <p>{{ address.country }}</p>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { Address } from '~/libs/orders';

defineProps<{address: Address}>()
</script> 

<style>

</style>