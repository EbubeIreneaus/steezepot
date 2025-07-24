<template>
  <div>
    <div class="mt-5 mb-8">
      <div class="flex items-center gap-5 flex-wrap">
        <UFormField label="search order ID">
          <UInput
            placeholder="#order-100"
            variant="soft"
            trailing-icon="fa6-solid:magnifying-glass"
            class="bg-slate-600 text-slate-950 rounded-lg font-semibold placeholder:!text-slate-900"
            v-model="orderId"
          />
        </UFormField>

        <UFormField label="status">
          <USelect
            placeholder="status"
            variant="none"
            class="bg-slate-600 !text-slate-950 rounded-lg font-semibold placeholder:!text-slate-900 w-[150px] capitalize"
            :items="[
              'all',
              'pending',
              'confirmed',
              'shipped',
              'delivered',
              'cancelled',
            ]"
            v-model="status"
          />
        </UFormField>

        <UFormField label="order by">
          <USelect
            placeholder="order"
            variant="none"
            class="bg-slate-600 !text-slate-950 rounded-lg font-semibold placeholder:!text-slate-900 w-[150px] capitalize"
            :items="['newer', 'older']"
            v-model="orderby"
          />
        </UFormField>
      </div>
    </div>
    <UTable :data="orders" :columns="column" />
  </div>
</template>

<script setup lang="ts">
import { simpleOrders } from "~/libs/orders";
import type { TableColumn } from "@nuxt/ui";
import type { Order, OrderStatus } from "~~/types/order";
import { formatDistance } from "date-fns";
import ViewOrderAddress from "~/components/admin/ViewOrderAddress.vue";
import ViewOrderProduct from "~/components/admin/ViewOrderProduct.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
});
const orderId = ref<null | string>(null);
const status = ref<OrderStatus | "all">("all");
const orderby = ref<"older" | "newer">("older");
const toast= useToast()

const query = computed(() => {
  let q: string = "";
  q += orderId.value && `&orderid=${orderId.value}`;
  q += status.value && `&status=${status.value}`;
  q += orderby.value && `&orderby=${orderby.value}`;
  return q;
});

const { data: orders, error, refresh } = await useFetch<Order[]>(
  () => `/api/admin/order/all?${query.value}`,
  {
    transform: (res) =>
      res.map((res) => ({
        ...res,
        user: JSON.parse(res.user as unknown as string),
        deliveryAddress: JSON.parse(res.deliveryAddress as unknown as string),
        items: JSON.parse(res.items as unknown as string),
      })),
  }
);

if (error.value) {
  throw createError({ ...error.value });
}

const overlay = useOverlay();
const orderModal = overlay.create(ViewOrderAddress);
const itemModal = overlay.create(ViewOrderProduct);
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

const column: TableColumn<Order>[] = [
  {
    accessorKey: "id",
    header: "OrderID",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "font-semibold text-base" },
        `#order-${row.getValue("id")}`
      );
    },
  },
  {
    accessorKey: "user",
    header: "Buyer",
    cell: ({ row }) => {
      return h("div", { class: "flex flex-col gap-y-1" }, [
        h(
          "span",
          { class: "font-display font-semibold" },
          row.original.user.name
        ),
        h("span", { class: "font-roboto text-sm" }, row.original.user.email),
      ]);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        pending: "warning" as const,
        confirmed: "success" as const,
        shipped: "secondary" as const,
        cancelled: "error" as const,
        delivered: "success" as const,
      }[row.original.status];
      return h(
        UBadge,
        { color, variant: "soft", class: "capitalize" },
        row.original.status
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const total = isNaN(Number(row.getValue("totalAmount")))
        ? 0
        : Number(row.getValue("totalAmount"));
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
      }).format(total);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return formatDistance(row.getValue("createdAt"), new Date(), {
        addSuffix: true,
      });
    },
  },
  {
    accessorKey: "action",
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          items: [
            {
              label: "More Details",
              color: "secondary",
              children: [
                {
                  label: "Products",
                  onSelect() {
                    itemModal.open({
                      items: row.original.items,
                    });
                  },
                },
                {
                  label: "Delivery Info",
                  onSelect() {
                    orderModal.open({
                      address: row.original.deliveryAddress,
                      user: row.original.user,
                    });
                  },
                },
              ],
            },
            {
              label: "Mark as",
              color: "success",
              children: [
                { label: "confirmed", color: 'neutral', onSelect(){return updateOrderStatus('confirmed', row.original.id)}},
                { label: "shipped",  color: 'warning', onSelect(){return updateOrderStatus('shipped', row.original.id)} },
                { label: "delivered",  color: 'success', onSelect(){return updateOrderStatus('delivered', row.original.id)} },
              ],
            },
            { type: "separator" },
            {
              label: "Cancel",
              color: "error",
              icon: "fa6-solid:circle-xmark",
              onSelect(){return updateOrderStatus('cancelled', row.original.id)}
            },
            // { label: "Delete", color: "error", icon: "fa6-solid:trash-can" },
          ],
        },
        () =>
          h(UButton, {
            icon: "fa6-solid:ellipsis-vertical",
            variant: "ghost",
            color: "neutral",
          })
      );
    },
  },
];

async function updateOrderStatus(status: OrderStatus, id: string){
  try {
    const res = await $fetch<{success: true}>(`/api/admin/order/update?id=${id}`, {
      method: 'POST',
      body: {status}
    })

    if(res.success){
      toast.add({
        title: 'successfull',
        description: `#order-${id} status has been updated successfully`,
        color:"success",
        icon: 'fa6-solid:circle-check'
      })
      return refresh()
    }
  } catch (error: any) {
    toast.add({
        title: 'failed',
        description: error.statusMessage || 'internal server error',
        color:"error",
        icon: 'fa6-solid:circle-xmark'
      })
  }
}
</script>

<style></style>
