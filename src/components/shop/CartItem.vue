<template>
  <div :key="item.id" class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ item.name }}</h5>
      <p class="card-text">Quantity: {{ item.quantity }}</p>
      <div>
        <p class="card-text">
          Quantity to remove: {{ quantityToRemove }}
        </p>
      </div>
      <div class="d-flex align-items-center">
        <input type="range" min="1" :max="item.quantity" v-model="quantityToRemove" class="form-range me-3">
        <button @click="removeFromCart" class="btn btn-danger">Remove</button>
      </div>
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
  data() {
    return {
      quantityToRemove: 1,
    }
  },
  methods: {
    removeFromCart() {
      this.$emit("remove-from-cart", this.item, this.quantityToRemove);
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>
