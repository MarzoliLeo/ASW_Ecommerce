<template>
  <div :key="product.id" class="card text-center shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p class="card-text">{{ product.description }}</p>
      <p class="card-text">Price: {{ product.price }}</p>
      <button @click="addToCart" class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>