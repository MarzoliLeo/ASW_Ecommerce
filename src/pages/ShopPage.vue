<template>
  <div>
    <h1 class="text-center mb-4">Shop Page</h1>
    <Shop />
  </div>
</template>

<script>
import Shop from "@/components/shop/Shop.vue";

export default {
  components: {
    Shop,
  },
};
</script>

<style>
.text-center {
  text-align: center;
  margin-bottom: 1rem;
}
</style>