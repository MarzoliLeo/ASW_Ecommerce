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
          <button @click.stop.prevent="removeCategory(category.categoryName)">Remove</button>
        </div>
      </div>
    </a>
  </RouterLink>
</template>

<script>
import { ref } from "vue"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"
import axios from "axios"

const CategoryBox = ref({})
export default {
  name: CategoryBox,
  props: ["category"],
  methods: {
    submitSelectedCategory() {
      this.$store.commit("commitCategory", this.category.categoryName)
    },
    removeCategory(categoryName) {
      const categoryToDelete = {
        categoryName: categoryName
      }
      console.log(categoryToDelete)
      axios.post('http://127.0.0.1:3000/deleteCategory', categoryToDelete)
      .then((res) => {
        socket.emit("requestRefreshCategories", "")
        sweetalert({
            text: "Course deleted succesfully",
            icon: "success"
          })
      })
      .catch((err) => {
        sweetalert({
            text: "Deletion failed. Course not deleted.",
            icon: "error"
          });
        console.log("Errore di tipo: "+ err)
      });
    }
  }
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>