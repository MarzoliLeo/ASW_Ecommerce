<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { socket } from "@/socket/socket"

export default{
  data() {
    return {
      Course:{
        _id: "",
        coursesName: "", 
        description: "", 
        price: 0.0,
        courseCategory: this.$store.state.user.lastVisitedCategory,
        courseCreator: this.$store.state.user.email,
        courseYTLink: "",
      }
    }
  },
  methods: {
    async getCourse() {
      try {
        await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.$store.state.user.lastVisitedCourse },
        }).then(res => {
          this.Course._id = res.data[0]._id
          this.Course.coursesName = res.data[0].coursesName;
          this.Course.description = res.data[0].description;
          this.Course.price = res.data[0].price;
          this.Course.courseCreator = res.data[0].courseCreator;
          this.Course.courseCategory = res.data[0].courseCategory;
          this.Course.courseYTLink = res.data[0].courseYTLink
        });
      } catch (err) {
        console.log(err);
      }
    },
    addCourse() {
      // console.log(
      //   this.Course._id,
      //   this.Course.coursesName, 
      //   this.Course.description, 
      //   parseFloat(this.Course.price),
      //   this.Course.courseCategory,
      //   this.Course.courseCreator,
      //   this.Course.courseYTLink
      // );
      const modifyCourse = {
        _id: this.Course._id,
        coursesName: this.Course.coursesName,
        description: this.Course.description,
        price: parseFloat(this.Course.price),
        courseCategory: this.Course.courseCategory,
        courseCreator: this.Course.courseCreator,
        courseYTLink: this.Course.courseYTLink == undefined ? "" : "https://www.youtube.com/embed/" + this.Course.courseYTLink
      };
      axios.post('http://127.0.0.1:3000/modifyCourse', modifyCourse)
      .then((res) => {
        socket.emit("requestRefreshCourses", "")
        sweetalert({
            text: "Course added successfully",
            icon: "success"
          })   
          console.log(modifyCourse)
      })
      .catch((err) => {
        sweetalert({
            text: "Info error. Course not registered.",
            icon: "error"
          });
        console.log("Errore di tipo: "+ err)
      });
    }
  },
  async mounted() {
    await this.getCourse();
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Modify Course</h3>
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
            <input type="text" class="form-control" v-model="Course.courseYTLink">
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
