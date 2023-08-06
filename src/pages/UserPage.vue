<script setup>
import userStore from '@/store/UserStore';
</script>

<template>
    <p>Users email is: {{ userStore.state.email }}</p>
</template>
