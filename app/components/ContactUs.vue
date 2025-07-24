<template>
  <div class="bg-secondary/30 py-10 my-10" id="contact-me">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div class="text-sm uppercase font-semibold">We Are Here To Help</div>
          <h2 class="text-3xl font-bold font-roboto my-3">
            📞 Get in Touch with Your Private Chef in Abuja
          </h2>
          <p class="font-display">
            If you have any questions, special requests, or want to book a
            private chef in Nigeria, don’t hesitate to reach out. I’m here to
            make your food experience smooth, delicious, and unforgettable.
          </p>

          <div class="mt-5">
            <div class="flex items-center gap-x-3 mb-7">
              <div
                class="ring size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary"
              >
                <Icon name="fa6-solid-envelope" size="lg" />
              </div>
              <div>
                <p class="font-roboto leading-tight">Email Us</p>
                <a
                  href="mailto:cooks@steezepot.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-secondary leading-tight block font-display text-lg"
                  >chef@steezepot.com.ng</a
                >
              </div>
            </div>

            <div class="flex items-center gap-x-3 mb-5">
              <div
                class="ring size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary"
              >
                <Icon name="fa6-solid:phone" size="lg" />
              </div>
              <div>
                <p class="font-roboto leading-tight">Call or Whatsapp Us</p>
                <a
                  href="tel:+2348061982520"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-secondary leading-tight block font-display text-lg"
                  >+234 806 198 2520</a
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <UCard
            class="bg-surface ring-0 md:shadow-md md:shadow-black/30 max-w-md mx-auto rounded-2xl py-5"
          >
            <template #default>
              <form @submit.prevent="submit()">
                <UFormField label="Fullname" class="mb-3" required>
                  <UInput
                    placeholder="Fullname"
                    variant="soft"
                    v-model="form.name"
                    class="w-full ring ring-slate-200/30 rounded-lg"
                    required
                  />
                </UFormField>
                <UFormField label="Email" class="mb-3" required>
                  <UInput
                    placeholder="Email"
                    variant="soft"
                    v-model="form.email"
                    class="w-full ring ring-slate-200/30 rounded-lg"
                    required
                  />
                </UFormField>
                <UFormField label="Subject" class="mb-3">
                  <UInput
                    placeholder="Subject"
                    variant="soft"
                    v-model="form.subject"
                    class="w-full ring ring-slate-200/30 rounded-lg"
                  />
                </UFormField>

                <UFormField label="Message" class="mb-4" required>
                  <UTextarea
                    placeholder="Message"
                    variant="none"
                    v-model="form.content"
                    style="color: black"
                    size="xl"
                    class="w-full ring ring-slate-200 rounded-lg"
                    required
                  />
                </UFormField>

                <UButton
                  label="Send Message"
                  type="submit"
                  aria-label="send message"
                  class="py-3 px-10"
                  variant="outline"
                  color="neutral"
                  size="xl"
                  :loading="isLoading"
                />
              </form>
            </template>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(false);
const toast = useToast();
const { form, reset } = useForm({
  name: "",
  email: "",
  subject: "",
  content: "",
});

async function submit() {
  try {
    isLoading.value = true;
    const res = await $fetch<{ success: boolean }>("/api/main/message", {
      method: "PUT",
      body: form.value,
    });

    if (res.success) {
      reset();
      return toast.add({
        title: "Recieved Successfully",
        description:
          "we have recieve your message successfully,we will get back as soon as possible.",
        color: "success",
        icon: "fa6-solid:circle-check",
      });
    }
  } catch (error: any) {
    return toast.add({
      title: "message failed",
      description: error.statusMessage || "Internal server error.",
      color: "error",
      icon: "fa6-solid:circle-xmark",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style></style>
