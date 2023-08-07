<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"

export default{
  data() {
    return {
      Course:{
        coursesName: "", 
        description: "", 
        price: 0.0,
        courseCategory: this.$store.state.lastVisitedCategory }
    }
  },
  methods: {
    addCourse() {
      console.log(
        this.Course.coursesName, 
        this.Course.description, 
        parseFloat(this.Course.price),
        this.Course.courseCategory
      );
      const newCourse = {
        coursesName: this.Course.coursesName,
        description: this.Course.description,
        price: parseFloat(this.Course.price),
        courseCategory: this.Course.courseCategory
      };
      axios.post('http://127.0.0.1:3000/admin/addCourse', newCourse)
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
