<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6" align="center">
        <h2 class="text-center my-4">Products</h2>
        <div class="row">
          <div class="col-md-12">
            <Product
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
              class="mb-4"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
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
    </div>
  </div>
</template>

<script>
import Product from "@/components/shop/Product.vue";
import CartItem from "@/components/shop/CartItem.vue";

export default {
  components: {
    Product,
    CartItem,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "This is product 1",
          price: 10.99,
        },
        {
          id: 2,
          name: "Product 2",
          description: "This is product 2",
          price: 19.99,
        },
        {
          id: 3,
          name: "Product 3",
          description: "This is product 3",
          price: 5.99,
        },
      ],
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    addToCart({ id, name, price }) {
      const item = this.cart.find((item) => item.id === id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({
          id,
          name,
          price,
          quantity: 1,
        });
      }
    },
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