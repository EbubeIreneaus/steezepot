<template>
  <div>
    <div class="flex justify-end py-4 mb-3">
      <UButton icon="fa6-solid:plus" label="Add Review" color="primary" class="px-5" @click="addNewReview = !addNewReview" />
    </div>
    <UTable :data="reviews" :columns="column" />

    <UModal v-model:open="addNewReview" :dismissible="false" :close="{icon:'fa6-solid:xmark', color:'error'}">
      <template #title><div class="font-roman">Add Review</div></template>
      <template #body>
        <form>
          <UFormField label="Fullname" required class="mb-3">
            <UInput placeholder="name" variant="ghost" class="ring w-full rounded-sm" />
          </UFormField>
           <UFormField label="Review" required class="mb-5">
            <UTextarea placeholder="Review" variant="ghost" class="ring w-full rounded-sm" />
          </UFormField>
          <div class="flex flex-wrap gap-5">
            <UButton label="save" variant="outline" />
            <UButton label="save & continue" />
            <UButton label="reset" color="error" variant="outline" />
          </div>
        </form>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { reviews } from '~/libs/review';
import type { TableColumn } from '@nuxt/ui';

definePageMeta({
  layout: 'admin'
})

const addNewReview= ref(true)
const UDropdownMenun = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const column : TableColumn<{name: string; review: string; avatar: string; }>[] = [
  {
    accessorKey: 'action',
    header: '',
    cell:({row}) => {
      return h(UDropdownMenun, {
        content:{
          align:'start'
        },
        items: [
          {
            label: 'Edit',
            color: 'neutral',
            icon: 'fa6-solid:pencil'
          }, 
          {
            label: 'Delete',
            color: 'error',
            icon: 'fa6-solid:trash-can'
          }
        ]
      }, h(UButton, {icon: 'fa6-solid:ellipsis-vertical',variant: 'ghost', color: 'neutral'}))
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({row}) => row.getValue('name')
  },
  {
    accessorKey: 'review',
    header: 'Review',
    cell: ({row}) => {
      return h('p', {class: 'text-xs'}, row.getValue('review'))
    }
  }
]
</script>

<style>

</style>