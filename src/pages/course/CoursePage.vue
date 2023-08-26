<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{ courseName }}</h3>
      </div>
      <p>{{ description }}</p>
      <p>People watching this page: {{ numPageViewers }}</p>
      <p>People watching the Video-Course: {{ numCourseViewers }}</p>
    </div>
    <div class="row">
      <form class=" col-12 text-center pt-5">
        <div class="form-group">
          <label>Comment Description:</label>
          <textarea type="text" class="form-control" v-model="userComment"></textarea>
        </div>
        <br>
        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="addComment">Submit comment</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { socket } from "@/socket/socket"
import sweetalert from "sweetalert"

export default {
  name: "CoursePage",
  data() {
    return {
      numPageViewers: 0,
      numCourseViewers: 0,
      courseId: "",
      courseName: "",
      description: "",
      price: 0,
      courseCreator: "",
      userComment: "",
    }
  },
  computed: {
    lastVisitedCourse() {
      return this.$store.state.user.lastVisitedCourse;
    },
  },
  methods: {
    async getCourse() {
      try {
        await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.courseId = res.data[0]._id
          this.courseName = res.data[0].coursesName;
          this.description = res.data[0].description;
          this.price = res.data[0].price;
          this.courseCreator = res.data[0].courseCreator;
        });
      } catch (err) {
        console.log(err);
      }
    },
    async addComment() {
      if(this.userComment){
        console.log(this.userComment)
      } else {
        sweetalert({
          text: "Error, fill out the comment field before submitting one",
          icon: "error"
        });
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
          // User switched tabs or left the page
          if(this.courseId != null && this.courseId != undefined){
            socket.emit("leaveRoom", this.courseId)
          }
      } else {
          // User came back to the page
          socket.emit("requestJoinRoom", this.courseId)
      }
    },
  },
  async mounted() {
    window.addEventListener('visibilitychange', this.handleVisibilityChange);

    socket.on("transmitRoomMembersCourse", (data) => {
      this.numPageViewers = data
    });

    socket.on("transmitRoomMembersCourseBought", (data) => {
      this.numCourseViewers = data
    });

    await this.getCourse();
    socket.emit("requestJoinRoom", this.courseId)
  },
  beforeRouteLeave(to, from, next) {
    if(this.courseId != null && this.courseId != undefined){
      socket.emit("leaveRoom", this.courseId)
    }
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    next()
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
</script>