<template>
  <div class="min-h-screen bg-slate-950  flex items-center justify-center px-5">
    <UCard class="max-w-md w-full">
      <template #header>
        <h2 class="text-lg font-bold text-primary">Welcome, Mildred</h2>
      </template>
      <UFormField label="Email" class="mb-3">
        <UInput placeholder="Email" variant="ghost" class="w-full ring ring-slate-200/30 rounded-lg" />
      </UFormField>

      <UFormField label="Password" class="mb-10">
        <UInput placeholder="Password" type="password" variant="ghost" class="w-full ring ring-slate-200/30 rounded-lg" />
      </UFormField>

      <UButton  label="Login" icon="fa6-solid:arrow-right-to-bracket" />

      <template #footer>
        <nuxt-link to="/" class="text-sm text-center text-secondary block">
          Visit Website
        </nuxt-link>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})
</script>

<style>

</style>