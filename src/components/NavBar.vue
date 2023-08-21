<script setup>
import { mapGetters } from 'vuex';
import NavButton from "@/components/NavButton.vue"
</script>

<template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg">
    <div class="container container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"
        aria-controls="navbarSupportsedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="isLoggedIn" class="collapse navbar-collapse" id="navContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavButton route-name="Home" @counter-clicked="onChildClicked" />
          <NavButton route-name="About" @counter-clicked="onChildClicked" />
          <NavButton route-name="Category" @counter-clicked="onChildClicked" />
          <NavButton route-name="Account" @counter-clicked="onChildClicked" />
          <NavButton route-name="Cart" @counter-clicked="onChildClicked" />
          <NavButton route-name="BuyTokens" @counter-clicked="onChildClicked" />
          <NavButton route-name="Logout" @click="this.$store.commit('user/logout')" @counter-clicked="onChildClicked" />
        </ul>
      </div>
      <div v-else class="collapse navbar-collapse" id="navContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavButton route-name="Home" @counter-clicked="onChildClicked" />
          <NavButton route-name="About" @counter-clicked="onChildClicked" />
          <NavButton route-name="Category" @counter-clicked="onChildClicked" />
          <NavButton route-name="Login" @counter-clicked="onChildClicked" />
          <NavButton route-name="Register" @counter-clicked="onChildClicked" />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {
    NavButton,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    onChildClicked() {
      this.$emit('counter-clicked');
    },
  },
};
</script>

<style scoped></style>