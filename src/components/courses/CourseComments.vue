<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body text-center">
      <h5 class="card-title">Posted by: {{ comment.userComment }} </h5>
      <p class="card-text">{{ comment.commentDescription }}</p>
      <p class="card-text">Date posted in: {{ comment.posting_date }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

const CourseComments = ref({});

export default {
  name: CourseComments,
  props: ["comment"],
  mounted() {
    console.log(comment)
  }
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>