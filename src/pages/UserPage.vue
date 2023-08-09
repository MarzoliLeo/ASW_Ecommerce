<script setup>
import userModule from '@/store/UserModule';
</script>

<template>
    <p>Users email is: {{ userModule.state.email }}</p>
</template>
