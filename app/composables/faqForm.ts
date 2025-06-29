export const useFaqForm = (initialValues: {question: string, answer: string}) => {
  const form = ref({...initialValues})
  function reset() {
    form.value = {...initialValues}
  }

  return {form, reset}
}
