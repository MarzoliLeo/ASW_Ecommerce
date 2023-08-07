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
import axios from "axios"
import { onMounted, ref } from "vue"
import userStore from "@/store/UserStore";

const CategoryBox = ref({})
export default {
  name: CategoryBox,
  props: ["category"],
  methods: {
    submitSelectedCategory() {
      userStore.commit("commitCategory", this.category.categoryName)
      console.log(userStore.state.lastVisitedCategory)
    }
  }
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>