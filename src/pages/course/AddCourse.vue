<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"
import { mapGetters } from "vuex";

export default{
  data() {
    return {
      Course:{
        coursesName: "", 
        description: "", 
        price: 0.0,
        courseCategory: this.lastVisitedCategory,
        courseCreator: this.email,
        courseYTLink: "",
      }
    }
  },
  computed: {
    ...mapGetters("user", ["lastVisitedCategory", "email"]),
  },
  methods: {
    addCourse() {
      const newCourse = {
        coursesName: this.Course.coursesName,
        description: this.Course.description,
        price: parseFloat(this.Course.price),
        courseCategory: this.Course.courseCategory,
        courseCreator: this.Course.courseCreator,
        courseYTLink: this.Course.courseYTLink == undefined ? "" : this.Course.courseYTLink
      };
      axios.post('http://127.0.0.1:3000/addCourse', newCourse)
      .then((res) => {
        socket.emit("requestRefreshCourses", "")
        sweetalert({
            text: "Course added successfully",
            icon: "success"
          })   
          console.log(newCourse)
      })
      .catch((err) => {
        sweetalert({
            text: "Info error. Course not registered.",
            icon: "error"
          });
        console.log("Errore di tipo: "+ err)
      });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Add Course</h3>
        </div>
    </div>
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Course Name</label>
            <input type="text" class="form-control" v-model="Course.coursesName">
          </div>
          <div class="form-group">
            <label>Course Description</label>
            <textarea type="text" class="form-control" v-model="Course.description"></textarea>
          </div>
          <div class="form-group">
            <label>Course Price</label>
            <input type="text" class="form-control" v-model="Course.price">
          </div>
          <div class="form-group">
            <label>Course Youtube Video ID</label>
            <input type="text" class="form-control" placeholder="https://...J0NuOlA2xDc" v-model="Course.courseYTLink">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addCourse">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
