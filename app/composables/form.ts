import type { Product } from "~~/types/products"

export const useForm = (initialValues: any) => {
  const form = ref({...initialValues})
  function reset(){
    form.value = {...initialValues}
  }

  return {form, reset}
}
