<template>
  <div class="min-h-screen">
    <UCard class="max-w-md w-full">
      <template #header>
        <h3 class="text-2xl font-semibold font-display">Product Edit Form</h3>
      </template>
      <form class="" v-if="form">
        <UFormField label="Name" class="mb-4">
          <UInput placeholder="product name" :model-value="form.name" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" @change="appendFormData($event, 'name')" />
        </UFormField>
        <UFormField label="description" class="mb-4">
          <UInput placeholder="describe this product" :model-value="form.desc" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>
        <UFormField label="Price" class="mb-4">
          <UInputNumber orientation="vertical" :model-value="Number(form.price)" placeholder="price" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" @change="appendFormData($event, 'price')" />
        </UFormField>
        <UFormField label="Category" class="mb-4">
          <USelect :items="productCategories" variant="ghost" :model-value="form.category" placeholder="Category"
            class="w-full ring ring-slate-200/30 rounded-lg" @change="appendFormData($event, 'category')">
          </USelect>
        </UFormField>

        <UFormField label="Image" help="don't upload image if you don't intend to change previous image" class="mb-3">
          <UInput type="file" accept="image/*" placeholder="product image" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" @change="handleImageChange" />
        </UFormField>

        <UFormField label="Image Alt" help="Describe Image, help google understand the image" class="mb-10">
          <UInput placeholder="A plate of coconut rice" variant="ghost" class="w-full ring ring-slate-200/30 rounded-lg"
            :model-value="form.alt" @change="appendFormData($event, 'alt')" />
        </UFormField>

        <div class="flex gap-5 flex-wrap">
          <UButton label="save" :loading="is_submitting" variant="outline" @click="submit()" />
        </div>
      </form>
      <template #footer>
        <NuxtLink to="/admin/" class="text-center text-secondary block w-full">Go home</NuxtLink>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~~/types/products';
import { CATEGORIES } from '~/libs/categories';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})


const { id } = useRoute().query;
const router = useRouter()
const toast = useToast()
const is_submitting = ref(false)
const productCategories = CATEGORIES.map((ct)=>ct.value)

const { data: form, error } = useFetch<Product>(
  () => `/api/admin/product/single?id=${id}`,
  { key: `product:${id}` }
);
if (error.value) {
  throw createError(error.value.message);
}
const formData = new FormData()

function appendFormData(e: Event, key: keyof Product) {
  const target = e.target as HTMLInputElement;
  const val = target.value;
  formData.append(key, val)
}

function handleImageChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && target.files && target.files[0]) {
    formData.append("image", target.files[0]);
  } else {
    formData.delete('image')
  }
}

async function submit() {
  try {
    is_submitting.value = true
    const res = await $fetch<{ success: true }>('/api/admin/product/single?id='+id, {
      method: 'POST',
      body: formData
    })

    if (res.success) {
      toast.add({
        title: 'Updated successfully',
        icon: 'fa6-solid:circle-check',
        color: 'success'
      })
      return router.back()
    }
  } catch (error: any) {
    toast.add({
      title: 'Failed',
      description: error.statusMessage,
      icon: 'fa6-solid:circle-xmark',
      color: 'error'
    })
  } finally {
    is_submitting.value = false
  }
}
</script>
