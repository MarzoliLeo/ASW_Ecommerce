<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ course.coursesName }}</h5>
      <p class="card-text">{{ course.description }}</p>
      <p class="card-text">{{ course.price }} Tokens</p>
      <p class="card-text">Creator is: {{ course.courseCreator }}</p>
      <button v-if="ownerLogged" @click="removeCourse(course.coursesName)">Remove</button>
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
  data() {
    return{
      ownerLogged: false,
    }
  },
  methods: {
    removeCourse(courseName) {
      const courseToDelete = {
        courseName: courseName
      }
      console.log(courseToDelete)
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
    },
    isOwnerLogged(email) {
      if(this.$store.state.email != '') {
        axios.get("http://localhost:3000/usersPermission", {
          params: {
            email: email,
          }
        })
        .then(res => {
          this.ownerLogged = 
          (res.data[0].email == this.course.courseCreator && res.data[0].permission == "Staff") 
          || res.data[0].permission == "Admin" 
          ? true 
          : false
          console.log(this.ownerLogged)
        })
        .catch(err => 
          console.log(err)
        )
      }
    },
  },
  mounted() {
    this.isOwnerLogged(this.$store.state.email);
  }
};

</script>

<style scoped>
.card-img-top{
  object-fit: cover;
}
</style>