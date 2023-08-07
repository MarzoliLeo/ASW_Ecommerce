<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"

export default{
  data() {
    return {
      Course:{
        courseName: "", 
        description: "", 
        coursePrice: "",
        courseCategory: ""}
    }
  },
  methods: {
    addCourse() {
      console.log(
        this.Course.courseName, 
        this.Course.description, 
        this.Course.coursePrice,
        this.Course.courseCategory
      );
      const newCourse = {
        courseName: this.Course.courseName,
        description: this.Course.description,
        coursePrice: this.Course.coursePrice,
        courseCategory: this.Course.courseCategory
      };

    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Add Category</h3>
        </div>
    </div>
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Course Name</label>
            <input type="text" class="form-control" v-model="Category.categoryName">
          </div>
          <div class="form-group">
            <label>Course Description</label>
            <textarea type="text" class="form-control" v-model="Category.description"></textarea>
          </div>
          <div class="form-group">
            <label>Course Price</label>
            <input type="text" class="form-control" v-model="Category.imageUrl">
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
