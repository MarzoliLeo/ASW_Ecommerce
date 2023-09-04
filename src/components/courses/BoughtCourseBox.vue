<template>
  <RouterLink class="nav-link" :to="{ name: 'BoughtCoursePage' }">
    <a :href="href" @click="submitSelectedCourse">
      <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ course.coursesName }}</h5>
          <p class="card-text">{{ course.description }}</p>
          <p class="card-text">{{ course.price }} Tokens</p>
          <p class="card-text">Creator is: {{ creatorInfo.first_name }} {{ creatorInfo.last_name }}</p>
        </div>
      </div>
    </a>
  </RouterLink>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

const BoughtCourseBox = ref({});

export default {
  name: BoughtCourseBox,
  props: ["course"],
  data() {
    return {
      creatorInfo: [],
    }
  },
  methods: {
    submitSelectedCourse() {
      this.$store.commit("user/commitCourse", this.course.coursesName);
    },
    async getOwnerInfo(email) {
        try {
          await axios.get("http://localhost:3000/getUserByEmail", {
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
    this.getOwnerInfo(this.course.courseCreator)
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>