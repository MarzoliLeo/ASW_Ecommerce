<template>
  <RouterLink class="nav-link" :to="{name : 'Courses'}">
    <a :href="href" @click="submitSelectedCategory">
      <div class="card w-100 h-100" style="margin-top: 10px;" >
        <div class="embed-responsive embed-responsive-16by9">
        <img class="card-img-top" :src="category.imageUrl" alt="Card image here">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ category.categoryName }}</h5>
          <p class="card-text">{{ category.description }}</p>
        </div>
      </div>
    </a>
  </RouterLink>
</template>

<script>
import { ref } from "vue"

const CategoryBox = ref({})
export default {
  name: CategoryBox,
  props: ["category"],
  methods: {
    submitSelectedCategory() {
      this.$store.commit("commitCategory", this.category.categoryName)
    }
  }
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>