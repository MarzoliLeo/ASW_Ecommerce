<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Courses - {{ lastVisitedCategory }}</h3>
        <router-link v-if="userPermission" :to="{ name: 'CourseAdd' }">
          <button class="btn" style="float:right">Add Course</button>
        </router-link>
      </div>
      <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter by Trainer
                </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div v-for="trainer in trainers" :key="trainer.id">
                <label>{{trainer}}</label>
                <input type="checkbox" v-model="selectedTrainers" :value="trainer"/>
              </div>
            </li>
            <button @click="filterCourses()">Filter</button>
          </ul>
        </div>
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
      trainers: [],
      selectedTrainers: [],
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
        var res;
        if(this.selectedTrainers !== undefined && this.selectedTrainers.length > 0) {
          res = await axios.get("http://localhost:3000/showCoursesByCategoryAndTrainer", {
            params: { category: this.lastVisitedCategory, trainers: this.selectedTrainers },
          });
        } else {
          res = await axios.get("http://localhost:3000/showCoursesByCategory", {
            params: { category: this.lastVisitedCategory },
          });
        }
      
        this.courses = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTrainers() {
      try {
        const res = await axios.get("http://localhost:3000/showCoursesTrainers");
        this.trainers = res.data;

        this.trainers.sort(function(a, b) {
          if(a < b) { return -1; }
          if(a > b) { return 1; }
          return 0;
        })
      } catch (err) {
        console.log(err);
      }
    },
    filterCourses() {
      this.getCourses();
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
    await this.getTrainers();
    await this.isNotUserLogged(this.$store.state.user.email);

    socket.on("refreshCourses", () => {
      console.log("Refreshing courses");
      this.getCourses();
    });
  },
};
</script>

<style scoped></style>