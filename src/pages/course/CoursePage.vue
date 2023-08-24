<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{ courseName }}</h3>
      </div>
      <p>{{ description }}</p>
      <p>People watching this page: {{ numPageViewers }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { socket } from "@/socket/socket"

export default {
  name: "CoursePage",
  data() {
    return {
      numPageViewers: 0,
      courseName: "",
      description: "",
      price: 0,
      courseCreator: "",
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
          this.courseName = res.data[0].coursesName;
          this.description = res.data[0].description;
          this.price = res.data[0].price;
          this.courseCreator = res.data[0].courseCreator;
        });
      } catch (err) {
        console.log(err);
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
          // User switched tabs or left the page
          socket.emit("leaveRoom", this.courseName)
      } else {
          // User came back to the page
          socket.emit("requestJoinRoom", this.courseName)
      }
    },
  },
  async mounted() {
    window.addEventListener('visibilitychange', this.handleVisibilityChange);

    socket.on("transmitRoomMembersCourse", (data) => {
      this.numPageViewers = data
    });

    window.onbeforeunload = function(e) {
      socket.emit("leaveRoom", this.courseName)
    };

    await this.getCourse();
    socket.emit("requestJoinRoom", this.courseName)
  },
  beforeRouteLeave(to, from, next) {
    socket.emit("leaveRoom", this.courseName)
    next()
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
</script>