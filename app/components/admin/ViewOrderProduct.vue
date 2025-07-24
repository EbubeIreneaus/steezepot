<template>
  <UModal :dismissible="false" :close="{icon: 'fa6-solid:xmark',color: 'error'}">
    <template #title>
      <p class="font-roboto text-secondary ">Items Purchased</p>
    </template>
    <template #body>
      <ul class="">
        <li class="flex flex-wrap items-center gap-x-4 gap-y-3 text-slate-300 mb-3" v-for="(item, index) in items" :key="index"> 
          <p class="font-display">{{index + 1}}. &nbsp;{{ item.product.name }}</p>
          <p class="flex gap-x-2 text-sm">
            <span v-naira="item.product.price"></span>
            <span>X</span>
            <span>{{ item.quantity }}</span>
          </p>
        </li>
      </ul>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { Item } from '~~/types/order';


defineProps<{items: Item[]}>()
</script> 

<style>

</style>