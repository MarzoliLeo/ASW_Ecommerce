<template>
  <div :key="item.id" class="card">
    <div class="card-body">
      <h5 class="card-title">{{ item.name }}</h5>
      <p class="card-text">Quantity: {{ item.quantity }}</p>
      <button @click="removeFromCart" class="btn btn-danger">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeFromCart() {
      this.$emit("remove-from-cart", this.item);
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>