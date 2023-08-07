<script>
import axios from "axios"
import CourseBox from "@/components/courses/CourseBox.vue";
import { socket } from "@/socket/socket";

export default{
  name:"Course",
  components: {CourseBox},
  computed: {
    getCat() {
      return this.$store.state.lastVisitedCategory
    }
  },
  methods: {
    async getCourses() {
    },
  },
};



</script>

<template>

  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Our Courses - {{ this.$store.state.lastVisitedCategory }}</h3>
          <router-link :to="{name : 'CategoryAdd'}">
            <button class="btn" style="float:right">Add Course</button>
          </router-link>
        </div>
    </div>

  </div>
</template>

<style scoped></style>
