<template>
  <div>
    <div class="flex justify-end py-4 mb-3">
      <UButton
        icon="fa6-solid:plus"
        label="Add FAQ"
        color="primary"
        class="px-5"
        @click="addNewFaq = !addNewFaq"
      />
    </div>
    <UTable :data="[]" :columns="column" />

    <UModal
      v-model:open="addNewFaq"
      :dismissible="false"
      :close="{ icon: 'fa6-solid:xmark', color: 'error' }"
    >
      <template #title>
        <div class="font-roman">Add FAQ</div>
      </template>
      <template #body>
        <form>
          <UFormField label="Question" required class="mb-3">
            <UInput
              placeholder="Do you deliver at door step?"
              variant="ghost"
              class="ring w-full rounded-sm"
            />
          </UFormField>
          <UFormField label="Answer" required class="mb-5">
            <UTextarea
              placeholder="Yes we make sure your food is delivered to you at your door step for your convinence"
              variant="ghost"
              class="ring w-full rounded-sm"
            />
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
import type { TableColumn } from "@nuxt/ui";

definePageMeta({
  layout: "admin",
});

const addNewFaq = ref(false);

const UDropdownMenun = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

const column: TableColumn<{ question: string; answer: string }>[] = [
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return h(
        UDropdownMenun,
        {
          content: {
            align: "start",
          },
          items: [
            {
              label: "Edit",
              color: "neutral",
              icon: "fa6-solid:pencil",
            },
            {
              label: "Delete",
              color: "error",
              icon: "fa6-solid:trash-can",
            },
          ],
        },
        h(UButton, {
          icon: "fa6-solid:ellipsis-vertical",
          variant: "ghost",
          color: "neutral",
        })
      );
    },
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => row.getValue("question"),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => {
      return h("p", { class: "text-xs" }, row.getValue("answer"));
    },
  },
];
</script>

<style></style>
