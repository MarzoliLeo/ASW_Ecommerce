<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body text-center">
      <h5 class="card-title">{{ course.coursesName }}</h5>
      <p class="card-text">{{ course.description }}</p>
      <p class="card-text">{{ course.price }} Tokens</p>
      <p class="card-text">Creator is: {{ course.courseCreator }}</p>
      <button v-if="ownerLogged" @click="removeCourse(course.coursesName)">Remove</button>
      <button @click="addToCart(course)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import sweetalert from "sweetalert";
import { socket } from "@/socket/socket";
import { mapActions } from "vuex";

const CourseBox = ref({});
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  name: CourseBox,
  props: ["course"],
  computed: {
    ownerLogged() {
      return (
        (this.$store.state.email &&
          this.course.courseCreator === this.$store.state.email &&
          this.$store.state.permission === "Staff") ||
        this.$store.state.permission === "Admin"
      );
    }
  },
  methods: {
    ...mapActions('cart', ["addToCart"]),
    async removeCourse(courseName) {
      const courseToDelete = {
        courseName: courseName,
      };
      try {
        await api.post("/deleteCourse", courseToDelete);
        socket.emit("requestRefreshCourses", "");
        sweetalert({
          text: "Course deleted succesfully",
          icon: "success",
        });
      } catch (err) {
        sweetalert({
          text: "Deletion failed. Course not deleted.",
          icon: "error",
        });
        console.log("Errore di tipo: " + err);
      }
    },
    async isOwnerLogged(email) {
      try {
        const { data } = await api.get("/usersPermission", {
          params: {
            email: email,
          },
        });
        this.ownerLogged =
          (data[0].email === this.course.courseCreator &&
            data[0].permission === "Staff") ||
          data[0].permission === "Admin";
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.isOwnerLogged(this.$store.state.email);
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>