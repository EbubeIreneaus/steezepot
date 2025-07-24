<template>
  <div class="min-h-screen">
    <UCard class="max-w-md w-full">
      <template #header>
        <h3 class="text-2xl font-semibold font-display">Product Form</h3>
      </template>
      <form class="">
        <UFormField label="Name" class="mb-4">
          <UInput
            placeholder="product name"
            v-model="form.name"
            variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg"
          />
        </UFormField>
        <UFormField label="description" class="mb-4">
          <UInput
            placeholder="describe this product"
            v-model="form.desc"
            variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg"
          />
        </UFormField>
        <UFormField label="Price" class="mb-4">
          <UInputNumber
            orientation="vertical"
            v-model="form.price"
            placeholder="price"
            variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg"
          />
        </UFormField>
        <UFormField label="Category" class="mb-4">
          <USelect
            :items="productCategories"
            variant="ghost"
            v-model="form.category"
            placeholder="Category"
            class="w-full ring ring-slate-200/30 rounded-lg"
          >
          </USelect>
        </UFormField>

        <UFormField
          label="Image"
          required
          help="Upload image with transparent background"
          class="mb-3"
        >
          <UInput
            type="file"
            accept="image/*"
            placeholder="product image"
            variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg"
            @change="($event) => {
              const target = $event.target as HTMLInputElement;
              if (target && target.files) {
                image = target.files[0]
              }
            }"
          />
        </UFormField>

        <UFormField
          label="Image Alt"
          help="Describe Image, help google understand the image"
          class="mb-10"
        >
          <UInput
            v-model="form.alt"
            placeholder="A plate of coconut rice"
            variant="ghost"
            class="w-full ring ring-slate-200/30 rounded-lg"
          />
        </UFormField>

        <div class="flex gap-5 flex-wrap">
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
      <template #footer>
        <NuxtLink to="/admin/" class="text-center text-secondary block w-full"
          >Go home</NuxtLink
        >
      </template>
    </UCard>
  </div>
</template>

<script lang="ts">
import { Icon } from "#components";
import z from "zod";

const pdCategories = CATEGORIES.map((ct) => ct.value)
const schema = z.object({
  name: z.string().min(1, { message: "product must contain a name" }),
  price: z.number().min(0, { message: "product must have a price" }),
  desc: z.string().min(1, { message: "description cannot be empty" }),
  category: z.enum(pdCategories as [string, ...string[]]),
  alt: z.string().nullable(),
});
</script>

<script lang="ts" setup>
import { CATEGORIES } from '~/libs/categories';
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const productCategories = CATEGORIES.map((ct)=>ct.value)
const toast = useToast();
const is_submiting = ref(false);
const router = useRouter();
const { form, reset } = useForm({
  name: "",
  desc: "",
  category: "food",
  price: null,
  alt: null,
});
const image = ref<any>(null);

async function submit(redirect = true) {
  try {
    is_submiting.value = true;

    const { error, data: productForm } = await schema.safeParseAsync(
      form.value
    );
    if (error) {
      return toast.add({
        title: "Error",
        color: "error",
        description: error.issues[0]?.message,
        icon: "fa6-solid:circle-xmark",
      });
    }

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("desc", productForm.desc);
    formData.append("category", productForm.category);
    formData.append("price", productForm.price.toString());
    formData.append("alt", productForm.alt as string);
    formData.append("image", image.value);

    const res = await $fetch<{ success: boolean }>("/api/admin/product", {
      method: "PUT",
      body: formData,
    });

    if (res.success) {
      toast.add({
        title: "Successful",
        description: "Product recorded successful",
        color: "success",
        icon: "fa6-solid:circle-check",
      });
      if (redirect) {
        router.back();
      } else {
        reset();
        image.value = null;
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
