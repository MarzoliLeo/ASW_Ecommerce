<script>
import axios from "axios"
import CourseBox from "@/components/courses/CourseBox.vue";
import { socket } from "@/socket/socket";

export default{
  name:"Course",
  components: {CourseBox},
  data() {
    return{
      courses: []
    }
  },
  methods: {
    async getCourses() {
      const filter = {
        category: this.$store.state.lastVisitedCategory
      }
      console.log(filter)
      console.log("Getting courses for category: " + this.$store.state.lastVisitedCategory)
      await axios.get("http://localhost:3000/showCourses", {
        params: {
          category: this.$store.state.lastVisitedCategory,
        }
      })
      .then(res => {
          console.log(this.courses)
          this.courses = res.data

          console.log(this.courses)
      })
      .catch(err => 
        console.log(err)
      )
    },
  },
  mounted() {
    this.getCourses();

    socket.on("refreshCourses", () => {
      console.log("Refreshing courses")
      this.getCourses();
    });
  }
};



</script>

<template>

  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Our Courses - {{ this.$store.state.lastVisitedCategory }}</h3>
          <router-link :to="{name : 'CourseAdd'}">
            <button class="btn" style="float:right">Add Course</button>
          </router-link>
        </div>
    </div>
    <div class ="row" v-if="courses && courses.length">
      <div v-for="(course, index) in courses" :key="index" class="col-xl-4 col-md-6 pt-3 d-flex" >
        <CourseBox :course="course"></CourseBox>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
