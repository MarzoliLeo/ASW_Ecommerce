<script setup>
import { ref } from "vue"

const props = defineProps(["routeName"])
</script>

<template>
  <li class="nav-item" @click="onClicked">
    <RouterLink class="nav-link" :to="{ name: props.routeName }">
      {{ props.routeName }}
    </RouterLink>
  </li>
</template>
