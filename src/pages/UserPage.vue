<script setup>
import userModule from '@/store/UserModule';
</script>

<template>
    <p>Users email is: {{ userModule.state.email }}</p>
    <br>
    <h3>Bought Courses</h3> 
    <RouterLink class="nav-link" :to="{ name: 'BoughtCourses' }">    
        <button>Go now</button>
    </RouterLink>
</template>
