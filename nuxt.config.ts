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
        htmlAttrs: {
          lang: 'en',
        },
      meta: [
        {
          name: "description",
          content:
            "Book professional catering for your next event and delight your guests with authentic Nigerian meals. Order popular Nigerian dishes online and enjoy fast, reliable home delivery.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {rel:'icon', href: '/favicon.ico'}
      ]
    },
  },

    runtimeConfig: {
      CLOUDINARY_API_KEY: process.env.CLD_KEY,
      CLOUDINARY_API_SECRET: process.env.CLD_SECRET,
      FLW_SECRET: process.env.FLW_SECRET,
      ADMIN_USER: process.env.ADMIN_USER,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      JWT_SECRET: process.env.JWT_SECRET,
      public:{
        FLW_PUBLIC: process.env.FLW_PUBLIC
      }
    },
  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/ui", "@formkit/auto-animate/nuxt", "nuxt-og-image", '@nuxtjs/cloudinary', '@pinia/nuxt', "nuxt-aos", "nuxt-schema-org"],
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

  aos: {
    once: true,
  }
});