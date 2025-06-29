<template>
  <div>
    <div class="flex justify-end py-4 mb-3">
      <UButton icon="fa6-solid:plus" label="Add Product" color="primary" class="px-5" to="/admin/add-product" />
    </div>
    <UTable :sticky="true" :data="products" :columns="column" class="flex-1 max-h-[500px]" />
  </div>
</template>

<script lang="ts" setup>
import { products } from '~/libs/products';
import type { Product } from '~~/types/products';
import type { TableColumn } from '@nuxt/ui';

definePageMeta({
  layout: 'admin'
})

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const column: TableColumn<Product>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const src = row.getValue('image')
      return h('img', { src: `/images/food/${src}`, class: 'size-12' })
    }
  },

  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h('div', [
        h('span', { class: 'font-semibold line-clamp-1 block' }, row.getValue('name')),
        h('p', { class: 'text-xs text-secondary line-clamp-2' }, row.original.desc)
      ]);
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = row.getValue('price');
      return h('span', { class: 'font-semibold' }, new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Number(price)));
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => h('p', { class: 'capitalize font-semibold' }, row.getValue('category'))
  },
  {
    accessorKey: 'action',
    cell: ({ row }) => {
      return h('div',
        h(UDropdownMenu, {
          content: {
            align: 'end'
          },
          items: [
            {
              label: 'Edit',
              type: 'link',
              to: `/admin/edit-product?id=${row.original.id}`,
              icon: 'fa6-solid:pencil'
            },
            {
              type: 'separator'
            },
            {
              label: 'Delete',
              color: 'error',
              icon: 'fa6-solid:trash',
              onSelect() {
                alert('deleting ' + row.original.name)
              }
            }
          ]
        }, () => h(UButton, {
          icon: 'fa6-solid:ellipsis-vertical',
          color: 'default',
          variant: 'ghost'
        }))
      )
    }
  }

]



</script>

<style></style>