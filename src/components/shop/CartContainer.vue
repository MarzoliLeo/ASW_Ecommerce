<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <Cart :cart="cart" @remove-from-cart="removeFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/shop/Cart.vue";

export default {
  components: {
    Cart,
  },
  data() {
    return {
      cart: [],
    };
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