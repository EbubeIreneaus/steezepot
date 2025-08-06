<template>
  <UContainer class="">
    <div class="flex justify-between items-center py-5 my-5">
      <h1 class="text-3xl md:text-4xl font-bold font-display">Cart</h1>
      <UButton
        icon="fa6-solid:arrow-left"
        label="continue shopping"
        variant="outline"
        class="text-text-primary"
        to="/"
      />
    </div>

    <div>
      <u-table
        :data="Cart"
        :ui="{
          th: 'text-text-primary font-bold font-display capitalize text-lg',
          td: 'text-text-primary',
        }"
        :columns="column"
      />
    </div>

    <div class="flex flex-col lg:flex-row gap-10 justify-between my-15">
      <!-- delivery form -->
      <div class="w-full">
        <form>
          <div class="mb-7">
            <h3 class="text-lg mb-3 font-display font-semibold">
              Personal Information
            </h3>
            <div
              class="flex flex-col md:flex-row md:flex-wrap justify-between gap-5"
            >
              <UFormField label="name" required>
                <UInput
                  placeholder="name"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="userForm.name"
                />
              </UFormField>
              <UFormField label="email" required>
                <UInput
                  placeholder="email"
                  type="email"
                  inputmode="email"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="userForm.email"
                />
              </UFormField>
              <UFormField label="phone" required>
                <UInput
                  placeholder="080 123 456 7890"
                  type="tel"
                  inputmode="tel"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="userForm.phone"
                />
              </UFormField>
            </div>
          </div>

          <div>
            <h3 class="text-lg mb-3 font-display font-semibold">
              Delivery Address
            </h3>
            <div
              class="flex flex-col md:flex-row md:flex-wrap justify-between gap-5"
            >
              <UFormField label="state" required>
                <UInput
                  placeholder="Abuja"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="addressForm.state"
                  readonly
                />
              </UFormField>
              <UFormField label="city" required>
                <UInput
                  placeholder="Kubwa"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="addressForm.city"
                />
              </UFormField>
              <UFormField label="bustop/landmark" required>
                <UInput
                  placeholder="FHA Brige"
                  variant="soft"
                  class="bg-slate-200 rounded-md w-full"
                  v-model="addressForm.bustop"
                />
              </UFormField>
              <UFormField label="Street Address" required>
                <UTextarea
                  placeholder="no.2 olumolu estate"
                  :rows="2"
                  variant="soft"
                  class="bg-slate-200 rounded-md !w-full"
                  v-model="addressForm.street_address"
                />
              </UFormField>
            </div>
          </div>
        </form>
      </div>

      <!-- delivery form -->

      <div class="w-full lg:max-w-md flex items-end justify-end">
        <UCard class="max-w-md w-full shadow bg-slate-300" variant="soft">
          <template #header>
            <h4>Summary</h4>
          </template>
          <div>
            <div class="flex justify-between font-semibold">
              <p class="font-display">Total price</p>
              <p v-naira="totalPrice"></p>
            </div>
          </div>

          <template #footer>
            <UButton
              label="checkout"
              trailingIcon="fa6-solid:arrow-right"
              size="xl"
              @click="CHECKOUT()"
              :loading="isLoading"
            ></UButton>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
useHead({
  script: [{ src: "https://checkout.flutterwave.com/v3.js" }],
});
import type { TableColumn } from "@nuxt/ui";
import type { Order } from "~~/types/order";
import type { Product } from "~~/types/products";
declare function FlutterwaveCheckout(options: any): any;

const isLoading = ref(false);
const CartStore = useCartStore();
const { Cart, totalPrice } = storeToRefs(CartStore);
const { toggleAddToCart, incrementItemQuantity, decrementItemQuantity } =
  CartStore;
const config = useRuntimeConfig();
const toast = useToast();
const CLDImage = resolveComponent("CldImage");
const UBtn = resolveComponent("UButton");

const column: TableColumn<{ product: Product; quantity: number }>[] = [
  {
    accessorKey: "id",
    header: "Product",
    cell: ({ row }) => {
      return h("div", { class: "flex items-center gap-x-4" }, [
        h(UBtn, {
          icon: "fa6-solid:xmark",
          variant: "ghost",
          class: "text-red-500",
          onClick: () => toggleAddToCart(row.original.product),
        }),
        h("div", { class: "flex gap-x-5 items-center" }, [
          h(CLDImage, {
            src: row.original.product.image,
            width: 60,
            height: 60,
            "remove-bakground": true,
          }),
          h("div", { class: "flex flex-col" }, [
            h(
              "p",
              { class: "font-display font-semibold" },
              row.original.product.name
            ),
            h("p", { class: "text-xs" }, row.original.product.desc || ""),
          ]),
        ]),
      ]);
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "font-semibold" },
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 2,
        }).format(Number(row.original.product.price))
      );
    },
  },
  {
    header: "quantity",
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h(UBtn, {
          icon: "fa6-solid:minus",
          color: "error",
          disabled: row.original.quantity <= 1,
          onClick: () => decrementItemQuantity(row.original.product.id),
        }),
        h(UBtn, { variant: "none", label: row.original.quantity }),
        h(UBtn, {
          icon: "fa6-solid:plus",
          color: "success",
          onClick: () => incrementItemQuantity(row.original.product.id),
        }),
      ]);
    },
  },
  {
    header: "Total",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "font-semibold" },
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 2,
        }).format(Number(row.original.product.price) * row.original.quantity)
      );
    },
  },
];

const { form: addressForm, reset: resetAddressForm } = useForm({
  state: "Abuja",
  city: "",
  bustop: "",
  street_address: "",
});
const { form: userForm, reset: resetUserForm } = useForm({
  name: "",
  email: "",
  phone: "",
});

async function CHECKOUT() {
  try {
    isLoading.value = true;
    // const res = await $fetch<{ success: boolean; data: Order }>(
    //   "/api/main/create_order",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       items: Cart.value,
    //       totalAmount: totalPrice.value.toString(),
    //       deliveryAddress: addressForm.value,
    //       user: userForm.value,
    //     }),
    //   }
    // );
    
    const res = await new Promise<{ success: boolean }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 3000);
    });
    if (res.success) {
      const user = "Guest User";
      const modal = FlutterwaveCheckout({
        public_key: config.public.FLW_PUBLIC,
        tx_ref: "#order-" + "283747478",
        amount: Number(totalPrice.value),
        currency: "NGN",
        payment_options: "card, opay, banktransfer, account, credit, ussd",
        callback: async (response: any) => {
          if (response.status == "completed") {
            try {
              // const res = await $fetch<{ success: boolean }>("/api/main/flw-checkout", {
              //   method: "POST",
              //   body: response,
              // });
              const res = await new Promise<{ success: boolean }>(
                (resolve, reject) => {
                  setTimeout(() => {
                    resolve({ success: true });
                  }, 3000);
                }
              );
              if (res.success) {
                toast.add({
                  title: "Payment Confirmed",
                  description:
                    "We have confirm your payment and we are processing your order",
                  icon: "fa6-solid:circle-check",
                  color: "success",
                });
                modal.close();
              }
            } catch (error: any) {
              toast.add({
                title: "Payment Unsuccessful",
                description: error.statusMessage,
                icon: "fa6-solid:circle-xmark",
                color: "error",
              });
              modal.close();
            }
          }
        },
        customer: {
          email: 'guest@gmail.com',
          phone_number: '+1234567890',
          name: 'Unknown Guest',
        },
        customizations: {
          title: "Steezepot",
          description: "Payment for your order",
          logo: "https://steezepot.com.ng/logo.png",
        },
      });
    }
    resetAddressForm();
    resetUserForm();
    Cart.value = [];
  } catch (error: any) {
    console.log(error.statusMessage);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
