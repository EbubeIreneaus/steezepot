<template>
  <UModal :dismissible="false" :close="{icon: 'fa6-solid:xmark',color: 'error'}">
    <template #title>
      <p class="font-roboto text-secondary ">Delivery Information</p>
    </template>
    <template #body>
      <div class="flex flex-col gap-1 text-neutral-300 mb-5">

        <h2 class="font-bold font-display">Personal Information</h2>
        <div>
          <span class="block font-display text-sm text-neutral-700">Name</span>
          <p>{{ user.name }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Email</span>
          <p>{{ user.email }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Phone</span>
          <p>{{ user.phone }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-1 text-neutral-300">
        <h2 class="font-bold font-display">Address Information</h2>
        <div>
          <span class="block font-display text-sm text-neutral-700">State</span>
          <p>{{ address.state }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">City</span>
          <p>{{ address.city }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Bustop/Landmark</span>
          <p>{{ address.bustop }}</p>
        </div>
        <div>
          <span class="block font-display text-sm text-neutral-700">Delivery Point</span>
          <p>{{ address.street_address }}</p>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { Address, User } from '~~/types/order';

defineProps<{address: Address, user: User}>()
</script> 

<style>

</style>