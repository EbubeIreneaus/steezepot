<template>
  <div>
    <UTable :data="simpleOrders" :columns="column"   />
  </div>
</template>

<script setup lang="ts">
import { simpleOrders } from '~/libs/orders';
import type { TableColumn } from '@nuxt/ui';
import type { Order } from '~/libs/orders';
import {formatDistance} from 'date-fns'
import ViewOrderAddress from '~/components/admin/ViewOrderAddress.vue';

definePageMeta({
  layout: 'admin'
})
const overlay = useOverlay()
const orderModal = overlay.create(ViewOrderAddress)
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const column : TableColumn<Order>[] = [
  {
    accessorKey: 'id',
    header: 'OrderID'
  },
  {
    accessorKey: 'user',
    header: 'Buyer',
    cell: ({row})=> {
      return h('div', {class: 'flex flex-col gap-y-1'}, [
        h('span', {class: 'font-display font-semibold'}, row.original.user.name),
        h('span', {class: 'font-roboto text-sm'}, row.original.user.email)
      ])
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row})=> {
      const color = {
        pending: 'warning' as const,
        confirmed: 'primary' as const,
        shipped: 'secondary' as const,
        cancelled: 'error' as const,
        delivered: 'success' as const
      }[row.original.status]
      return h(UBadge, {color, variant: 'soft', class: 'capitalize'}, row.original.status)
    }
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({row})=> {
      const total = isNaN(Number(row.getValue('totalAmount')))? 0 : Number(row.getValue('totalAmount'))
      return new Intl.NumberFormat('en-NG', {
        style: 'currency', currency: 'NGN', maximumFractionDigits: 2
      }).format(total)
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({row}) => {
      return formatDistance(row.getValue('createdAt'), new Date(), {addSuffix: true})
    }
  },
  {
    accessorKey: 'action',
    cell: ({row}) => {
      return h(UDropdownMenu, {items: [
        {
          label: 'More Details',
          icon: 'fa6-solid:eye',
          color: 'secondary',
          children: [
            {
              label: 'Products'
            }, 
            {
              label: 'Delivery Address',
              onSelect(){
                orderModal.open({
                  address: row.original.deliveryAddress
                })
              }
            }
          ]
        }, 
        {
          label: 'Delivered',
          color: 'success',
          icon : 'fa6-solid:check'
        }, {type: 'separator'},
        {label: 'Cancel', color:'warning', icon: 'fa6-solid:circle-xmark'},
        {label: 'Delete', color:'error', icon: 'fa6-solid:trash-can'}
      ]}, h(UButton, {icon: 'fa6-solid:ellipsis-vertical', variant: 'ghost', color:'neutral'}))
    }
  }
]


</script>

<style>

</style>