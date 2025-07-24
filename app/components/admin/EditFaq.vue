<template>
   <UModal :dismissible="false" :close="{icon:'fa6-solid:xmark', color:'error'}">
        <template #title><div class="font-roman">Edit Review</div></template>
        <template #body>
          <form>
            <UFormField label="Question" required class="mb-3">
              <UInput placeholder="Question" v-model="form.question" variant="ghost" class="ring w-full rounded-sm" />
            </UFormField>
             <UFormField label="Answer" required class="mb-5">
              <UTextarea placeholder="Answer" v-model="form.answer" variant="ghost" class="ring w-full rounded-sm" />
            </UFormField>
            <div class="flex flex-wrap gap-5">
               <UButton label="save" variant="outline" :loading="is_submiting" @click="submit()" />
                  </div>
          </form>
        </template>
      </UModal>
</template>

<script lang="ts">
import z from 'zod'
import type { Faq} from '~~/types/faq';

const schema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty" }),
  answer: z.string().min(1, { message: "Answer cannot be empty" }),
});
</script>


<script lang="ts" setup>

const props = defineProps<{faq: Faq}>()
const is_submiting = ref(false)
const toast = useToast()
const openModal = ref(false)

const {form, reset} = useForm({question: props.faq.question, answer: props.faq.answer})


async function submit(){
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

    const res = await $fetch<{ success: boolean }>("/api/admin/faq?id="+props.faq.id.toString(), {
      method: "POST",
      body: data,
    });

    if (res.success) {
      toast.add({
        title: 'Successful',
        description: 'FAQ updated successful',
        color: 'success',
        icon: 'fa6-solid:circle-check'
      })
      openModal.value = false
      return 
    }
  } catch (error: any) {
    toast.add({ "description": error.statusMessage, title: 'Error', icon: 'fa6-solid:circle-xmark', color: 'error' });
  } finally {
    is_submiting.value = false;
  }
}
</script>

<style>

</style>