<script setup>
import userStore from "../store/SessionStore";
</script>

<template>
  <p>Users email is: {{ userStore.state.email }}</p>
</template>
