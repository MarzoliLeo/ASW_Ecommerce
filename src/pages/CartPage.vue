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
import { mapState } from "vuex";

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapState("cart", ["cart"]),
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    removeFromCart(item, quantityToRemove) {
      this.$store.commit("cart/removeFromCart", { item, quantityToRemove });
    },
  },
};
</script>

<style scoped></style>