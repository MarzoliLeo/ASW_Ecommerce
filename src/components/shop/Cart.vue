<template>
  <div>
    <h2 class="text-center my-4">Cart</h2>
    <div class="row">
      <div class="col-md-12">
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @remove-from-cart="removeFromCart"
          class="mb-3"
        />
      </div>
    </div>
    <div class="text-end h4 mt-3">
      Total: {{ totalPrice.toFixed(2) }} €
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/shop/CartItem.vue";

export default {
  components: {
    CartItem,
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    removeFromCart(item, quantityToRemove) {
      const index = this.cart.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (this.cart[index].quantity <= quantityToRemove) {
          this.cart.splice(index, 1);
        } else {
          this.cart[index].quantity -= quantityToRemove;
        }
      }
    },
  },
};
</script>

<style scoped></style>