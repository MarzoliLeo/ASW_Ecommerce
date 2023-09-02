<template>
  <RouterLink class="nav-link" :to="{ name: 'Courses' }">
    <a :href="href" @click="submitSelectedCategory">
      <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
          <img class="card-img-top" :src="category.imageUrl" alt="Card image here">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ category.categoryName }}</h5>
          <p class="card-text">{{ category.description }}</p>
          <button v-if="adminLogged" @click.stop.prevent="removeCategory(category.categoryName)">Remove</button>
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
import { mapGetters } from "vuex";

const CategoryBox = ref({})
export default {
  name: CategoryBox,
  props: ["category"],
  data() {
    return {
      adminLogged: false,
    }
  },
  computed: {
    ...mapGetters("user", ["email"]),
  },
  methods: {
    submitSelectedCategory() {
      this.$store.commit("user/commitCategory", this.category.categoryName)
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
          console.log("Errore di tipo: " + err)
        });
    },
    isAdminLogged(email) {
      if (this.email != '') {
        axios.get("http://localhost:3000/usersPermission", {
          params: {
            email: email,
          }
        })
          .then(res => {
            this.adminLogged = res.data[0].permission == "Admin" ? true : false
          })
          .catch(err =>
            console.log(err)
          )
      }
    }
  },
  mounted() {
    this.isAdminLogged(this.email);
  }
};

</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>