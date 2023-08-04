<template>
  <div>
    <h1 class="text-center">Shop Page</h1>
    <Shop/>
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
}
</style>