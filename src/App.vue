<script setup>
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <div>Ciao Lorenzino Federico</div>
  <p>Hello {{ this.$store.state.email }} </p>
  
</template>