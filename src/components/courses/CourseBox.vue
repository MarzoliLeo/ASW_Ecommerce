<template>
  <RouterLink class="nav-link" :to="{ name: 'CoursePage' }">
    <a :href="href" @click="submitSelectedCourse">
      <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ course.coursesName }}</h5>
          <p class="card-text">{{ course.price }} Tokens</p>
          <p class="card-text">Creator is: {{ creatorInfo.first_name }} {{ creatorInfo.last_name }} ({{ creatorInfo.email }})</p>
          <button v-if="alreadyBought" @click.stop.prevent="addToCart(course)">Add to Cart</button>
        </div>
      </div>
    </a>
  </RouterLink>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import sweetalert from "sweetalert";
import { socket } from "@/socket/socket";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

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
  data() {
    return {
      ownerLogged: false,
      alreadyBought: false,
      creatorInfo: [],
    }
  },
  computed: {
    ...mapGetters("user", ["email"]),
  },
  methods: {
    ...mapActions('cart', ["addToCart"]),
    submitSelectedCourse() {
      this.$store.commit("user/commitCourse", this.course.coursesName);
    },
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
      if(email != '' && email != undefined) {
        try {
          await api.get("/usersPermission", {
            params: {
              email: email,
            },
          })
          .then(res => {
            this.ownerLogged =
            (res.data[0].email === this.course.courseCreator 
            && res.data[0].permission === "Staff") 
            || res.data[0].permission === "Admin";
        });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async isAlreadyBought(email) {
      if(email != '' && email != undefined) {
        try {
          await api.get("/usersBoughtCourses", {
            params: {
              email: email,
            },
          })
          .then(res => {
            this.alreadyBought = !res.data[0].course_bought.includes(this.course.coursesName)
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getOwnerInfo(email) {
        try {
          await api.get("/getUserByEmail", {
            params: {
              email: email,
            },
          })
          .then(res => {
            this.creatorInfo = res.data[0]
        });
        } catch (err) {
          console.log(err);
        }
    },
  },
  mounted() {
    this.isOwnerLogged(this.email);
    this.isAlreadyBought(this.email);
    this.getOwnerInfo(this.course.courseCreator);
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>