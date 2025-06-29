<template>
  <div class="min-h-screen">
    <UCard class="max-w-md w-full">
      <template #header>
        <h3 class="text-2xl font-semibold font-display">Product Edit Form</h3>
      </template>
      <form class="">
        <UFormField label="Name" class="mb-4">
          <UInput placeholder="product name" v-model="form.name" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>
        <UFormField label="description" class="mb-4">
          <UInput placeholder="describe this product" v-model="form.desc" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>
        <UFormField label="Price" class="mb-4">
          <UInputNumber orientation="vertical" v-model="form.price" placeholder="price" variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>
        <UFormField label="Category" class="mb-4">
          <USelect :items="['food', 'drinks']" variant="ghost" v-model="form.category" placeholder="Category"
            class="w-full ring ring-slate-200/30 rounded-lg"> </USelect>
        </UFormField>

        <UFormField label="Image" required help="Upload image with transparent background" class="mb-3">
          <UInput type="file" accept="image/*" placeholder="product image" variant="ghost" class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>

        <UFormField label="Image Alt" help="Describe Image, help google understand the image" class="mb-10">
          <UInput placeholder="A plate of coconut rice" variant="ghost" class="w-full ring ring-slate-200/30 rounded-lg" />
        </UFormField>

        <div class="flex gap-5 flex-wrap">
          <UButton label="save" variant="outline" />
          <UButton label="save & add another" variant="solid" />
          <UButton label="reset" variant="outline" color="error" @click="reset()" />
        </div>

      </form>
      <template #footer>
        <NuxtLink to="/admin/" class="text-center text-secondary block w-full">Go home</NuxtLink>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
const { form, reset } = useProductForm({
  name: 'Afang Soup', desc: 'tasty soup', category: 'food', price: 500,
  image: '',
  id: ''
})
</script>

<style></style>