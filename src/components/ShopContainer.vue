<template>
  <div>
    <h1>Shop</h1>
    <div v-for="product in products" :key="product.id">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
    <h2>Cart</h2>
    <div v-for="item in cart" :key="item.id">
      <p>{{ item.name }} - {{ item.quantity }}</p>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    addToCart(product) {
      const item = this.cart.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          quantity: 1,
        });
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
