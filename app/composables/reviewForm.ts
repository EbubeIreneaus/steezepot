export const useReviewForm = (initialValues: {name: string, review: string}) => {
  const form = ref({...initialValues})
  function reset() {
    form.value = {...initialValues}
  }

  return {form, reset}
}
