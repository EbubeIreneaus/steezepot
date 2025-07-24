export default defineNuxtRouteMiddleware((to, from) => {
   const cookie = useCookie('authToken')
   if (!cookie.value) {
    return navigateTo('/admin/auth')
   }
   return 
})
