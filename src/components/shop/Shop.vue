<template>
  <div class="row">
    <div class="col-md-12 justify-content-center align-items-center">
      <div class="row">
        <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
          <Product :product="product" @add-to-cart="addToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/shop/Product.vue";

export default {
  components: {
    Product,
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
        {
          id: 4,
          name: "Product 4",
          description: "This is product 4",
          price: 15.99,
        },
        {
          id: 5,
          name: "Product 5",
          description: "This is product 5",
          price: 8.99,
        },
        {
          id: 6,
          name: "Product 6",
          description: "This is product 6",
          price: 12.99,
        }
      ],
      cart: [],
    };
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

<style scoped>
.col-md-4 {
  margin-bottom: 2rem;
}
</style>