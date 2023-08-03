<script setup>
import NavBar from "@/components/NavBar.vue"
import userStore from "./store/SessionStore";

/*Creazione di una sessione persistente per ogni client*/

console.log(userStore.state.email)

</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <div>Ciao Lorenzino Federico</div>
  
</template>
