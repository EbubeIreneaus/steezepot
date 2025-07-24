<template>
  <div>
    <div class="flex justify-end py-4 mb-3">
      <UButton icon="fa6-solid:plus" label="Add Product" color="primary" class="px-5" to="/admin/add-product" />
    </div>
    <div v-if="Array.isArray(products)">
      <UTable :sticky="true" :data="products" :columns="column" class="flex-1 max-h-[500px]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~~/types/products";
import type { TableColumn } from "@nuxt/ui";


definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const {
  data: products,
  error,
  refresh,
} = await useFetch<Product[]>("/api/admin/product", { key: "product:all" });

if (error.value) {
  throw createError(error.value.message);
}

const toast = useToast();
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");
const CLDImage = resolveComponent("CldImage");

const column: TableColumn<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const src = row.getValue("image");
      return h(CLDImage, {
        src: `${src}`,
        width: 50,
        height: 50,
        alt: row.original.alt || row.original.name,
        class: "size-12",
        removeBackground: true,
      });
    },
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return h("div", [
        h(
          "span",
          { class: "font-semibold line-clamp-1 block" },
          row.getValue("name")
        ),
        h(
          "p",
          { class: "text-xs text-secondary line-clamp-2" },
          row.original.desc
        ),
      ]);
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");
      return h(
        "span",
        { class: "font-semibold" },
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(Number(price))
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) =>
      h("p", { class: "capitalize font-semibold" }, row.getValue("category")),
  },
  {
    accessorKey: "action",
    cell: ({ row }) => {
      return h(
        "div",
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: [
              {
                label: "Edit",
                type: "link",
                to: `/admin/edit-product?id=${row.original.id}`,
                icon: "fa6-solid:pencil",
              },
              {
                label: "Recommend",
                type: 'checkbox',
                checked: row.original.recomended,
                color: 'success',
                onUpdateChecked: async (checked: boolean) => {
                  try {
                    const res = await $fetch<{ success: boolean }>('/api/admin/product/recomend?id=' + row.original.id, {
                      method: 'POST',
                      body: { recomend: checked }
                    })
                    if (res.success) {
                      refresh()
                      return toast.add({
                        title: 'successfull',
                        description: checked ? 'product added to recomended' : 'product removed recomended',
                        color: 'success',
                        icon: 'fa6-solid:circle-check'
                      })
                    }

                  } catch (error: any) {
                    return toast.add({
                      title: 'failed',
                      description: error.statusMessage || 'internal server error',
                      color: 'error',
                      icon: 'fa6-solid:circle-xmark'
                    })
                  }
                }
              },
              {
                type: "separator",
              },
              {
                label: "Delete",
                color: "error",
                icon: "fa6-solid:trash",
                async onSelect() {
                  if (
                    confirm("Are you sure  you want to delete this product?")
                  ) {
                    try {
                      const res = await $fetch<{ success: boolean }>(
                        `/api/admin/product?id=${row.original.id}`,
                        { method: "DELETE" }
                      );
                      if (res.success) {
                        toast.add({
                          title: "Deleted",
                          description: "Review Deleted successfully",
                          icon: "fa6-solid:trash-can",
                          color: "success",
                        });
                        refresh();
                      }
                    } catch (error: any) {
                      toast.add({
                        title: "Failed",
                        description: error.statusMessage,
                        icon: "fa6-solid:circle-xmark",
                        color: "error",
                      });
                    }
                  }
                },
              },
            ],
          },
          () =>
            h(UButton, {
              icon: "fa6-solid:ellipsis-vertical",
              color: "default",
              variant: "ghost",
            })
        )
      );
    },
  },
];
</script>

<style></style>
