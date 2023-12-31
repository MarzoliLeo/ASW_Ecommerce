<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Courses - {{ lastVisitedCategory }}</h3>
        <div class="w-100 mb-4 d-flex align-items-center justify-content-center">
          <router-link v-if="userPermission" :to="{ name: 'CourseAdd' }">
            <button class="btn btn-info" style="float:right">Add Course</button>
          </router-link>
        </div>
      </div>
      <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter by Trainer
                </button>
          <ul class="dropdown-menu w-100 p-3" aria-labelledby="dropdownMenuButton1">
            <li>
              <div v-for="trainer in trainers" :key="trainer.id">
                <label>{{trainer}}</label>
                <input type="checkbox" class="mb-3" v-model="selectedTrainers" :value="trainer"/>
              </div>
            </li>
            <button class="mt-3" @click="filterCourses()">Filter</button>
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
import { mapGetters } from "vuex";

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
    ...mapGetters("user", ["lastVisitedCategory", "email"]),
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
      if(this.courses.length > 0) {
        try {
          const coursesNames = []
          this.courses.forEach((course) => {
            coursesNames.push(course.coursesName)
          })

          const res = await axios.get("http://localhost:3000/showCoursesTrainers", {
            params: { courses: coursesNames },
          });
          this.trainers = res.data;
          this.trainers.sort(function(a, b) {
            if(a < b) { return -1; }
            if(a > b) { return 1; }
            return 0;
          })
        } catch (err) {
          console.log(err);
        }
      }
    },
    filterCourses() {
      this.getCourses();
    },
    async isNotUserLogged(email) {
      if (this.email) {
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
    await this.isNotUserLogged(this.email);

    socket.on("refreshCourses", () => {
      console.log("Refreshing courses");
      this.getCourses();
    });
  },
};
</script>

<style scoped></style>