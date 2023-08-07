<template>
  <div class="card p-3">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column">
        <h3>{{ item.name }}</h3>
        <p>Price: {{ item.price }} €</p>
        <p>Quantity: {{ item.quantity }}</p>
        <template v-if="item.quantity > 1">
          <input type="range" :min="1" :max="item.quantity" v-model="quantityToRemove" class="form-range me-3" />
          <p>{{ quantityToRemove }}</p>
        </template>
        <button @click="removeFromCart(item, quantityToRemove)" class="btn btn-danger btn-sm">
          Remove
        </button>
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
    };
  },
  methods: {
    removeFromCart(item, quantityToRemove) {
      this.$emit("remove-from-cart", item, quantityToRemove);
    },
  },
};
</script>

<style scoped></style>