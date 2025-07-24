<template>
  <section class="bg-secondary mt-10 py-3">
    <UContainer as="div" class="py-5">
      <div class="flex flex-col-reverse md:flex-row items-center">
        <div class="max-w-xl w-full">
          <h2 class="text-4xl md:text-5xl font-bold font-display capitalize">
            👨‍🍳 Need a Private Chef for Your Event in Abuja? Book an Appointment
            Today
          </h2>
          <p class="my-7 font-semibold">
            Let me be your private chef for birthdays, house parties, and mini
            events in Abuja — I’ll handle the cooking while you enjoy every
            moment with your guests.
          </p>
          <UButton
            label="Hire Me for Your Event"
            size="xl"
            color="neutral"
            variant="outline"
            class="font-semibold px-5 py-3"
            aria-label="Hire Me for Your Event"
            to="#contact-me"
          />
        </div>
        <div class="flex md:justify-center w-full">
          <div class="p-5 md:bg-primary/30 rounded-full md:ring ring-primary">
            <img
              src="/images/juice-5.webp"
              width="200"
              class="object-cover w-[100px] md:w-[200px]"
              alt="Refreshing blue cocktail with lemon slices, mint leaves, and ice in a tall glass"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script lang="ts" setup>

</script>

<style></style>
