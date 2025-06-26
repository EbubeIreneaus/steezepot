<template>
  <div class="bg-secondary mt-10 py-3">
    <UContainer as="div" class="py-5">
      <div class="flex flex-col-reverse  md:flex-row items-center">
        <div class="max-w-xl w-full">
          <h3 class="text-4xl md:text-5xl font-bold font-display capitalize">Do you need a chef for your event? Book appointment!</h3>
          <p class="my-7 font-semibold" >Book an appointment with us for your upcoming event — let us prepare a delicious and memorable meal for your guests.</p>
          <UButton label="Schedule Appointment" size="xl" class="font-semibold" />
        </div>
        <div class="flex md:justify-center w-full">
          <div class="p-5 md:bg-primary/30  rounded-full md:ring ring-primary">
            <NuxtImg src="/images/food/juice-5.png" width="200" format="webp" densities="x1" class="object-cover w-[100px] md:w-[200px]" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { UContainer } from '#components';


</script>

<style>

</style>