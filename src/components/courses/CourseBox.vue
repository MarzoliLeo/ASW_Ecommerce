<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ course.coursesName }}</h5>
      <p class="card-text">{{ course.description }}</p>
      <p class="card-text">{{ course.price }} Tokens</p>
      <button @click="removeCourse(course.coursesName)">Remove</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { onMounted, ref } from "vue"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"

const CourseBox = ref({})
export default{
  name: CourseBox,
  props: ["course"],
  methods: {
    removeCourse(courseName) {
      console.log(courseName)
      const courseToDelete = {
        courseName: courseName
      }
      console.log(courseName)
      axios.post('http://127.0.0.1:3000/deleteCourse', courseToDelete)
      .then((res) => {
        socket.emit("requestRefreshCourses", "")
        sweetalert({
            text: "Course deleted succesfully",
            icon: "success"
          })
      })
      .catch((err) => {
        sweetalert({
            text: "Deletion failed. Course not deleted.",
            icon: "error"
          });
        console.log("Errore di tipo: "+ err)
      });
    }
  },
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>