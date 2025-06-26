<template>
  <UContainer class="py-10 bg-secondary">
    <div class="flex flex-col md:flex-row md:justify-evenly items-center gap-y-5">
      <div class="text-center md:text-left">
        <h3 class="text-3xl font-bold">Keep In Touch</h3>
        <p class="font-display">Subscribe to our newsletter for the latest updates and offers!</p>
      </div>
      <div>
        <div class="flex w-fit ring ring-text-body/50">
          <UInput type="email" v-model="email" inputmode="email" placeholder="email address" variant="none" size="xl" style="color: black"
            color="primary" />
          <UButton label="Subscribe" square size="xl" class="rounded-none" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const email = ref('')

</script>

<style></style>