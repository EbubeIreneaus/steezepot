<template>
    <div v-if="loading">
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-background">
  <!-- App Logo -->
  <img src="/logo.png" alt="App Logo" class="w-12 h-12 animate-bounce" />

  <!-- Loading Text -->
  <p class="text-gray-700 text-lg font-semibold animate-pulse">Loading, please wait...</p>

  <!-- Spinner -->
  <div class="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
</div>
    </div>
</template>

<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
    loading.value = false
})
</script>