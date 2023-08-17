<template>
  <div class="d-flex justify-content-center">
    <div class="col-md-8">
      <h2 class="text-center my-4">Cart</h2>
      <div v-if="!isLoggedIn" class="alert alert-danger" role="alert">
        You must be logged in to view your cart.
      </div>
      <div v-else-if="cart.length === 0" class="alert alert-info" role="alert">
        Your cart is empty.
      </div>
      <div v-else class="row">
        <div class="col-md-12">
          <CartItem v-for="item in cart" :key="item.id" :item="item" @remove-from-cart="removeFromCart" class="mb-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/shop/CartItem.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters("user", ["isLoggedIn", "email"]),
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    ...mapActions("cart", ["removeFromCart"]),
    ...mapActions("cart", ["fetchCart"]),
  },
  created() {
    if (this.$store.state.email !== "") {
      this.fetchCart(this.email);
    }
  },
};
</script>

<style scoped></style>