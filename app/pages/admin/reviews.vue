<template>
  <div>
    <div class="flex justify-end py-4 mb-3">
      <UButton
        icon="fa6-solid:plus"
        label="Add Review"
        color="primary"
        class="px-5"
        @click="addNewReview = !addNewReview"
      />
    </div>
    <UTable :data="reviews" :columns="column" v-if="Array.isArray(reviews)" />

    <UModal
      v-model:open="addNewReview"
      :dismissible="false"
      :close="{ icon: 'fa6-solid:xmark', color: 'error' }"
    >
      <template #title><div class="font-roman">Add Review</div></template>
      <template #body>
        <form>
          <UFormField label="Fullname" required class="mb-3">
            <UInput
              placeholder="name"
              v-model="form.name"
              variant="ghost"
              class="ring w-full rounded-sm"
            />
          </UFormField>
          <UFormField label="Review" required class="mb-5">
            <UTextarea
              placeholder="what did he say?"
              v-model="form.content"
              variant="ghost"
              class="ring w-full rounded-sm"
            />
          </UFormField>
          <div class="flex flex-wrap gap-5">
            <UButton
              label="save"
              variant="outline"
              :disabled="is_submiting"
              @click="submit()"
            />
            <UButton
              label="save & add another"
              :disabled="is_submiting"
              variant="solid"
              @click="submit(false)"
            />
            <UButton
              label="reset"
              variant="outline"
              color="error"
              :disabled="is_submiting"
              @click="reset()"
            />
          </div>
        </form>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts">
import z from "zod";
import EditReview from "~/components/admin/EditReview.vue";
import type { Review } from "~~/types/review";

const schema = z.object({
  name: z.string().min(1, { message: "name cannot be empty" }),
  content: z.string().min(1, { message: "content cannot be empty" }),
});
</script>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const {
  data: reviews,
  error,
  refresh,
} = await useFetch<Review[]>("/api/admin/review");

if (error.value) {
  throw createError(error.value.message);
}

const { form, reset } = useForm({ name: "", content: "" });
const overlay = useOverlay();
const editModal = overlay.create(EditReview);
const addNewReview = ref(false);
const UDropdownMenun = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");
const is_submiting = ref(false);
const toast = useToast();
const router = useRouter();

const column: TableColumn<Review>[] = [
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
              onSelect() {
                editModal.open({ review: row.original });
              },
            },
            {
              label: "Delete",
              color: "error",
              icon: "fa6-solid:trash-can",
              async onSelect() {
                if (confirm("Are you sure  you want to delete this review?")) {
                  try {
                    const res = await $fetch<{ success: boolean }>(
                      `/api/admin/review?id=${row.original.id}`,
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
        h(UButton, {
          icon: "fa6-solid:ellipsis-vertical",
          variant: "ghost",
          color: "neutral",
        })
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "content",
    header: "Review",
    cell: ({ row }) => {
      return h("p", { class: "text-xs" }, row.getValue("content"));
    },
  },
];

async function submit(redirect = true) {
  try {
    is_submiting.value = true;

    const { error, data } = await schema.safeParseAsync(form.value);
    if (error) {
      return toast.add({
        title: "Error",
        color: "error",
        description: error.issues[0]?.message,
        icon: "fa6-solid:circle-xmark",
      });
    }

    const res = await $fetch<{ success: boolean }>("/api/admin/review", {
      method: "PUT",
      body: data,
    });

    if (res.success) {
      toast.add({
        title: "Successful",
        description: "Product recorded successful",
        color: "success",
        icon: "fa6-solid:circle-check",
      });
      if (redirect) {
        addNewReview.value = false;
      } else {
        reset();
      }
      return;
    }
  } catch (error: any) {
    toast.add({
      description: error.statusMessage,
      title: "Error",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    is_submiting.value = false;
  }
}
</script>

<style></style>
