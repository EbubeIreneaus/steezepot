export default defineAppConfig({
  title: "Nigerian Food Delivery",
  description:
    "Order your favorite Nigerian dishes online and have them delivered to your doorstep.",
  ui: {
    formField:{
      slots: {
        label: "text-text-secondary font-display ps-1",
      }
    },
    input: {
      variants: {
        variant: {
          outline: "bg-transparent ring ring-primary/50 text-text-primary",
          soft: "bg-transparent  text-text-primary hover:bg-transparent focus:bg-transparent",
        },
      },
    },

    textarea: {
      variants: {
        variant: {
          outline: "bg-transparent ring ring-primary/50 text-text-primary",
          soft: "bg-transparent  text-text-primary hover:bg-transparent focus:bg-transparent",
        },
      },
    },

     select: {
      variants: {
        variant: {
          outline: "bg-transparent ring ring-primary/50 text-text-primary",
          soft: "bg-transparent  text-text-primary hover:bg-transparent focus:bg-transparent",
        },
      },
    },
  },
});
