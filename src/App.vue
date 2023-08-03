<script setup>
import NavBar from "@/components/NavBar.vue"
import userStore from "./store/SessionStore";
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <div>Ciao Lorenzino Federico</div>
  <p>Hello {{ userStore.state.email }} </p>
  
</template>
