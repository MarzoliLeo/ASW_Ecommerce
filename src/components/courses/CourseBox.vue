<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ course.coursesName }}</h5>
      <p class="card-text">{{ course.description }}</p>
      <p class="card-text">{{ course.price }} Tokens</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { onMounted, ref } from "vue"

const CourseBox = ref({})
export default{
  name: CourseBox,
  props: ["course"],
  methods:{},
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>