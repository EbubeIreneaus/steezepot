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
    <UTable :data="FAQs" :columns="column" />

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
              v-model="form.question"
            />
          </UFormField>
          <UFormField label="Answer" required class="mb-5">
            <UTextarea
              placeholder="Yes we make sure your food is delivered to you at your door step for your convinence"
              variant="ghost"
              class="ring w-full rounded-sm"
              v-model="form.answer"
            />
          </UFormField>
          <div class="flex flex-wrap gap-5">
              <UButton label="save" variant="outline" :disabled="is_submiting" @click="submit()" />
          <UButton label="save & add another" :disabled="is_submiting" variant="solid" @click="submit(false)" />
          <UButton label="reset" variant="outline" color="error" :disabled="is_submiting" @click="reset()" />
          </div>
        </form>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts">
import z from 'zod'
import EditFaq from "~/components/admin/EditFaq.vue";
import type { Faq } from "~~/types/faq";

const schema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty" }),
  answer: z.string().min(1, { message: "Answer cannot be empty" }),
});
</script>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const{error, data: FAQs, refresh} = await useFetch<Faq[]>('/api/admin/faq')

if(error.value) throw createError(error.value.message)

const editOverlay = useOverlay().create(EditFaq)
const {form, reset} = useForm({question: '', answer: ''})
const addNewFaq = ref(false);
const UDropdownMenun = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");
const is_submiting = ref(false)
const toast = useToast()
const router = useRouter()

const column: TableColumn<Faq>[] = [
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
              onSelect(){
                editOverlay.open({
                  faq: row.original
                })
              }
            },
            {
              label: "Delete",
              color: "error",
              icon: "fa6-solid:trash-can",
              async onSelect(){
              if (confirm('Are you sure  you want to delete this FAQ?')){
                try{
                  const res = await $fetch<{success: boolean}>(`/api/admin/faq?id=${row.original.id}`, {method: 'DELETE'})
                  if(res.success){
                    toast.add({
                      title: 'Deleted',
                      description: 'Faq Deleted successfully',
                      icon: 'fa6-solid:trash-can',
                      color: 'success'
                    })
                    refresh()
                  }
                }catch (error: any){
                  toast.add({
                    title:'Failed',
                    description: error.statusMessage,
                    icon: 'fa6-solid:circle-xmark',
                    color: 'error'
                  })
                }
              }
            }
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

async function submit(redirect=true) {
  try {
    is_submiting.value = true;

    const { error, data} = await schema.safeParseAsync(form.value)
    if (error) {
      return toast.add({
        title: 'Error',
        color: 'error',
        description: error.issues[0]?.message,
        icon: 'fa6-solid:circle-xmark'
      })
    }

    const res = await $fetch<{ success: boolean }>("/api/admin/faq", {
      method: "PUT",
      body: data,
    });

    if (res.success) {
      toast.add({
        title: 'Successful',
        description: 'Product recorded successful',
        color: 'success',
        icon: 'fa6-solid:circle-check'
      })
      if (redirect) {
        addNewFaq.value = false
      }else{
        reset()
      }
      return 
    }
  } catch (error: any) {
    toast.add({ "description": error.statusMessage, title: 'Error', icon: 'fa6-solid:circle-xmark', color: 'error' });
  } finally {
    is_submiting.value = false;
  }
}
</script>

<style></style>
