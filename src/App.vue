<script setup>
import NavBar from "@/components/NavBar.vue";
import userStore from "./store/SessionStore";
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
</template>
