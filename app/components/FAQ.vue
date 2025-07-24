<template>
  <section id="frequently-asked-question" class="py-10">
    <u-container>
      <h2 class="text-4xl font-bold font-roboto text-center mb-10">Frequently Asked Questions</h2>

      <u-accordion :items="faqs_transformed" type="multiple" trailing-icon="fa6-solid:plus" :ui="{
       label: 'text-xl font-bold font-display'
      }">
        <template #body="{item}">
          <h3 class="font-roboto font-medium text-base">{{ item.content }}</h3>
        </template>
      </u-accordion>
    </u-container>
  </section>
</template>

<script lang="ts" setup>
import type { Faq } from '~~/types/faq';
const props = defineProps<{faqs: Faq[]}>()

const faqs_transformed = props.faqs.map((f) => ({ label: f.question, content: f.answer }))
</script>

<style>

</style>