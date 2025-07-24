<template>
   <UModal :dismissible="false" :close="{icon:'fa6-solid:xmark', color:'error'}">
        <template #title><div class="font-roman">Edit Review</div></template>
        <template #body>
          <form>
            <UFormField label="Fullname" required class="mb-3">
              <UInput placeholder="name" v-model="form.name" variant="ghost" class="ring w-full rounded-sm" />
            </UFormField>
             <UFormField label="Review" required class="mb-5">
              <UTextarea placeholder="what did he say?" v-model="form.content" variant="ghost" class="ring w-full rounded-sm" />
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
import EditReview from '~/components/admin/EditReview.vue';
import type { Review } from '~~/types/review';

const schema = z.object({
  name: z.string().min(1, { message: "name cannot be empty" }),
  content: z.string().min(1, { message: "content cannot be empty" }),
});
</script>


<script lang="ts" setup>

const props = defineProps<{review: Review}>()
const is_submiting = ref(false)
const toast = useToast()
const openModal = ref(false)

const {form, reset} = useForm({name: props.review.name, content: props.review.content})


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

    const res = await $fetch<{ success: boolean }>("/api/admin/review?id="+props.review.id.toString(), {
      method: "POST",
      body: data,
    });

    if (res.success) {
      toast.add({
        title: 'Successful',
        description: 'Product recorded successful',
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