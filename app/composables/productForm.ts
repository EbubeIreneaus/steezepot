import type { Product } from "~~/types/products"

export const useProductForm = (initialValues: Product) => {
  const form = ref({...initialValues})
  function reset(){
    form.value = {...initialValues}
  }

  return {form, reset}
}
