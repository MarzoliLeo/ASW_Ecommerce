<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Courses - {{ lastVisitedCategory }}</h3>
        <router-link v-if="userPermission" :to="{ name: 'CourseAdd' }">
          <button class="btn" style="float:right">Add Course</button>
        </router-link>
      </div>
    </div>
    <div class="row" v-if="courses && courses.length">
      <div v-for="course in courses" :key="course.id" class="col-xl-4 col-md-6 pt-3 d-flex">
        <CourseBox :course="course" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseBox from "@/components/courses/CourseBox.vue";
import { socket } from "@/socket/socket";

export default {
  name: "Course",
  components: { CourseBox },
  data() {
    return {
      courses: [],
      userPermission: false,
    };
  },
  computed: {
    lastVisitedCategory() {
      return this.$store.state.user.lastVisitedCategory;
    },
  },
  methods: {
    async getCourses() {
      try {
        const res = await axios.get("http://localhost:3000/showCourses", {
          params: { category: this.lastVisitedCategory },
        });
        this.courses = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async isNotUserLogged(email) {
      if (this.$store.state.user.email) {
        try {
          const res = await axios.get("http://localhost:3000/usersPermission", {
            params: { email },
          });
          this.userPermission = res.data[0].permission !== "User";
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  async mounted() {
    await this.getCourses();
    await this.isNotUserLogged(this.$store.state.user.email);

    socket.on("refreshCourses", () => {
      console.log("Refreshing courses");
      this.getCourses();
    });
  },
};
</script>

<style scoped></style>