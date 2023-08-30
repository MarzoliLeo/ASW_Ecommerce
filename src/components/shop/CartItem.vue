<template>
  <div class="card p-3 d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column align-items-center">
      <h3>{{ item.courseName }}</h3>
      <p>Price: {{ item.price }} Token</p>
      <button @click="removeFromCart(item)" class="btn btn-danger btn-sm">
        Remove
      </button>
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
  },
};
</script>

<style scoped></style>