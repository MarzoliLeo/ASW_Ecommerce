<template>
  <div class="card p-3">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column">
        <h3>{{ item.courseName }}</h3>
        <p>Price: {{ item.price }} Token</p>
        <button @click="removeFromCart(item)" class="btn btn-danger btn-sm">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["removeFromCart"]),
    removeFromCart(item) {
      this.removeFromCart(item, 1);
    },
  },
};
</script>

<style scoped></style>