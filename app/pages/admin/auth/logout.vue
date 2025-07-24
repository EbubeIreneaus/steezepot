<template>
  <div class="min-h-screen bg-slate-950">
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})
const router = useRouter()
const cookie = useCookie('authToken')
cookie.value = null

router.push('/admin/auth')
</script>

<style>

</style>