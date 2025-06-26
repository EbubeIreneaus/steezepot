<template>
  <div class="bg-secondary/30 py-10 my-10">
    <UContainer >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <h3 class="text-sm uppercase font-semibold">We Are Here To Help</h3>
        <p class="text-3xl font-bold font-display my-3">Feel Free To Reach Out For Assistance</p>
        <p>
          If you have any questions, concerns, or feedback, please don't hesitate to contact us. Our team is here to
          assist you and ensure you have the best experience possible.
        </p>

        <div class="mt-5">
          <div class="flex items-center gap-x-3 mb-7">
            <div class="ring size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              <Icon name="fa6-solid-envelope" size="lg" />
            </div>
            <div>
              <p class="font-roboto leading-tight">Email Us</p>
              <a href="mailto:cooks@steezepot.com.ng" target="_blank" rel="noopener noreferrer"
                class="text-text-secondary leading-tight block font-display">cooks@steezepot.com.ng</a>
            </div>
          </div>

          <div class="flex items-center gap-x-3 mb-5">
            <div class="ring size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              <Icon name="fa6-solid:phone" size="lg" />
            </div>
            <div>
              <p class="font-roboto leading-tight">Call Us</p>
              <a href="tel:+2348061982520" target="_blank" rel="noopener noreferrer"
                class="text-text-secondary leading-tight block font-display">+234 806 198 2520</a>
            </div>
          </div>

        </div>
      </div>
      <div> 
        <UCard  class="bg-surface ring-0 md:shadow-md md:shadow-black/30 max-w-md mx-auto rounded-2xl py-5">
          <template #default>
            <form>
              <UFormField label="Fullname" class="mb-3">
                <UInput placeholder="Fullname" variant="soft"   class="w-full ring ring-slate-200/30 rounded-lg" />
              </UFormField>
              <UFormField label="Email" class="mb-3">
                <UInput placeholder="Email" variant="soft"  class="w-full ring ring-slate-200/30 rounded-lg" />
              </UFormField>
              <UFormField label="Subject" class="mb-3">
                <UInput placeholder="Subject" variant="soft"  class="w-full ring ring-slate-200/30 rounded-lg" />
              </UFormField>

              <UFormField label="Message" class="mb-4">
                <UTextarea placeholder="Message" variant="none" style="color: black;"  size="xl" class="w-full ring ring-slate-200 rounded-lg" />
              </UFormField>

              <UButton label="Send Message" class="py-3 px-10" variant="outline" size="xl" />
            </form>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>