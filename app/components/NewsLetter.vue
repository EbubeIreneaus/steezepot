<template>
  <div class="py-14 bg-slate-200">
    <div
      class="flex flex-col md:flex-row md:justify-evenly items-center gap-y-5"
    >
      <div class="text-center md:text-left">
        <h3 class="text-3xl font-bold">Keep In Touch</h3>
        <p class="font-display">
          Subscribe to our newsletter for the latest updates and offers!
        </p>
      </div>
      <div>
        <div class="flex w-fit ring ring-text-body/50">
          <UInput
            type="email"
            v-model="form.email"
            inputmode="email"
            placeholder="email address"
            variant="none"
            size="xl"
            style="color: black"
            color="primary"
            :loading="isLoading"
          />
          <UButton
            label="Subscribe"
            @click="submit()"
            square
            size="xl"
            class="rounded-none"
            aria-label="subscribe"
            :ui="{
              base: 'bg-slate-900 hover:bg-slate-700',
              label: 'text-slate-50',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(false);
const toast = useToast();
const { form, reset } = useForm({
  email: "",
});

async function submit() {
  // try {
  //   isLoading.value = true;
  //   const res = await $fetch<{ success: boolean }>("/api/main/newLetter", {
  //     method: "PUT",
  //     body: form.value,
  //   });

  //   if (res.success) {
  //     reset();
  //     return toast.add({
  //       title: "Thank You",
  //       description: "Thank you for subscribing.",
  //       color: "success",
  //       icon: "fa6-solid:circle-check",
  //     });
  //   }
  // } catch (error: any) {
  //   return toast.add({
  //     title: "Failed",
  //     description: error.statusMessage || "Internal server error.",
  //     color: "error",
  //     icon: "fa6-solid:circle-xmark",
  //   });
  // } finally {
  //   isLoading.value = false;
  // }
  isLoading.value = true;
  const timeout = setTimeout(() => {
    toast.add({
      title: "Thank You",
      description: "Thank you for subscribing.",
      color: "success",
      icon: "fa6-solid:circle-check",
    });
    reset()
      isLoading.value = false;
    clearTimeout(timeout);
  }, 3000);
}
</script>

<style></style>
