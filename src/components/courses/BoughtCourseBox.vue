<template>
  <RouterLink class="nav-link" :to="{ name: 'CoursePage' }">
    <a :href="href" @click="submitSelectedCourse">
      <div class="card w-100 h-100" style="margin-top: 10px;">
        <div class="embed-responsive embed-responsive-16by9">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ course.coursesName }}</h5>
          <p class="card-text">{{ course.description }}</p>
          <p class="card-text">{{ course.price }} Tokens</p>
          <p class="card-text">Creator is: {{ course.courseCreator }}</p>
        </div>
      </div>
    </a>
  </RouterLink>
</template>

<script>
import { ref } from "vue";

const CourseBox = ref({});

export default {
  name: CourseBox,
  props: ["course"],
  methods: {
    submitSelectedCourse() {
      this.$store.commit("user/commitCourse", this.course.coursesName);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>