import { defineStore } from 'pinia'
import type { Product } from '~~/types/products'

export const useCartStore = defineStore('cart', () =>{
  const toast = useToast()

  const Cart = ref<{product: Product, quantity: number}[]>([])

  const totalPrice = computed(() => Cart.value.reduce((x, y) => x + (y.product.price * y.quantity), 0))

  function toggleAddToCart(product: Product) {
    const index = Cart.value.findIndex((pr) => pr.product.id == product.id)
    if (index < 0) {
      Cart.value.push({product: product, quantity: 1})
      return toast.add({
        title: `${product.name} added to cart`,
        icon: 'fa6-solid:cart-plus',
        color: 'success'
      })
    }
    Cart.value.splice(index, 1)
    return toast.add({
        title: `${product.name} removed from cart`,
        icon: 'fa6-solid:cart-arrow-down',
        color: 'error'
      })
  }

  function incrementItemQuantity(productId: number){
    const item = Cart.value.find((pr)=> pr.product.id == productId)
    if(item){
      item.quantity++
    }
  }

    function decrementItemQuantity(productId: number){
    const item = Cart.value.find((pr)=> pr.product.id == productId)
    if(item && item.quantity > 1){
      item.quantity--
    }
  }

  function hasItem(productId: number){
    return Cart.value.find((pr) => pr.product.id  == productId) ? true : false
  }

  return {Cart, totalPrice, toggleAddToCart, incrementItemQuantity, decrementItemQuantity, hasItem}

})
