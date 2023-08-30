<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Bought Courses</h3>
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
import CourseBox from "@/components/courses/BoughtCourseBox.vue";

export default {
  name: "BoughtCourses",
  components: { CourseBox },
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async getCourses(email) {
      try {
        const resNameCourse = await axios.get("http://localhost:3000/usersBoughtCourses", {
          params: { email: email },
        });
        resNameCourse.data[0].course_bought.forEach((course) => {
          axios.get("http://localhost:3000/showCourseByName", {
            params: { course: course },
          })
          .then((res) => {
            this.courses.push(res.data[0])
          });
        });

        console.log(this.courses)


        // this.courses = resNameCourse.data[0].course_bought;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    await this.getCourses(this.$store.state.user.email);
  },
};
</script>

<style scoped></style>