<template>
  <header ref="header" class="w-full bg-white shadow-sm">
    <UContainer
      as="div"
      class="flex justify-between items-center mx-auto py-5 font-roboto"
    >
      <div>
        <img
          src="/logo_70.webp"
          width="40"
          height="40"
          class="rounded-full w-[40px] h-[40px]"
          alt="logo"
        />
      </div>
      <nav class="hidden md:block">
        <ul class="flex items-center gap-x-7 capitalize *:font-semibold">
          <li v-for="link in NavLinks" :key="link.label">
            <NuxtLink :to="link.href" class="text-text-primary">{{
              link.label
            }}</NuxtLink>
          </li>
          <UChip as="li" v-if="Cart.length > 0">
            <UButton
              to="/cart"
              variant="outline"
              icon="fa6-solid:cart-shopping"
              class="text-text-primary rounded-full"
              aria-label="go to cart"
            />
          </UChip>
          <li v-else>
            <UButton
              to="/cart"
              variant="outline"
              icon="fa6-solid:cart-shopping"
              class="text-text-primary rounded-full"
              aria-label="go to cart"
            />
          </li>
          <!-- <li>
            <UButton label="Reserve table" color="primary" />
          </li> -->
        </ul>
      </nav>

      <div class="flex items-center gap-x-3 md:hidden">
        <UChip v-if="Cart.length > 0">
          <UButton
            to="/cart"
            variant="outline"
            icon="fa6-solid:cart-shopping"
            class="text-text-primary rounded-full"
            size="xl"
            aria-label="go to cart"
          />
        </UChip>
        <UButton
          to="/cart"
          variant="outline"
          icon="fa6-solid:cart-shopping"
          class="text-text-primary rounded-full"
          size="xl"
          v-else
          aria-label="go to cart"
        />
        <UButton
          icon="fa6-solid:bars"
          size="xl"
          variant="outline"
          class="text-text-primary"
          @click="toggleNav()"
          aria-label="open sidebar button"
        />
      </div>
    </UContainer>

    <nav
      ref="navLink"
      class="aside flex items-center justify-center overflow-hidden"
    >
      <ul>
        <li
          v-for="link in NavLinks"
          :key="link.label"
          class="text-center text-lg capitalize font-semibold font-roboto mb-2"
          @click="toggleNav"
        >
          <nuxt-link :to="link.href">{{ link.label }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

const { Cart } = storeToRefs(useCartStore());
const NavLinks = [
  { label: "home", href: "/" },
  { label: "menu", href: "/menu" },
  { label: "review", href: "/#customer-review" },
  { label: "FAQ", href: "/#frequently-asked-question" },
  { label: "contact", href: "/#contact-me" },
];
const navLink = ref<HTMLElement | null>(null);
const header = ref<HTMLElement | null>(null);

const toggleNav = () => {
  if (navLink.value) {
    navLink.value.classList.toggle("aside-open");
  }
};

const slideDown = () => {
  if (header.value && window.scrollY > 200) {
    header.value.classList.add("slide-down");
  } else {
    header.value?.classList.remove("slide-down");
  }
};

onMounted(() => {
  window.addEventListener("scroll", slideDown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", slideDown);
});
</script>

<style>
.aside {
  max-height: 0;
  height: 200px;
  opacity: 0;
  transition: all 0.3s linear;
}

.aside-open {
  max-height: 200px;
  opacity: 1;
}

header.slide-down {
  position: fixed;
  top: 0;
  z-index: 99999;
  animation: headerDown 0.3s linear forwards;
}

@keyframes headerDown {
  from {
    transform: translateY(-200px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
