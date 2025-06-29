// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: "SteezePot - Food Delivery & Catering Services",
      meta: [
        {
          name: "description",
          content:
            "Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@formkit/auto-animate/nuxt",
    "nuxt-og-image",
    "@prisma/nuxt"
  ],
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "default",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },

  prisma: {
    generateClient: process.env.NODE_ENV !== 'development'
  }
});
