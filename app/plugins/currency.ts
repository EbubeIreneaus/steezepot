function toNaira(value:number){
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 2,
    }).format(value)
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('naira',{
        mounted(el, binding){
            el.innerText = toNaira(binding.value);  
        },
        updated(el, binding){
            el.innerText = toNaira(binding.value);
        },
        getSSRProps(binding, vnode) {
            return{}
        },
    })
})
