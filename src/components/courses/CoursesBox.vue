<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    <img class="card-img-top" :src="courses.imageUrl" alt="Card image here">
    </div>
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text"></p>
      <a href="#" class="btn-primary">Premimi</a>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { onMounted, ref } from "vue"

const CourseBox = ref({})
export default{
  name: CourseBox,
  props: ["courses"],
  methods:{},
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>